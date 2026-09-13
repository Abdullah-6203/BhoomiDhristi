import { useState } from "react";
import { FolderKanban, ChevronDown, CheckCircle2, Clock3 } from "lucide-react";
import { C } from "../theme.js";
import { PROJECTS, STAGES } from "../data/mockData.js";
import { Card, StatusPill } from "../components/ui.jsx";

export default function ProjectsPage() {
  const [openId, setOpenId] = useState(PROJECTS[0].id);

  return (
    <div className="p-4 md:p-6 space-y-3.5">
      <div className="mb-1">
        <h3 className="text-sm font-semibold" style={{ color: C.ink }}>Active acquisition projects</h3>
        <p className="text-xs mt-0.5" style={{ color: C.inkFaint }}>Workflow stages follow RFCTLARR Act sections 4 through possession</p>
      </div>

      {PROJECTS.map((p) => {
        const open = openId === p.id;
        return (
          <Card key={p.id} className="overflow-hidden">
            <button onClick={() => setOpenId(open ? null : p.id)} className="w-full flex items-center justify-between gap-4 p-4 text-left">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: C.bg }}>
                  <FolderKanban size={17} color={C.navy} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: C.ink }}>{p.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: C.inkFaint }}>{p.id} · {p.authority} · {p.state} · {p.parcels} parcels</div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:block"><StatusPill status={p.status} /></div>
                <ChevronDown size={16} color={C.inkFaint} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
              </div>
            </button>

            {open && (
              <div className="px-4 pb-5" style={{ borderTop: `1px solid ${C.lineSoft}` }}>
                <div className="sm:hidden pt-3"><StatusPill status={p.status} /></div>
                <div className="pt-5 overflow-x-auto">
                  <div className="flex items-start min-w-[560px]">
                    {STAGES.map((s, i) => {
                      const done = i < p.stageIndex;
                      const current = i === p.stageIndex;
                      return (
                        <div key={s.key} className="flex items-center flex-1">
                          <div className="flex flex-col items-center text-center" style={{ width: 92 }}>
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center mb-2"
                              style={{ backgroundColor: done ? C.greenBg : current ? C.amberBg : C.bg, border: `1.5px solid ${done ? C.greenDark : current ? C.amber : C.line}` }}
                            >
                              {done ? <CheckCircle2 size={15} color={C.greenDark} /> : current ? <Clock3 size={14} color={C.amber} /> : <span className="text-xs font-semibold" style={{ color: C.inkFaint }}>{i + 1}</span>}
                            </div>
                            <div className="text-xs font-semibold" style={{ color: done || current ? C.ink : C.inkFaint }}>{s.label}</div>
                            <div className="text-[10px] mt-0.5 leading-tight" style={{ color: C.inkFaint }}>{s.sub}</div>
                          </div>
                          {i < STAGES.length - 1 && (
                            <div className="flex-1 mt-4" style={{ height: 1.5, backgroundColor: i < p.stageIndex ? C.greenDark : C.line }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
