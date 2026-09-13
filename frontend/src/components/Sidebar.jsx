import { NavLink, useNavigate } from "react-router-dom";
import {
  LandPlot, LayoutDashboard, Map as MapIcon, FolderKanban, IndianRupee,
  ShieldAlert, FileBarChart2, Settings, LogIn, ChevronLeft, ChevronRight,
} from "lucide-react";
import { C } from "../theme.js";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_ITEMS = [
  { to: "dashboard", label: "Command Dashboard", icon: LayoutDashboard },
  { to: "map", label: "GIS Land Parcel Map", icon: MapIcon },
  { to: "projects", label: "Project & Workflow", icon: FolderKanban },
  { to: "compensation", label: "Compensation Tracking", icon: IndianRupee },
  { to: "risk", label: "Risk Scoring", icon: ShieldAlert },
  { to: "reports", label: "Reports", icon: FileBarChart2 },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    // useNavigate() is the hook version of changing the URL in code
    // (as opposed to <Link>/<NavLink>, which change it when clicked).
    navigate("/");
  }

  return (
    <aside
      className="hidden md:flex flex-col shrink-0 transition-all duration-200"
      style={{ width: collapsed ? 76 : 248, backgroundColor: C.navyDeeper }}
    >
      <div className="flex items-center gap-2.5 px-4 h-16 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: C.saffron }}>
          <LandPlot size={18} color={C.navyDeeper} />
        </div>
        {!collapsed && (
          <div className="leading-tight overflow-hidden">
            <div className="text-white text-sm font-semibold whitespace-nowrap">BhoomiSetu</div>
            <div className="text-[11px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.55)" }}>National Land Acquisition</div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
              // NavLink's style/className props can take a function that
              // receives { isActive } — react-router figures out on its
              // own whether the current URL matches this link, no manual
              // "selected page" state needed like in the old version.
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(255,153,51,0.14)" : "transparent",
                color: isActive ? C.saffron : "rgba(255,255,255,0.72)",
                fontWeight: isActive ? 600 : 500,
              })}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-2.5 space-y-1" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <NavLink to="settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
          <Settings size={18} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
          <LogIn size={18} className="shrink-0 rotate-180" />
          {!collapsed && <span>Sign out</span>}
        </button>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="w-full hidden md:flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs mt-1"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
