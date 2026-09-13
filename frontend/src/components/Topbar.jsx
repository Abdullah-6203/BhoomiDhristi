import { useLocation } from "react-router-dom";
import { Bell, Search, Menu, Layers } from "lucide-react";
import { C } from "../theme.js";
import { useAuth } from "../context/AuthContext.jsx";

const TITLES = {
  dashboard: { title: "National Command Dashboard", subtitle: "Real-time acquisition status across India" },
  map: { title: "GIS Land Parcel Map", subtitle: "Parcel-level status and ownership detail" },
  projects: { title: "Project & Workflow Tracking", subtitle: "Progress through RFCTLARR statutory stages" },
  compensation: { title: "Compensation Tracking", subtitle: "" },
  risk: { title: "Risk Scoring", subtitle: "" },
  reports: { title: "Reports", subtitle: "" },
  settings: { title: "Settings", subtitle: "" },
};

export default function Topbar({ scope, setScope, setMobileNavOpen }) {
  const { role } = useAuth();
  // useLocation() gives you the current URL info. pathname looks like
  // "/app/dashboard" — we split it and take the last segment to know
  // which page we're on, instead of reading a "page" state variable.
  const location = useLocation();
  const segment = location.pathname.split("/").filter(Boolean).pop() || "dashboard";
  const meta = TITLES[segment] || { title: "BhoomiDhrishti", subtitle: "" };
  const isDashboard = segment === "dashboard";

  return (
    <header className="h-16 shrink-0 flex items-center justify-between gap-3 px-4 md:px-6" style={{ backgroundColor: C.card, borderBottom: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-3 min-w-0">
        <button className="md:hidden shrink-0" onClick={() => setMobileNavOpen(true)}>
          <Menu size={22} color={C.ink} />
        </button>
        <div className="min-w-0">
          <h1 className="text-base md:text-lg font-semibold truncate" style={{ color: C.ink }}>{meta.title}</h1>
          {meta.subtitle && <p className="text-xs truncate hidden sm:block" style={{ color: C.inkFaint }}>{meta.subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {isDashboard && (
          <div className="hidden lg:flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-lg" style={{ border: `1px solid ${C.line}` }}>
            <Layers size={14} color={C.inkFaint} />
            <select value={scope} onChange={(e) => setScope(e.target.value)} className="text-xs font-medium bg-transparent outline-none pr-1" style={{ color: C.ink }}>
              <option>National view</option>
              <option>Maharashtra</option>
              <option>Uttar Pradesh</option>
              <option>Gujarat</option>
              <option>Odisha</option>
            </select>
          </div>
        )}
        <button className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center" style={{ border: `1px solid ${C.line}` }}>
          <Search size={16} color={C.inkSoft} />
        </button>
        <button className="w-9 h-9 rounded-full items-center justify-center relative flex" style={{ border: `1px solid ${C.line}` }}>
          <Bell size={16} color={C.inkSoft} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.red }} />
        </button>
        <div className="flex items-center gap-2 pl-2.5 border-l" style={{ borderColor: C.line }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white" style={{ backgroundColor: C.navy }}>
            {role?.[0] ?? "N"}
          </div>
          <div className="hidden md:block leading-tight">
            <div className="text-xs font-semibold" style={{ color: C.ink }}>{role || "National Command"}</div>
            <div className="text-[11px]" style={{ color: C.inkFaint }}>Verified officer</div>
          </div>
        </div>
      </div>
    </header>
  );
}
