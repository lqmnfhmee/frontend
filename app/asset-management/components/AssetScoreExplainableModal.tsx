"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Database, Clock } from "lucide-react";

interface AssetScoreExplainableModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
}

export default function AssetScoreExplainableModal({
  isOpen,
  onClose,
  score,
}: AssetScoreExplainableModalProps) {
  // Scroll locking
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Use Portal to render outside parent hierarchy
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 isolate">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <span className="text-2xl font-black">{score}</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Performance Score Calculation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Derived from real-time operational indicators
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-8 space-y-8">
          
          {/* Formula Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Calculation Logic</h4>
            <div className="px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30">
              <div className="font-mono text-[13px] leading-relaxed">
                <div className="text-slate-500">
                  Score = (Status × 50%) + (Availability × 50%)
                </div>
                <div className="mt-1 text-slate-900 dark:text-slate-200 font-medium">
                  Score = (92 × 0.5) + (84 × 0.5) = <span className="font-bold text-emerald-500">{score}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Score Drivers Section */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Input Drivers</h4>
            <div className="overflow-hidden">
              <div className="grid grid-cols-12 gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                <div className="col-span-8">Driver Name</div>
                <div className="col-span-2 text-right">Value</div>
                <div className="col-span-2 text-right">Weight</div>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                <div className="grid grid-cols-12 gap-2 py-3 px-1 items-center">
                  <div className="col-span-8 text-sm font-medium text-slate-700 dark:text-slate-200">Asset Operational Status</div>
                  <div className="col-span-2 text-right text-sm font-bold text-emerald-500">92%</div>
                  <div className="col-span-2 text-right text-xs text-slate-400">50%</div>
                </div>
                <div className="grid grid-cols-12 gap-2 py-3 px-1 items-center">
                  <div className="col-span-8 text-sm font-medium text-slate-700 dark:text-slate-200">Asset Availability Indicators</div>
                  <div className="col-span-2 text-right text-sm font-bold text-blue-500">84%</div>
                  <div className="col-span-2 text-right text-xs text-slate-400">50%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation & Metadata */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
              This score represents the composite operational health of the asset fleet. A score of 88 indicates stable performance meeting the healthy threshold.
            </p>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-medium text-slate-400 uppercase tracking-wide">
              <div className="flex items-center gap-1.5">
                <Database size={12} className="text-slate-300 dark:text-slate-700" />
                <span>Source: CMMS & Monitoring System</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-slate-300 dark:text-slate-700" />
                <span>Updated: 10 mins ago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
}
