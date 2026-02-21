import { X, Plus, MapPin, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";
import { Destination } from "../types";

interface DestinationsTabProps {
  destinations: Destination[];
  newDestination: { name: string; address: string };
  setNewDestination: (dest: { name: string; address: string }) => void;
  handleAddDestination: () => void;
  handleDeleteDestination: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export const DestinationsTab = ({
  destinations,
  newDestination,
  setNewDestination,
  handleAddDestination,
  handleDeleteDestination,
  setActiveTab,
}: DestinationsTabProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Commute Destinations
          </h2>
          <p className="text-sm text-slate-500">
            Add places you visit frequently to calculate drive times.
          </p>
        </div>
        <Button variant="ghost" onClick={() => setActiveTab("list")} icon={X}>
          Close
        </Button>
      </div>

      <Card className="p-6 mb-6 bg-blue-50 border-blue-100">
        <h3 className="font-bold text-blue-900 mb-4 flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add New Destination
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Name (e.g. Work, Gym)"
            value={newDestination.name}
            onChange={(e) =>
              setNewDestination({
                ...newDestination,
                name: e.target.value,
              })
            }
          />
          <Input
            placeholder="Address (e.g. 1 Market St)"
            value={newDestination.address}
            onChange={(e) =>
              setNewDestination({
                ...newDestination,
                address: e.target.value,
              })
            }
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleAddDestination}
            disabled={!newDestination.name || !newDestination.address}
          >
            Add Destination
          </Button>
        </div>
      </Card>

      <div className="space-y-3">
        {destinations.map((dest) => (
          <Card
            key={dest.id}
            className="p-4 flex items-center justify-between group"
          >
            <div className="flex items-center">
              <div className="p-3 bg-slate-100 rounded-lg mr-4 text-slate-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{dest.name}</h4>
                <p className="text-sm text-slate-500">{dest.address}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-600 hover:bg-red-50"
              onClick={() => handleDeleteDestination(dest.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))}
        {destinations.length === 0 && (
          <div className="text-center py-10 text-slate-400">
            No destinations added yet.
          </div>
        )}
      </div>
    </div>
  );
};
