import { useSearchParams } from "react-router-dom";
import { MapPin, X, ArrowRight } from "lucide-react";
import { C, STATUS } from "../theme.js";
import { PARCELS } from "../data/mockData.js";
import { Card, StatusPill, PrimaryButton } from "../components/ui.jsx";

export default function MapPage() {
  // useSearchParams works like useState, but the "state" lives in the URL's
  // query string (?parcel=P-1005&status=disputed). This means a selected
  // parcel is shareable/bookmarkable and survives a refresh — something
  // plain useState could never do.
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("parcel");
  const filter = searchParams.get("status") || "all";

  const selected = PARCELS.find((p) => p.id === selectedId) || null;
  const visible = filter === "all" ? PARCELS : PARCELS.filter((p) => p.status === filter);

  function selectParcel(id) {
    // Update the query string; setSearchParams merges/replaces the params
    // you pass and pushes a new URL entry.
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("parcel", id);
      return next;
    });
  }

  function clearSelection() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("parcel");
      return next;
    });
  }

  function setFilter(status) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (status === "all") next.delete("status");
      else next.set("status", status);
      return next;
    });
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="flex-1 p-4 md:p-6 flex flex-col min-h-[420px]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: C.ink }}>Parcel sector — NH-44, Wardha bypass corridor</h3>
            <p className="text-xs mt-0.5" style={{ color: C.inkFaint }}>{visible.length} of {PARCELS.length} parcels shown · click a parcel for detail</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button onClick={() => setFilter("all")} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: filter === "all" ? C.navy : C.bg, color: filter === "all" ? "#fff" : C.inkSoft }}>All</button>
            {Object.entries(STATUS).map(([k, s]) => (
              <button key={k} onClick={() => setFilter(k)} className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5" style={{ backgroundColor: filter === k ? s.fg : C.bg, color: filter === k ? "#fff" : C.inkSoft }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: filter === k ? "#fff" : s.fg }} /> {s.label}
              </button>
            ))}
          </div>
        </div>

        <Card className="flex-1 p-4 md:p-5" style={{ backgroundColor: "#EEF2F7" }}>
          <div className="grid gap-1.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(34px, 1fr))" }}>
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() => selectParcel(p.id)}
                className="aspect-square rounded-[4px] transition-transform"
                style={{
                  backgroundColor: STATUS[p.status].fg,
                  opacity: selected?.id === p.id ? 1 : 0.82,
                  outline: selected?.id === p.id ? `2px solid ${C.navy}` : "none",
                  outlineOffset: "2px",
                }}
                title={p.id}
              />
            ))}
          </div>
        </Card>
      </div>

      <div className="w-full md:w-80 shrink-0 p-4 md:p-6 md:pl-0">
        <Card className="p-4 md:p-5 h-full">
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold px-2 py-1 rounded" style={{ backgroundColor: C.bg, color: C.ink }}>{selected.id}</span>
                <button onClick={clearSelection}><X size={16} color={C.inkFaint} /></button>
              </div>
              <StatusPill status={selected.status} />
              <h3 className="text-base font-semibold mt-3 mb-1 font-serif" style={{ color: C.ink }}>Survey parcel {selected.id}</h3>
              <p className="text-xs mb-4" style={{ color: C.inkFaint }}>Wardha bypass corridor, Maharashtra</p>
              <div className="space-y-3 text-sm">
                {[
                  ["Area", `${selected.area} acres`],
                  ["Owner of record", "Ramesh K. Patil"],
                  ["Current stage", "Section 15 objections"],
                  ["Notification date", "14 Feb 2025"],
                  ["Assessed value", "₹18.4 L / acre"],
                ].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between" style={{ borderBottom: `1px solid ${C.lineSoft}`, paddingBottom: 8 }}>
                    <span style={{ color: C.inkFaint }} className="text-xs">{l}</span>
                    <span style={{ color: C.ink }} className="text-xs font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
              <PrimaryButton full icon={ArrowRight}>Open full record</PrimaryButton>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <MapPin size={22} color={C.inkFaint} className="mb-3" />
              <p className="text-sm font-medium" style={{ color: C.inkSoft }}>No parcel selected</p>
              <p className="text-xs mt-1 max-w-[200px]" style={{ color: C.inkFaint }}>Click any parcel on the map to view ownership, stage and valuation detail. Try it, then check the URL bar.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
