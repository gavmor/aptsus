import { useState, useMemo, useEffect } from "react";
import { DollarSign, Maximize, Filter, Bed, Dumbbell, Car } from "lucide-react";

import { Header } from "./components/Header";
import { PriorityPanel } from "./components/PriorityPanel";
import { DestinationsTab } from "./components/DestinationsTab";
import { AddListingForm } from "./components/AddListingForm";
import { ListingsList } from "./components/ListingsList";
import { Destination, Listing, Criteria, AnalysisResult } from "./types";
import {
  extractListingData,
  login,
  estimateCommutes,
  analyzeListing,
} from "./services/data-extraction";

// --- Constants ---
const STATIC_CRITERIA: Record<string, Criteria> = {
  price: { label: "Low Price", icon: DollarSign, desc: "Cheaper is better" },
  sqft: { label: "Living Space", icon: Maximize, desc: "Bigger is better" },
  laundry: { label: "Laundry", icon: Filter, desc: "In-unit preferred" },
  beds: { label: "Bedrooms", icon: Bed, desc: "More is better" },
  gym: { label: "Fitness/Gym", icon: Dumbbell, desc: "Has gym access" },
};

// --- Helper Functions ---

// --- Main Application ---

export default function App() {
  // --- State with LocalStorage Initialization ---

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const [showWeights, setShowWeights] = useState(false);
  const [importText, setImportText] = useState("");
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [analysisResults, setAnalysisResults] = useState<
    Record<number, AnalysisResult>
  >({});

  // --- Auth Wrapper ---
  const withAuth = async <T,>(action: () => Promise<T>): Promise<T | null> => {
    try {
      return await action();
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        const password = window.prompt("Please enter the gateway password:");
        if (password) {
          try {
            await login(password);
            setIsLoggedIn(true);
            return await action(); // Retry
          } catch (loginError) {
            alert("Invalid password");
          }
        }
      } else {
        console.error("Action Error:", error);
        alert(`Failed to perform action: ${error.message}`);
      }
      return null;
    }
  };

  // Load from Local Storage
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem("ah_destinations");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "commute_work",
            name: "Office",
            address: "Market St, San Francisco",
          },
        ];
  });

  const [priorities, setPriorities] = useState<string[]>(() => {
    const saved = localStorage.getItem("ah_priorities");
    return saved
      ? JSON.parse(saved)
      : ["price", "commute_work", "laundry", "gym", "sqft", "beds"];
  });

  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem("ah_listings");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            address: "123 Main St (Downtown)",
            price: 2500,
            sqft: 850,
            commutes: { commute_work: 15 },
            laundry: "in-unit",
            beds: 1,
            gym: true,
            available: "Now",
            posted: "2 days ago",
            notes: "Great natural light, near the park.",
            link: "",
          },
        ];
  });

  const [newDestination, setNewDestination] = useState({
    name: "",
    address: "",
  });

  const [newListing, setNewListing] = useState<Listing>({
    id: 0,
    address: "",
    price: 0,
    sqft: 0,
    commutes: {}, // { destId: minutes }
    laundry: "in-unit",
    beds: 0,
    gym: false,
    available: "",
    posted: "",
    notes: "",
    link: "",
    suspectedScam: false,
    scamReason: "",
  });

  // --- Persistence Effect ---
  useEffect(() => {
    localStorage.setItem("ah_listings", JSON.stringify(listings));
    localStorage.setItem("ah_destinations", JSON.stringify(destinations));
    localStorage.setItem("ah_priorities", JSON.stringify(priorities));
  }, [listings, destinations, priorities]);

  // --- Logic ---

  // Merge Static and Dynamic Criteria for Display
  const criteriaConfig = useMemo(() => {
    const config = { ...STATIC_CRITERIA };
    destinations.forEach((dest) => {
      config[dest.id] = {
        label: `To: ${dest.name}`,
        icon: Car,
        desc: "Short drive time",
        isDynamic: true,
      };
    });
    return config;
  }, [destinations]);

  // Calculated PPSQFT for New Listing Form
  const newListingPPSQFT = useMemo(() => {
    if (newListing.price && newListing.sqft && newListing.sqft > 0) {
      return (newListing.price / newListing.sqft).toFixed(0);
    }
    return 0;
  }, [newListing.price, newListing.sqft]);

  // Normalize and Score Listings
  const scoredListings = useMemo(() => {
    if (listings.length === 0) return [];

    const maxPrice = Math.max(...listings.map((l) => l.price)) || 1;
    const minPrice = Math.min(...listings.map((l) => l.price)) || 1;
    const maxSqft = Math.max(...listings.map((l) => l.sqft)) || 1;
    const minSqft = Math.min(...listings.map((l) => l.sqft)) || 1;
    const maxBeds = Math.max(...listings.map((l) => l.beds)) || 1;
    const minBeds = Math.min(...listings.map((l) => l.beds)) || 1;

    const normalizeLowerIsBetter = (val: number, min: number, max: number) =>
      max === min ? 1 : 1 - (val - min) / (max - min);
    const normalizeHigherIsBetter = (val: number, min: number, max: number) =>
      max === min ? 1 : (val - min) / (max - min);

    const laundryScores: Record<string, number> = {
      "in-unit": 1.0,
      "on-site": 0.5,
      none: 0.0,
    };
    const totalWeight = priorities.reduce(
      (acc, _, idx) => acc + (priorities.length - idx),
      0,
    );

    return listings
      .map((item) => {
        const scores: Record<string, number> = {
          price: normalizeLowerIsBetter(item.price, minPrice, maxPrice),
          sqft: normalizeHigherIsBetter(item.sqft, minSqft, maxSqft),
          laundry: laundryScores[item.laundry] || 0,
          beds: normalizeHigherIsBetter(item.beds, minBeds, maxBeds),
          gym: item.gym ? 1 : 0,
        };

        destinations.forEach((dest) => {
          const time = Number(item.commutes[dest.id]) || 999;
          let commuteScore = 1 - time / 60;
          if (commuteScore < 0) commuteScore = 0;
          scores[dest.id] = commuteScore;
        });

        let weightedSum = 0;

        priorities.forEach((key, index) => {
          const weight = priorities.length - index;
          if (scores[key] !== undefined) {
            weightedSum += scores[key] * weight;
          }
        });

        const finalScore = item.isScam ? 0 : (weightedSum / totalWeight) * 100;

        return {
          ...item,
          score: finalScore.toFixed(1),
          ppsqft: (item.price / item.sqft).toFixed(0),
        };
      })
      .sort((a, b) => {
        if (a.isScam && !b.isScam) return 1;
        if (!a.isScam && b.isScam) return -1;
        return Number(b.score) - Number(a.score);
      });
  }, [listings, priorities, destinations]);

  // --- Handlers ---

  const autoFillMissingCommutes = async (
    listingId: number,
    address: string,
    existingCommutes: Record<string, number | string>,
  ) => {
    const missingDestinations = destinations.filter(
      (d) =>
        existingCommutes[d.id] === undefined || existingCommutes[d.id] === "",
    );

    if (missingDestinations.length === 0) return;

    const data = await withAuth(() =>
      estimateCommutes(address, missingDestinations),
    );

    if (data) {
      setListings((prevListings) =>
        prevListings.map((item) => {
          if (item.id === listingId) {
            return { ...item, commutes: { ...item.commutes, ...data } };
          }
          return item;
        }),
      );
    }
  };

  const autoFillNewDestinationCommutes = async (newDest: Destination) => {
    if (listings.length === 0) return;

    // The gateway currently supports single address -> multiple destinations.
    // For multiple origins -> single destination, we could either loop or extend the gateway.
    // For now, let's keep it simple and loop, or update gateway if preferred.
    // Given the "minimum-viable" goal, let's just implement the most common case for now.
    // Actually, let's just loop for each listing to use existing gateway endpoint.
    
    for (const listing of listings) {
      const data = await withAuth(() => estimateCommutes(listing.address, [newDest]));
      if (data) {
        setListings((prevListings) =>
          prevListings.map((item) => {
            if (item.id === listing.id) {
              return { ...item, commutes: { ...item.commutes, ...data } };
            }
            return item;
          })
        );
      }
    }
  };

  const handleAddListing = () => {
    if (!newListing.address || !newListing.price) return;

    const id = Date.now();
    const newEntry: Listing = {
      ...newListing,
      id: id,
      price: Number(newListing.price),
      sqft: Number(newListing.sqft),
      beds: Number(newListing.beds),
      isScam: newListing.suspectedScam || false,
    };

    setListings([...listings, newEntry]);

    autoFillMissingCommutes(id, newEntry.address, newEntry.commutes);

    setNewListing({
      id: 0,
      address: "",
      price: 0,
      sqft: 0,
      commutes: {},
      laundry: "in-unit",
      beds: 0,
      gym: false,
      available: "",
      posted: "",
      notes: "",
      link: "",
      suspectedScam: false,
      scamReason: "",
    });
    setImportText("");
    setActiveTab("list");
  };

  const handleAddDestination = () => {
    if (!newDestination.name || !newDestination.address) return;
    const id = `commute_${Date.now()}`;
    const newDest: Destination = { ...newDestination, id };

    setDestinations([...destinations, newDest]);
    setPriorities([...priorities, id]);

    autoFillNewDestinationCommutes(newDest);

    setNewDestination({ name: "", address: "" });
  };

  const handleSmartImport = async () => {
    if (!importText) return;

    setIsImporting(true);
    const data = await withAuth(() => extractListingData(importText));

    if (data) {
      setNewListing((prev) => ({
        ...prev,
        ...data,
        price: Number(data.price) || 0,
        sqft: Number(data.sqft) || 0,
        beds: Number(data.beds) || 0,
        link:
          data.link || (importText.startsWith("http") ? importText : prev.link),
      }));
    }
    setIsImporting(false);
  };

  const handleEstimateCommutes = async () => {
    if (!newListing.address) return;

    setIsEstimating(true);
    const data = await withAuth(() =>
      estimateCommutes(newListing.address, destinations),
    );

    if (data) {
      setNewListing((prev) => ({
        ...prev,
        commutes: { ...prev.commutes, ...data },
      }));
    }
    setIsEstimating(false);
  };

  const handleDeleteDestination = (id: string) => {
    setDestinations(destinations.filter((d) => d.id !== id));
    setPriorities(priorities.filter((p) => p !== id));
  };

  const handleAnalyzeListing = async (listing: Listing) => {
    if (analysisResults[listing.id]) {
      const newResults = { ...analysisResults };
      delete newResults[listing.id];
      setAnalysisResults(newResults);
      return;
    }

    setAnalyzingId(listing.id);
    const readablePriorities = priorities
      .map((key) => criteriaConfig[key]?.label || key)
      .join(", ");

    const result = await withAuth(() =>
      analyzeListing(listing, readablePriorities),
    );

    if (result) {
      setAnalysisResults((prev) => ({ ...prev, [listing.id]: result }));
    }
    setAnalyzingId(null);
  };

  const handleDelete = (id: number) => {
    setListings(listings.filter((l) => l.id !== id));
    const newResults = { ...analysisResults };
    delete newResults[id];
    setAnalysisResults(newResults);
  };

  const toggleScam = (id: number) => {
    setListings(
      listings.map((l) => (l.id === id ? { ...l, isScam: !l.isScam } : l)),
    );
  };

  const handleExport = () => {
    if (scoredListings.length === 0) return;

    const headers = [
      "Rank",
      "Score",
      "Address",
      "Price",
      "SqFt",
      "Beds",
      "Laundry",
      "Gym",
      ...destinations.map((d) => `Commute to ${d.name}`),
      "Link",
      "Notes",
    ];

    const rows = scoredListings.map((l, index) => [
      index + 1,
      l.isScam ? "SCAM" : l.score + "%",
      `"${l.isScam ? "[SCAM] " : ""}${l.address}"`,
      l.price,
      l.sqft,
      l.beds,
      l.laundry,
      l.gym ? "Yes" : "No",
      ...destinations.map((d) => l.commutes[d.id] || ""),
      `"${l.link || ""}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "apartment_candidates.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Drag and Drop Logic
  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const newPriorities = [...priorities];
    const item = newPriorities[draggedItem];
    newPriorities.splice(draggedItem, 1);
    newPriorities.splice(index, 0, item);
    setPriorities(newPriorities);
    setDraggedItem(index);
  };

  const onDragEnd = () => setDraggedItem(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showWeights={showWeights}
        setShowWeights={setShowWeights}
        handleExport={handleExport}
      />

      <PriorityPanel
        showWeights={showWeights}
        priorities={priorities}
        criteriaConfig={criteriaConfig}
        draggedItem={draggedItem}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "destinations" && (
          <DestinationsTab
            destinations={destinations}
            newDestination={newDestination}
            setNewDestination={setNewDestination}
            handleAddDestination={handleAddDestination}
            handleDeleteDestination={handleDeleteDestination}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "add" && (
          <AddListingForm
            newListing={newListing}
            setNewListing={setNewListing}
            importText={importText}
            setImportText={setImportText}
            isImporting={isImporting}
            isEstimating={isEstimating}
            destinations={destinations}
            newListingPPSQFT={newListingPPSQFT}
            handleSmartImport={handleSmartImport}
            handleEstimateCommutes={handleEstimateCommutes}
            handleAddListing={handleAddListing}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "list" && (
          <ListingsList
            listings={listings}
            scoredListings={scoredListings}
            destinations={destinations}
            analysisResults={analysisResults}
            analyzingId={analyzingId}
            handleAnalyzeListing={handleAnalyzeListing}
            toggleScam={toggleScam}
            handleDelete={handleDelete}
            setActiveTab={setActiveTab}
          />
        )}
      </div>
    </div>
  );
}
