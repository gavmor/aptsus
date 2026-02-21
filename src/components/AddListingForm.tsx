import {
  X,
  Sparkles,
  AlertTriangle,
  Calculator,
  Car,
  Navigation,
  Check,
  Dumbbell,
  Calendar,
  Clock,
  Link as LinkIcon,
  Save,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Destination, Listing } from "../types";

interface AddListingFormProps {
  newListing: Listing;
  setNewListing: (listing: Listing) => void;
  importText: string;
  setImportText: (text: string) => void;
  isImporting: boolean;
  isEstimating: boolean;
  destinations: Destination[];
  newListingPPSQFT: number | string;
  handleSmartImport: () => void;
  handleEstimateCommutes: () => void;
  handleAddListing: () => void;
  setActiveTab: (tab: string) => void;
}

export const AddListingForm = ({
  newListing,
  setNewListing,
  importText,
  setImportText,
  isImporting,
  isEstimating,
  destinations,
  newListingPPSQFT,
  handleSmartImport,
  handleEstimateCommutes,
  handleAddListing,
  setActiveTab,
}: AddListingFormProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Add New Listing</h2>
        <Button variant="ghost" onClick={() => setActiveTab("list")} icon={X}>
          Cancel
        </Button>
      </div>

      {/* Smart Import Section */}
      <div className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles className="w-24 h-24 text-blue-600" />
        </div>
        <div className="flex items-start space-x-4 relative z-10">
          <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 text-sm mb-1">
              ✨ Smart Import
            </h3>
            <p className="text-xs text-blue-700 mb-4 leading-relaxed max-w-lg">
              Paste a messy description, listing title, or email snippet. Our
              service will read it and extract the price, amenities, and details
              for you automatically.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-white border border-blue-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Paste text like: 'Cute 2bd in Mission, $3k, w/d in unit, gym access...'"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSmartImport()}
              />
              <Button
                variant="magic"
                onClick={handleSmartImport}
                className="text-sm py-1.5 h-auto px-5"
                loading={isImporting}
                icon={Sparkles}
              >
                {isImporting ? "Reading..." : "Extract"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Scam Warning Banner */}
      {newListing.suspectedScam && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start animate-in slide-in-from-top-2">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-bold text-red-900 text-sm">Scam Alert</h4>
            <p className="text-sm text-red-700 mt-1">{newListing.scamReason}</p>
            <p className="text-xs text-red-500 mt-2 font-medium">
              This listing will be automatically flagged as a scam if saved.
            </p>
          </div>
        </div>
      )}

      <Card className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Input
              label="Address / Title"
              placeholder="e.g. 123 Sunset Blvd, Apt 4B"
              value={newListing.address}
              onChange={(e) =>
                setNewListing({ ...newListing, address: e.target.value })
              }
            />
          </div>
          <Input
            label="Monthly Rent"
            type="number"
            placeholder="2500"
            prefix="$"
            value={newListing.price}
            onChange={(e) =>
              setNewListing({ ...newListing, price: Number(e.target.value) })
            }
          />
          <div className="flex flex-col">
            <Input
              label="Square Footage"
              type="number"
              placeholder="800"
              suffix="sqft"
              value={newListing.sqft}
              onChange={(e) =>
                setNewListing({ ...newListing, sqft: Number(e.target.value) })
              }
            />
            {Number(newListingPPSQFT) > 0 && (
              <div className="mt-2 flex justify-end">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                  <Calculator className="w-3 h-3 mr-1" />${newListingPPSQFT} /
                  sqft
                </span>
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                <Car className="w-3 h-3 mr-1" /> Commute Times (mins)
              </label>
              {newListing.address && destinations.length > 0 && (
                <Button
                  variant="magic"
                  className="py-1 px-3 text-xs h-auto"
                  icon={Navigation}
                  onClick={handleEstimateCommutes}
                  loading={isEstimating}
                >
                  Estimate Travel Times
                </Button>
              )}
            </div>

            {destinations.length === 0 ? (
              <div className="text-sm text-slate-400 text-center italic py-2">
                No destinations added. Go to "Destinations" tab.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destinations.map((dest) => (
                  <Input
                    key={dest.id}
                    label={`To: ${dest.name}`}
                    type="number"
                    placeholder="mins"
                    value={newListing.commutes[dest.id] || ""}
                    onChange={(e) =>
                      setNewListing({
                        ...newListing,
                        commutes: {
                          ...newListing.commutes,
                          [dest.id]: e.target.value,
                        },
                      })
                    }
                    className="bg-white"
                  />
                ))}
              </div>
            )}
          </div>
          <Select
            label="Laundry Situation"
            value={newListing.laundry}
            onChange={(e) =>
              setNewListing({ ...newListing, laundry: e.target.value })
            }
            options={[
              { value: "in-unit", label: "In-Unit (Best)" },
              { value: "on-site", label: "On-Site / Shared" },
              { value: "none", label: "None / Laundromat" },
            ]}
          />
          <Input
            label="Bedrooms"
            type="number"
            placeholder="1"
            value={newListing.beds}
            onChange={(e) =>
              setNewListing({ ...newListing, beds: Number(e.target.value) })
            }
          />
          <div className="flex items-center space-x-3 pt-6">
            <button
              onClick={() =>
                setNewListing({ ...newListing, gym: !newListing.gym })
              }
              className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${newListing.gym ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-300"}`}
            >
              {newListing.gym && <Check className="w-4 h-4" />}
            </button>
            <label className="text-sm font-medium text-slate-700 flex items-center">
              <Dumbbell className="w-4 h-4 mr-2 text-slate-500" />
              Fitness Center / Gym On-Site
            </label>
          </div>
          <div className="hidden md:block"></div>
          <Input
            label="Available Date"
            placeholder="e.g. Now, June 1st"
            value={newListing.available}
            onChange={(e) =>
              setNewListing({ ...newListing, available: e.target.value })
            }
            prefix={<Calendar className="w-3 h-3" />}
          />
          <Input
            label="Date Posted"
            placeholder="e.g. 2 days ago"
            value={newListing.posted}
            onChange={(e) =>
              setNewListing({ ...newListing, posted: e.target.value })
            }
            prefix={<Clock className="w-3 h-3" />}
          />
          <div className="col-span-1 md:col-span-2">
            <Input
              label="Listing Link"
              placeholder="https://craigslist.org/..."
              prefix={<LinkIcon className="w-3 h-3" />}
              value={newListing.link}
              onChange={(e) =>
                setNewListing({ ...newListing, link: e.target.value })
              }
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
              Notes
            </label>
            <textarea
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="e.g. South facing windows, no dishwasher, parking included..."
              value={newListing.notes}
              onChange={(e) =>
                setNewListing({ ...newListing, notes: e.target.value })
              }
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end pt-6 border-t border-slate-100">
          <Button
            variant="primary"
            onClick={handleAddListing}
            icon={Save}
            className="w-full md:w-auto"
          >
            Save Listing
          </Button>
        </div>
      </Card>
    </div>
  );
};
