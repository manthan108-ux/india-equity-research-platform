"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [ticker, setTicker] = useState("");
  const [status, setStatus] = useState("");
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);

  // Ping FastAPI health endpoint on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "healthy") {
          setBackendConnected(true);
        } else {
          setBackendConnected(false);
        }
      })
      .catch(() => setBackendConnected(false));
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim()) return;
    setStatus(`Frontend works. Ready to analyze: ${ticker.toUpperCase()}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-lg border border-slate-700 bg-slate-900 rounded-lg p-8 shadow-2xl text-center space-y-6">
        
        {/* Title Section */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-wider text-slate-100">
            AI EQUITY RESEARCH COPILOT
          </h1>
          <p className="text-sm font-semibold tracking-widest text-emerald-400">
            INDIA
          </p>
        </div>

        <p className="text-sm text-slate-400">
          Analyze any Indian listed company
        </p>

        {/* Input & Action Form */}
        <form onSubmit={handleGenerate} className="space-y-5">
          <div>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="RELIANCE / TCS / INFY / SBIN"
              className="w-full bg-slate-950 border border-slate-700 rounded px-4 py-3 text-center uppercase tracking-wider text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-3 px-6 rounded transition-colors tracking-wide cursor-pointer"
          >
            GENERATE RESEARCH
          </button>
        </form>

        {/* Confirmation State */}
        {status && (
          <div className="pt-2 text-xs text-emerald-400 font-semibold border-t border-slate-800">
            {status}
          </div>
        )}

        {/* Backend Status Indicator */}
        <div className="pt-4 border-t border-slate-800 text-xs">
          {backendConnected === true && (
            <span className="text-emerald-400 font-bold">
              Backend Status: Connected ✓
            </span>
          )}
          {backendConnected === false && (
            <span className="text-rose-500 font-bold">
              Backend Status: Disconnected ✗
            </span>
          )}
          {backendConnected === null && (
            <span className="text-slate-500">
              Checking Backend Connection...
            </span>
          )}
        </div>

      </div>
    </main>
  );
}