import {
  AlertTriangle,
  Dumbbell,
  Calendar,
  Clock,
  BrainCircuit,
  Flag,
  Sparkles,
  Check,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Listing, Destination, AnalysisResult } from "../types";

interface ListingCardProps {
  item: Listing;
  index: number;
  destinations: Destination[];
  analysisResult?: AnalysisResult;
  analyzingId: number | null;
  handleAnalyzeListing: (listing: Listing) => void;
  toggleScam: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const ListingCard = ({
  item,
  index,
  destinations,
  analysisResult,
  analyzingId,
  handleAnalyzeListing,
  toggleScam,
  handleDelete,
}: ListingCardProps) => {
  const getScoreColor = (score: string | number) => {
    const s = Number(score);
    if (s >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (s >= 50) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <Card
      className={`hover:shadow-md transition-all duration-200 ${item.isScam ? "opacity-75 bg-red-50/30 grayscale-[0.5]" : ""}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Score Panel */}
        <div
          className={`p-4 md:w-32 flex md:flex-col items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-slate-100 ${item.isScam ? "bg-red-50" : "bg-slate-50"}`}
        >
          {item.isScam ? (
            <>
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
                Warning
              </span>
              <div className="relative flex items-center justify-center w-14 h-14 rounded-full border-4 text-red-600 bg-red-100 border-red-300">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="hidden md:block mt-2 text-[10px] text-red-500 font-bold">
                SCAM
              </div>
            </>
          ) : (
            <>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Match
              </span>
              <div
                className={`relative flex items-center justify-center w-14 h-14 rounded-full border-4 text-lg font-bold ${getScoreColor(item.score || 0)}`}
              >
                {item.score}
              </div>
              <div className="hidden md:block mt-2 text-[10px] text-slate-400 font-medium">
                RANK #{index + 1}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-5 relative">
          <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
            <div className="">
              <h3
                className={`text-lg font-bold leading-tight mb-1 ${item.isScam ? "text-slate-500 line-through" : "text-slate-900"}`}
              >
                {item.address}
              </h3>
              <div className="flex flex-wrap items-center text-sm text-slate-500 gap-x-4 gap-y-1">
                <a
                  href={item.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600 hover:underline flex items-center"
                >
                  Link to Listing{" "}
                  <svg
                    className="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
                {item.beds && <span>• {item.beds} Bed</span>}
                {item.gym && (
                  <span className="flex items-center text-blue-600 font-medium">
                    <Dumbbell className="w-3 h-3 mr-1" /> Gym
                  </span>
                )}
                {item.available && (
                  <span className="flex items-center text-emerald-600 font-medium">
                    <Calendar className="w-3 h-3 mr-1" /> Avail: {item.available}
                  </span>
                )}
                {item.posted && (
                  <span className="flex items-center text-slate-400 text-xs">
                    <Clock className="w-3 h-3 mr-1" /> Posted: {item.posted}
                  </span>
                )}
                <Button
                  variant={analysisResult ? "secondary" : "ghost"}
                  onClick={() => handleAnalyzeListing(item)}
                  loading={analyzingId === item.id}
                  className={`text-xs px-2 py-0.5 h-auto ${analysisResult ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "text-slate-400 hover:text-indigo-600"}`}
                  icon={BrainCircuit}
                >
                  {analysisResult ? "Close" : "Analyze"}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => toggleScam(item.id)}
                  className={`text-xs px-2 py-0.5 h-auto ${item.isScam ? "text-red-600 bg-red-50 hover:text-slate-600" : "text-slate-400 hover:text-red-600"}`}
                  icon={Flag}
                >
                  {item.isScam ? "Unflag Scam" : "Flag Scam"}
                </Button>
              </div>
            </div>
            <div className="mt-2 md:mt-0 text-left md:text-right">
              <div className="text-2xl font-bold text-slate-800">
                ${item.price.toLocaleString()}
              </div>
            </div>
          </div>

          {/* AI Analysis Result Panel */}
          {analysisResult && (
            <div className="mb-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center mb-2">
                <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
                <h4 className="font-bold text-indigo-900 text-sm">
                  Gemini Verdict
                </h4>
              </div>

              {analysisResult.scam_warning && (
                <div className="mb-4 bg-red-100 border border-red-200 text-red-800 p-3 rounded-md text-sm flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-red-600" />
                  <span className="font-medium">
                    {analysisResult.scam_warning}
                  </span>
                </div>
              )}

              <p className="text-sm text-indigo-800 mb-3 font-medium">
                "{analysisResult.verdict}"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                    Pros
                  </span>
                  <ul className="text-sm text-slate-700 space-y-1">
                    {analysisResult.pros.map((pro, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-3 h-3 text-emerald-500 mr-1.5 mt-1 shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-1">
                    Cons
                  </span>
                  <ul className="text-sm text-slate-700 space-y-1">
                    {analysisResult.cons.map((con, i) => (
                      <li key={i} className="flex items-start">
                        <X className="w-3 h-3 text-red-400 mr-1.5 mt-1 shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                Price/SqFt
              </div>
              <div className="font-semibold text-slate-700">
                ${item.ppsqft}{" "}
                <span className="text-slate-400 font-normal text-xs">
                  /sqft
                </span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                Size
              </div>
              <div className="font-semibold text-slate-700">
                {item.sqft}{" "}
                <span className="text-slate-400 font-normal text-xs">sqft</span>
              </div>
            </div>

            {/* Dynamic Commute Display */}
            {destinations.slice(0, 1).map((dest) => (
              <div
                key={dest.id}
                className="bg-slate-50 rounded-lg p-3 border border-slate-100"
              >
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1 truncate">
                  To {dest.name}
                </div>
                <div className="font-semibold text-slate-700">
                  {item.commutes[dest.id] || "?"}{" "}
                  <span className="text-slate-400 font-normal text-xs">
                    mins
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                Laundry
              </div>
              <div
                className={`font-semibold capitalize ${item.laundry === "in-unit" ? "text-emerald-600" : "text-slate-700"}`}
              >
                {item.laundry === "in-unit" && (
                  <Check className="w-3 h-3 inline mr-1" />
                )}
                {item.laundry}
              </div>
            </div>
          </div>

          {/* Footer / Notes */}
          <div className="flex items-start justify-between pt-4 border-t border-slate-100 mt-4">
            <div className="text-sm text-slate-600 italic flex-1 mr-4">
              {item.isScam && item.scamReason && (
                <span className="block text-red-600 font-medium mb-1 not-italic flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" /> AI Flag:{" "}
                  {item.scamReason}
                </span>
              )}
              {item.notes ? (
                `"${item.notes}"`
              ) : (
                <span className="text-slate-300 not-italic">
                  No notes added
                </span>
              )}
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-slate-400 hover:text-red-600 transition-colors p-1"
              title="Delete listing"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
