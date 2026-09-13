import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  LandPlot, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2, Lock,
} from "lucide-react";
import { C } from "../theme.js";
import { ROLES } from "../data/mockData.js";
import { PrimaryButton } from "../components/ui.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const [role, setRole] = useState("officer");
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If ProtectedRoute redirected us here, it stashed the page the user was
  // trying to reach in location.state.from. Fall back to the dashboard
  // if they just arrived at /login directly (e.g. from the homepage).
  const redirectTo = location.state?.from?.pathname || "/app/dashboard";

  function handleSubmit(e) {
    e.preventDefault();
    const roleLabel = ROLES.find((r) => r.key === role)?.label || "Officer";
    login(roleLabel);
    // navigate(path, { replace: true }) changes the URL in code and
    // removes /login from browser history, so the back button doesn't
    // take a logged-in user back to the login screen.
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between p-10 relative overflow-hidden" style={{ backgroundColor: C.navyDeeper }}>
        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <span><img src="public/" alt="" width={250} className="rounded-2xl" /></span>
        </Link>

        <div className="relative z-10 max-w-sm">
          <h2 className="text-3xl font-medium text-white mb-4 leading-tight font-serif">
            Secure access for every stakeholder in the acquisition chain.
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            From district officer to landowner, each login is scoped to exactly the records that role is entitled to see.
          </p>
          <div className="space-y-3">
            {[[ShieldCheck, "End-to-end encrypted sessions"], [CheckCircle2, "Aadhaar-linked identity verification"], [Lock, "Full audit trail on every access"]].map(([Icon, t]) => (
              <div key={t} className="flex items-center gap-2.5">
                <Icon size={15} color={C.saffron} />
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          © Ministry of Rural Development — National Informatics Centre
        </p>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full" style={{ backgroundColor: "rgba(255,153,51,0.06)" }} />
      </div>

      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-12" style={{ backgroundColor: C.bg }}>
        <Link to="/" className="md:hidden flex items-center gap-2.5 mb-10">
          <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: C.navy }}>
            <LandPlot size={18} color="#fff" />
          </div>
          <span className="text-sm font-semibold" style={{ color: C.ink }}>BhoomiDhrishti</span>
        </Link>

        <div className="max-w-sm w-full mx-auto md:mx-0">
          <h1 className="text-2xl font-medium mb-1.5 font-serif" style={{ color: C.ink }}>Sign in to your account</h1>
          <p className="text-sm mb-7" style={{ color: C.inkFaint }}>Select your role, then continue with your registered credentials.</p>

          <div className="grid grid-cols-1 gap-2 mb-6">
            {ROLES.map((r) => {
              const active = role === r.key;
              const Icon = r.icon;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-colors"
                  style={{ backgroundColor: active ? "rgba(11,61,145,0.05)" : C.card, border: `1px solid ${active ? C.navy : C.line}` }}
                >
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: active ? C.navy : C.bg }}>
                    <Icon size={15} color={active ? "#fff" : C.inkFaint} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold" style={{ color: C.ink }}>{r.label}</div>
                    <div className="text-[11px] truncate" style={{ color: C.inkFaint }}>{r.desc}</div>
                  </div>
                  {active && <CheckCircle2 size={16} color={C.navy} className="ml-auto shrink-0" />}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: C.inkSoft }}>Employee / Aadhaar ID</label>
              <input type="text" defaultValue="DLA-MH-04421" className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none" style={{ border: `1px solid ${C.line}`, color: C.ink }} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: C.inkSoft }}>Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} defaultValue="••••••••••" className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none pr-10" style={{ border: `1px solid ${C.line}`, color: C.ink }} />
                <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPw ? <EyeOff size={16} color={C.inkFaint} /> : <Eye size={16} color={C.inkFaint} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2" style={{ color: C.inkSoft }}>
                <input type="checkbox" defaultChecked className="rounded" /> Keep me signed in
              </label>
              <a href="#" style={{ color: C.navy }} className="font-medium">Forgot password?</a>
            </div>
            <PrimaryButton type="submit" full icon={ArrowRight}>Continue as {ROLES.find((r) => r.key === role)?.label}</PrimaryButton>
          </form>

          <div className="mt-5 p-3 rounded-lg flex items-start gap-2.5" style={{ backgroundColor: C.amberBg, border: `1px solid ${C.amberLine}` }}>
            <ShieldCheck size={15} color={C.amber} className="mt-0.5 shrink-0" />
            <p className="text-xs" style={{ color: C.amber }}>
              Judges / demo reviewers — use the role selector above and click continue; no live credentials are required for this preview build.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
