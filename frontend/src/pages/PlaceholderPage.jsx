import { FileBarChart2 } from "lucide-react";
import { C } from "../theme.js";

export default function PlaceholderPage({ label }) {
  return (
    <div className="p-6 h-full flex items-center justify-center">
      <div className="text-center max-w-xs">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: C.bg, border: `1px solid ${C.line}` }}>
          <FileBarChart2 size={19} color={C.inkFaint} />
        </div>
        <p className="text-sm font-semibold" style={{ color: C.ink }}>{label}</p>
        <p className="text-xs mt-1.5" style={{ color: C.inkFaint }}>This module is scoped for a later build phase — not part of the current demo.</p>
      </div>
    </div>
  );
}
