import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import PlaceholderPage from "./pages/PlaceholderPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Every <Route> maps a URL path to a component. This replaces the old
// `if (view === "home") return <HomePage />` chain entirely — react-router
// reads the browser's current URL and figures out which Route(s) match.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Nested routes: everything under /app/* renders inside AppLayout's
          <Outlet />. ProtectedRoute wraps the whole group, so every child
          path automatically requires login — you don't re-check auth on
          each individual page. */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* "index" is the route that matches exactly "/app" with nothing
            after it — we just bounce that to the dashboard. */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="compensation" element={<PlaceholderPage label="Compensation Tracking" />} />
        <Route path="risk" element={<PlaceholderPage label="Risk Scoring" />} />
        <Route path="reports" element={<PlaceholderPage label="Reports" />} />
        <Route path="settings" element={<PlaceholderPage label="Settings" />} />
      </Route>

      {/* Catch-all: any URL that matches nothing above sends the user home,
          instead of showing a blank page. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
