import { C, STATUS } from "../theme.js";

export function StatusPill({ status }) {
  const s = STATUS[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.fg, border: `1px solid ${s.line}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.fg }} />
      {s.label}
    </span>
  );
}

export function Card({ children, className = "", style = {} }) {
  return (
    <div className={`rounded-xl ${className}`} style={{ backgroundColor: C.card, border: `1px solid ${C.line}`, ...style }}>
      {children}
    </div>
  );
}

export function PrimaryButton({ children, onClick, icon: Icon, full, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${full ? "w-full" : ""}`}
      style={{ backgroundColor: C.navy, color: "#fff" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.navyDark)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.navy)}
    >
      {children}
      {Icon && <Icon size={16} />}
    </button>
  );
}

export function GhostButton({ children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
      style={{ border: `1px solid ${C.line}`, color: C.ink, backgroundColor: "transparent" }}
    >
      {children}
      {Icon && <Icon size={16} />}
    </button>
  );
}
