"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, ticketId, timeAgo, URGENCY_COLOR, type Urgency } from "@/lib/constants";
import dynamic from "next/dynamic";

const FullMap = dynamic(() => import("@/components/full-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-[var(--text-muted)]">
      Loading map...
    </div>
  ),
});

interface Complaint {
  id: string;
  summary: string | null;
  category: string | null;
  status: string | null;
  urgency: string | null;
  timestamp: string | null;
  location: string | null;
  ward: string | null;
  assigned_to: string | null;
  photo_url: string | null;
}

// State declarations with selected complaint
export default function MapPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [wards, setWards] = useState<any>(null);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [showWards, setShowWards] = useState(false);
  const [showIncidents, setShowIncidents] = useState(false);
  const [selected, setSelected] = useState<Complaint | null>(null);
  // Fetch wards GeoJSON
  useEffect(() => {
    fetch('/api/wards')
      .then((res) => res.json())
      .then(setWards)
      .catch(console.error);
  }, []);

  // Fetch incident data
  useEffect(() => {
    fetch('/api/incidents')
      .then((res) => res.json())
      .then(setIncidents)
      .catch(console.error);
  }, []);
  const [catFilter, setCatFilter] = useState("all");
  const [urgencyFilters, setUrgencyFilters] = useState<string[]>([
    "Critical",
    "High",
    "Medium",
    "Low",
  ]);

  const fetchData = useCallback(async () => {
    const { data } = await supabase
      .from("raw_complaints")
      .select("id,summary,category,status,urgency,timestamp,location,ward,assigned_to,photo_url");
    setComplaints((data || []) as Complaint[]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleUrgency = (u: string) => {
    setUrgencyFilters((prev) =>
      prev.includes(u) ? prev.filter((x) => x !== u) : [...prev, u]
    );
  };

  const filtered = complaints.filter((c) => {
    if (catFilter !== "all" && c.category !== catFilter) return false;
    if (!urgencyFilters.includes(c.urgency || "Low")) return false;
    return true;
  });

  async function dispatchTeam(id: string) {
    await supabase
      .from("raw_complaints")
      .update({ status: "assigned", assigned_at: new Date().toISOString() })
      .eq("id", id);
    fetchData();
    setSelected(null);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden md:h-screen">
      {/* Left panel — hidden on mobile */}
      <div className="hidden w-72 flex-col border-r border-[var(--border-color)] bg-[var(--surface)] md:flex">
        <div className="border-b border-[var(--border-color)] p-4">
          <h2 className="text-sm font-bold text-[var(--brand)]">Filters</h2>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setShowWards(!showWards)}
              className={`px-2 py-1 text-xs rounded ${showWards ? 'bg-[var(--brand)] text-[var(--btn-primary-fg)]' : 'bg-[var(--surface)] text-[var(--text-secondary)]'}`}
            >
              {showWards ? 'Hide' : 'Show'} Ward Heatmap
            </button>
            <button
              onClick={() => setShowIncidents(!showIncidents)}
              className={`px-2 py-1 text-xs rounded ${showIncidents ? 'bg-[var(--brand)] text-[var(--btn-primary-fg)]' : 'bg-[var(--surface)] text-[var(--text-secondary)]'}`}
            >
              {showIncidents ? 'Hide' : 'Show'} CCTV Incidents
            </button>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
              Urgency Level
            </p>
            <div className="flex flex-wrap gap-2">
              {(["Critical", "High", "Medium", "Low"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => toggleUrgency(u)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    urgencyFilters.includes(u)
                      ? URGENCY_COLOR[u]
                      : "bg-[var(--stat-bg)] text-[var(--text-muted)]"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-[var(--text-secondary)]">
              Issue Category
            </p>
            <Select value={catFilter} onValueChange={(v) => setCatFilter(v ?? "all")}>
              <SelectTrigger className="w-full bg-[var(--surface)] text-xs">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-auto border-t border-[var(--border-color)] p-4">
          <p className="text-xs text-[var(--text-muted)]">
            {filtered.length} complaints visible
          </p>
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1">
        <FullMap
          complaints={filtered}
          onSelect={(c) => setSelected(c)}
          wards={wards}
          incidents={incidents}
          showWards={showWards}
          showIncidents={showIncidents}
        />
      </div>

      {/* Right detail panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto border-l border-[var(--border-color)] bg-[var(--surface)] sm:w-80 md:relative md:inset-auto md:z-auto">
          {selected.photo_url && (
            <img
              src={selected.photo_url}
              alt="Complaint photo"
              className="h-48 w-full object-cover"
            />
          )}
          <div className="p-5">
            <h3 className="mb-2 text-sm font-bold text-[var(--brand)]">
              {selected.summary || "No summary"}
            </h3>
            <Badge variant="outline" className="mb-3 font-mono text-[10px]">
              {ticketId(selected.id)}
            </Badge>
            <p className="mb-4 text-xs text-[var(--text-secondary)]">
              Reported {selected.timestamp ? timeAgo(selected.timestamp) : "N/A"}
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Ward</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {selected.ward || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Assigned To</span>
                <span className="font-medium text-[var(--text-primary)]">
                  {selected.assigned_to || "Unassigned"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Urgency</span>
                <Badge
                  variant="outline"
                  className={`text-[10px] ${
                    URGENCY_COLOR[(selected.urgency as Urgency) || "Low"]
                  }`}
                >
                  {selected.urgency || "Low"}
                </Badge>
              </div>
            </div>

            <button
              onClick={() => dispatchTeam(selected.id)}
              className="mt-6 w-full rounded-lg bg-[var(--brand)] py-2.5 text-sm font-medium text-[var(--btn-primary-fg)] transition-colors hover:bg-[var(--brand-hover)]"
            >
              Dispatch Team
            </button>
            <button
              onClick={() => setSelected(null)}
              className="mt-2 w-full rounded-lg border border-[var(--border-color)] py-2 text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-elevated)]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
