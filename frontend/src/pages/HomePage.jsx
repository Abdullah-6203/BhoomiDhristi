import { Link } from "react-router-dom";
import {
  ArrowRight, Map as MapIcon, ScrollText, Globe2, ShieldCheck,
  CheckCircle2, Lock,
} from "lucide-react";
import { C, STATUS } from "../theme.js";
import { PrimaryButton, GhostButton, Card } from "../components/ui.jsx";
import { KPIS, PARCELS } from "../data/mockData.js";

const PARCELS_PREVIEW = PARCELS.slice(0, 64);

export default function HomePage() {
  return (
    <div style={{ backgroundColor: C.bg }}>
      <header className="sticky top-0 z-40" style={{ backgroundColor: C.navyDeeper }}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span><img src="public/BhoomiDhrishti.png" alt="" width={250} className="rounded-2xl" /></span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            <a href="#mission" className="hover:text-white">Mission</a>
            <a href="#platform" className="hover:text-white">Platform</a>
            <a href="#transparency" className="hover:text-white">Transparency</a>
            <a href="#help" className="hover:text-white">Help</a>
          </nav>
          {/* <Link> renders a real <a> tag under the hood, so it keeps
              working as a link (open in new tab, etc.) but router
              intercepts the click and swaps pages without a full
              browser reload. Compare this to the old onClick={() => setView("login")}. */}
          <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ backgroundColor: C.saffron, color: C.navyDeeper }}>
            Officer / Citizen Login
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden" style={{ backgroundColor: C.navyDeeper }}>
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ backgroundColor: "rgba(255,153,51,0.14)", border: "1px solid rgba(255,153,51,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.saffron }} />
              <span className="text-xs font-medium" style={{ color: C.saffron }}>RFCTLARR Act, 2013 — digital implementation</span>
            </div>
            <h1 className="text-4xl md:text-[3.25rem] leading-[1.08] font-medium text-white mb-6 font-serif">
              One record of truth for every acre acquired in India's name.
            </h1>
            <p className="text-base md:text-lg mb-9 max-w-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
              BhoomiDhrishti tracks land acquisition from the first notification to final possession —
              giving officers a command view and landowners a transparent, verifiable record of their claim.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/login">
                <PrimaryButton icon={ArrowRight}>Enter the platform</PrimaryButton>
              </Link>
              <Link to="/login">
                <GhostButton><span style={{ color: "rgba(255,255,255,0.85)" }}>Track my parcel</span></GhostButton>
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12">
              {[["28", "States & UTs live"], ["48,204", "Parcels tracked"], ["₹9,214 Cr", "Compensation disbursed"]].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-medium text-white font-serif">{v}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Live parcel status — sample sector</span>
                <MapIcon size={14} color="rgba(255,255,255,0.4)" />
              </div>
              <div className="grid grid-cols-8 gap-1.5">
                {PARCELS_PREVIEW.map((p) => (
                  <div key={p.id} className="aspect-square rounded-[3px]" style={{ backgroundColor: STATUS[p.status].fg, opacity: 0.85 }} title={p.id} />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 px-1">
                {Object.entries(STATUS).map(([k, s]) => (
                  <div key={k} className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: s.fg }} />
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="max-w-6xl mx-auto px-5 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ScrollText, title: "Statutory by design", text: "Every workflow stage maps directly to a section of the RFCTLARR Act — Section 4 through possession — so no process step is invented or skipped." },
            { icon: Globe2, title: "One national view", text: "District, state and national officers see the same data at different resolutions, from a single GIS-linked parcel record." },
            { icon: ShieldCheck, title: "Built for accountability", text: "Bottlenecks, disputes and delays surface automatically, so escalation happens before a project stalls for months." },
          ].map((f) => (
            <div key={f.title}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: C.bg, border: `1px solid ${C.line}` }}>
                <f.icon size={18} color={C.navy} />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-serif" style={{ color: C.ink }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="platform" className="py-16 md:py-20" style={{ backgroundColor: C.card, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl md:text-3xl font-medium mb-3 font-serif" style={{ color: C.ink }}>A command dashboard, not a filing cabinet</h2>
            <p className="text-sm md:text-base" style={{ color: C.inkSoft }}>
              Officers get real-time visibility into every stage of every project — where compensation is stuck,
              which parcels are disputed, and which states are falling behind schedule.
            </p>
          </div>
          <Card className="p-4 md:p-6" style={{ boxShadow: "0 20px 40px -24px rgba(11,61,145,0.25)" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {KPIS.map((k) => (
                <div key={k.label} className="rounded-lg p-3.5" style={{ backgroundColor: C.bg }}>
                  <div className="flex items-center justify-between mb-2">
                    <k.icon size={15} color={C.navy} />
                    <span className="text-[11px] font-semibold" style={{ color: k.up ? C.greenDark : C.red }}>{k.delta}</span>
                  </div>
                  <div className="text-lg font-semibold font-serif" style={{ color: C.ink }}>{k.value}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: C.inkFaint }}>{k.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <footer id="transparency" className="py-14" style={{ backgroundColor: C.navyDeeper }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-2.5">
            <span><img src="public/BhoomiDhrishti.png" alt="" width={250} className="rounded-2xl" /></span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> WCAG 2.1 AA compliant</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={13} /> GIGW 3.0 aligned</span>
              <span className="flex items-center gap-1.5"><Lock size={13} /> Govt.-grade data security</span>
            </div>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }} id="help">
            Ministry of Rural Development · National Informatics Centre — for grievance redressal, contact your district land acquisition office.
          </p>
        </div>
      </footer>
    </div>
  );
}
