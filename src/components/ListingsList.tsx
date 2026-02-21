import { Search, Plus } from "lucide-react";
import { Button } from "./ui/Button";
import { Listing, Destination, AnalysisResult } from "../types";
import { ListingCard } from "./ListingCard";

interface ListingsListProps {
  listings: Listing[];
  scoredListings: Listing[];
  destinations: Destination[];
  analysisResults: Record<number, AnalysisResult>;
  analyzingId: number | null;
  handleAnalyzeListing: (listing: Listing) => void;
  toggleScam: (id: number) => void;
  handleDelete: (id: number) => void;
  setActiveTab: (tab: string) => void;
}

export const ListingsList = ({
  listings,
  scoredListings,
  destinations,
  analysisResults,
  analyzingId,
  handleAnalyzeListing,
  toggleScam,
  handleDelete,
  setActiveTab,
}: ListingsListProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          Top Candidates
          <span className="ml-3 bg-blue-100 text-blue-700 text-xs py-1 px-3 rounded-full">
            {listings.length} found
          </span>
        </h2>

        {/* Stats Summary */}
        {listings.length > 0 && (
          <div className="flex gap-4 text-sm text-slate-500">
            <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              Avg Price:{" "}
              <span className="font-semibold text-slate-700">
                $
                {Math.round(
                  listings.reduce((acc, curr) => acc + curr.price, 0) /
                    listings.length,
                )}
              </span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
              Avg SqFt:{" "}
              <span className="font-semibold text-slate-700">
                {Math.round(
                  listings.reduce((acc, curr) => acc + curr.sqft, 0) /
                    listings.length,
                )}
              </span>
            </div>
          </div>
        )}
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">
            No apartments added yet
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            Start by adding listing details found on Craigslist, Zillow, or
            other sites to calculate your match score.
          </p>
          <Button
            variant="primary"
            onClick={() => setActiveTab("add")}
            icon={Plus}
          >
            Add First Apartment
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {scoredListings.map((item, index) => (
            <ListingCard
              key={item.id}
              item={item}
              index={index}
              destinations={destinations}
              analysisResult={analysisResults[item.id]}
              analyzingId={analyzingId}
              handleAnalyzeListing={handleAnalyzeListing}
              toggleScam={toggleScam}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
