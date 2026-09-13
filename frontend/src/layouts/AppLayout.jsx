import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import MobileNav from "../components/MobileNav.jsx";
import { C } from "../theme.js";

// This component renders once and stays mounted while the user moves
// between /app/dashboard, /app/map, /app/projects, etc. Only the part
// marked <Outlet /> gets swapped out for whichever child route matched —
// that's how the sidebar/topbar avoid re-rendering on every page change.
export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scope, setScope] = useState("National view");

  return (
    <div className="h-screen w-full flex overflow-hidden" style={{ backgroundColor: C.bg }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar scope={scope} setScope={setScope} setMobileNavOpen={setMobileNavOpen} />
        <div className="flex-1 overflow-y-auto">
          {/* Whatever matched inside the /app/* route tree renders here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
