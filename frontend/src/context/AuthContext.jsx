import { createContext, useContext, useState } from "react";

// createContext gives us a "box" that any component, no matter how deep
// in the tree, can read from without props being passed down manually
// through every level in between (that manual passing is called
// "prop drilling" — Context is how you avoid it).
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Restore role from localStorage on first load, so refreshing the page
  // doesn't log you out. This runs once because useState's initial value
  // function only executes on the very first render.
  const [role, setRole] = useState(() => localStorage.getItem("BhoomiDhrishti_role") || "");

  function login(roleLabel) {
    setRole(roleLabel);
    localStorage.setItem("BhoomiDhrishti_role", roleLabel);
  }

  function logout() {
    setRole("");
    localStorage.removeItem("BhoomiDhrishti_role");
  }

  const value = { role, isAuthenticated: Boolean(role), login, logout };

  // Anything rendered inside <AuthProvider> can call useAuth() below
  // to read `value` — that's the whole mechanism.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Small wrapper hook so components write `useAuth()` instead of
// `useContext(AuthContext)` everywhere — just a convenience.
export function useAuth() {
  return useContext(AuthContext);
}
