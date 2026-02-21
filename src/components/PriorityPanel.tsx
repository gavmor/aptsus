import React from "react";
import { TrendingUp, GripVertical, AlertCircle } from "lucide-react";
import { Criteria } from "../types";

interface PriorityPanelProps {
  showWeights: boolean;
  priorities: string[];
  criteriaConfig: Record<string, Criteria>;
  draggedItem: number | null;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
}

export const PriorityPanel = ({
  showWeights,
  priorities,
  criteriaConfig,
  draggedItem,
  onDragStart,
  onDragOver,
  onDragEnd,
}: PriorityPanelProps) => {
  if (!showWeights) return null;

  const getPriorityStyle = (index: number) => {
    if (index === 0)
      return "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600 shadow-sm";
    if (index < 3) return "border-blue-300 bg-white shadow-sm";
    return "border-slate-200 bg-slate-50 text-slate-500";
  };

  const getBadgeStyle = (index: number) => {
    if (index === 0) return "bg-blue-600 text-white";
    if (index < 3) return "bg-blue-400 text-white";
    return "bg-slate-200 text-slate-500";
  };

  return (
    <div className="bg-slate-50 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
            Drag to Rank Importance
          </h3>

          <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 mt-2 md:mt-0">
            <span className="text-blue-600">High Priority</span>
            <div className="h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-600 to-slate-200"></div>
            <span className="text-slate-400">Low Priority</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {priorities.map((key, index) => {
            const config = criteriaConfig[key] || {
              label: key,
              icon: AlertCircle,
              desc: "Unknown",
            };
            const isDragging = draggedItem === index;
            return (
              <div
                key={key}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnd={onDragEnd}
                className={`
                  relative flex items-center p-3 rounded-xl border cursor-move select-none transition-all duration-200
                  ${getPriorityStyle(index)}
                  ${isDragging ? "opacity-50 scale-95 z-10" : "hover:scale-[1.02]"}
                `}
              >
                <div className="mr-3 text-slate-300 cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center font-bold text-slate-700 text-sm truncate">
                    {config.icon && (
                      <config.icon className="w-4 h-4 mr-2 opacity-50 shrink-0" />
                    )}
                    <span className="truncate">{config.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate">
                    {config.desc}
                  </div>
                </div>
                <div
                  className={`text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ml-2 shadow-sm shrink-0 ${getBadgeStyle(index)}`}
                >
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
