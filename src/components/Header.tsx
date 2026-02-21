import { Home, Map, Settings, Download, Plus } from "lucide-react";
import { Button } from "./ui/Button";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showWeights: boolean;
  setShowWeights: (show: boolean) => void;
  handleExport: () => void;
}

export const Header = ({
  activeTab,
  setActiveTab,
  showWeights,
  setShowWeights,
  handleExport,
}: HeaderProps) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
            <Home className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Apartment<span className="text-blue-600">Hunter</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Decision Matrix & Tracker
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => setActiveTab("destinations")}
            icon={Map}
            className={
              activeTab === "destinations"
                ? "bg-slate-100 ring-2 ring-slate-200"
                : ""
            }
          >
            Destinations
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowWeights(!showWeights)}
            icon={Settings}
            className={showWeights ? "bg-slate-100 ring-2 ring-slate-200" : ""}
          >
            Priorities
          </Button>
          <Button variant="secondary" onClick={handleExport} icon={Download}>
            Export
          </Button>
          <Button
            variant="primary"
            onClick={() => setActiveTab("add")}
            icon={Plus}
          >
            Add New
          </Button>
        </div>
      </div>
    </div>
  );
};
