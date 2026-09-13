import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, ArrowUpRight, AlertTriangle, Filter } from "lucide-react";
import { C, STATUS } from "../theme.js";
import { KPIS, STATE_ROWS, ALERTS, PARCELS } from "../data/mockData.js";
import { Card } from "../components/ui.jsx";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {KPIS.map((k) => (
          <Card key={k.label} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: C.bg }}>
                <k.icon size={16} color={C.navy} />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: k.up ? C.greenDark : C.red }}>
                {k.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {k.delta}
              </span>
            </div>
            <div className="text-xl font-semibold font-serif" style={{ color: C.ink }}>{k.value}</div>
            <div className="text-xs mt-1" style={{ color: C.inkFaint }}>{k.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-5">
        <Card className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: C.ink }}>GIS parcel overview</h3>
              <p className="text-xs mt-0.5" style={{ color: C.inkFaint }}>Sample sector — live map on full screen</p>
            </div>
            {/* Link straight to the map route — no prop drilling of a
                setPage function like the previous version needed. */}
            <Link to="/app/map" className="text-xs font-semibold flex items-center gap-1" style={{ color: C.navy }}>
              Open full map <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-1.5 mb-4">
            {PARCELS.map((p) => (
              <div key={p.id} className="aspect-square rounded-[3px]" style={{ backgroundColor: STATUS[p.status].fg, opacity: 0.85 }} />
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {Object.entries(STATUS).map(([k, s]) => (
              <div key={k} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.fg }} />
                <span className="text-xs" style={{ color: C.inkSoft }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: C.ink }}>Bottleneck alerts</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.redBg, color: C.red }}>{ALERTS.length} active</span>
          </div>
          <div className="space-y-3">
            {ALERTS.map((a) => (
              <div key={a.id} className="flex items-start gap-3 pb-3 last:pb-0" style={{ borderBottom: `1px solid ${C.lineSoft}` }}>
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: a.severity === "high" ? C.redBg : a.severity === "medium" ? C.amberBg : C.greenBg }}>
                  <AlertTriangle size={13} color={a.severity === "high" ? C.red : a.severity === "medium" ? C.amber : C.greenDark} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: C.ink }}>{a.project}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: C.inkFaint }}>{a.state} · stalled at {a.stage}</div>
                  <div className="text-[11px] font-medium mt-0.5" style={{ color: C.red }}>{a.days} days without movement</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: C.ink }}>State-wise monitoring</h3>
          <button className="text-xs font-semibold flex items-center gap-1.5" style={{ color: C.inkSoft }}>
            <Filter size={13} /> Filter
          </button>
        </div>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-160">
            <thead>
              <tr style={{ color: C.inkFaint }} className="text-left text-xs">
                <th className="font-medium pb-2.5 px-1">State</th>
                <th className="font-medium pb-2.5 px-1">Projects</th>
                <th className="font-medium pb-2.5 px-1">Parcels</th>
                <th className="font-medium pb-2.5 px-1 w-40">Cleared %</th>
                <th className="font-medium pb-2.5 px-1">Disputed</th>
                <th className="font-medium pb-2.5 px-1">Avg. days / stage</th>
              </tr>
            </thead>
            <tbody>
              {STATE_ROWS.map((s) => (
                <tr key={s.state} style={{ borderTop: `1px solid ${C.lineSoft}` }}>
                  <td className="py-3 px-1 font-medium" style={{ color: C.ink }}>{s.state}</td>
                  <td className="py-3 px-1" style={{ color: C.inkSoft }}>{s.projects}</td>
                  <td className="py-3 px-1" style={{ color: C.inkSoft }}>{s.parcels.toLocaleString()}</td>
                  <td className="py-3 px-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.lineSoft }}>
                        <div className="h-full rounded-full" style={{ width: `${s.cleared}%`, backgroundColor: C.green }} />
                      </div>
                      <span className="text-xs font-medium w-8" style={{ color: C.inkSoft }}>{s.cleared}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: s.disputed > 10 ? C.redBg : C.amberBg, color: s.disputed > 10 ? C.red : C.amber }}>{s.disputed}</span>
                  </td>
                  <td className="py-3 px-1" style={{ color: C.inkSoft }}>{s.avgDays} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
