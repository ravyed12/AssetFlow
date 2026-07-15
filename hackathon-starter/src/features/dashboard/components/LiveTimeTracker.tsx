"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Square } from "lucide-react";

export function LiveTimeTracker() {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#092B21] text-white p-5 shadow-lg h-[320px] flex flex-col justify-between">
      {/* Abstract flow graphic overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" className="h-full w-full object-cover">
          <path
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            d="M-50,150 Q25,120 100,160 T250,150 T400,160"
          />
          <path
            fill="none"
            stroke="#059669"
            strokeWidth="2"
            d="M-50,120 Q50,90 120,130 T270,120 T400,130"
          />
          <path
            fill="none"
            stroke="#047857"
            strokeWidth="1.5"
            d="M-50,90 Q75,60 150,100 T300,90 T400,100"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span className="text-[12px] font-bold uppercase tracking-widest text-emerald-400">
          Live Tracker
        </span>
        <h3 className="text-[15px] font-bold text-white mt-0.5">Uptime Counter</h3>
      </div>

      {/* Clock display */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-4">
        <span className="text-4xl font-mono font-extrabold tracking-widest text-white drop-shadow">
          {formatTime(time)}
        </span>
        <span className="text-[11px] font-bold text-emerald-300/60 uppercase tracking-widest mt-1.5">
          System Session Active
        </span>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-center gap-4 border-t border-emerald-900/50 pt-4">
        <button
          onClick={() => setIsRunning((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#092B21] transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          {isRunning ? (
            <Pause size={18} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play size={18} fill="currentColor" strokeWidth={0} className="ml-0.5" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <Square size={16} fill="currentColor" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}
