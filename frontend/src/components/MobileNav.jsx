import { NavLink, useNavigate } from "react-router-dom";
import { X, LogIn, LayoutDashboard, Map as MapIcon, FolderKanban, IndianRupee, ShieldAlert, FileBarChart2 } from "lucide-react";
import { C } from "../theme.js";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/BhoomiDhrishti.png";


const NAV_ITEMS = [
  { to: "dashboard", label: "Command Dashboard", icon: LayoutDashboard },
  { to: "map", label: "GIS Land Parcel Map", icon: MapIcon },
  { to: "projects", label: "Project & Workflow", icon: FolderKanban },
  { to: "compensation", label: "Compensation Tracking", icon: IndianRupee },
  { to: "risk", label: "Risk Scoring", icon: ShieldAlert },
  { to: "reports", label: "Reports", icon: FileBarChart2 },
];

export default function MobileNav({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  function handleLogout() {
    logout();
    navigate("/");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(4,26,56,0.5)" }} onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 flex flex-col" style={{ backgroundColor: C.navyDeeper }}>
        <div className="flex items-center justify-between px-4 h-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2.5">
            <span><img src={logo} alt="" width={250} className="rounded-2xl" /></span>
          </div>
          <button onClick={onClose}><X size={20} color="#fff" /></button>
        </div>
        <nav className="flex-1 py-4 px-2.5 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm"
                style={({ isActive }) => ({ backgroundColor: isActive ? "rgba(255,153,51,0.14)" : "transparent", color: isActive ? C.saffron : "rgba(255,255,255,0.75)", fontWeight: isActive ? 600 : 500 })}
              >
                <Icon size={18} /> {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            <LogIn size={18} className="rotate-180" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
