import {
  LandPlot, ScrollText, IndianRupee, ShieldAlert, Building2, Landmark,
  Globe2, UserCircle2, ShieldCheck,
} from "lucide-react";

export const KPIS = [
  { label: "Parcels under acquisition", value: "48,204", delta: "+3.1%", up: true, icon: LandPlot },
  { label: "Awards declared (FY)", value: "12,860", delta: "+8.4%", up: true, icon: ScrollText },
  { label: "Compensation disbursed", value: "₹9,214 Cr", delta: "+5.7%", up: true, icon: IndianRupee },
  { label: "Disputed parcels", value: "1,392", delta: "-2.2%", up: false, icon: ShieldAlert },
];

export const STATE_ROWS = [
  { state: "Maharashtra", projects: 62, parcels: 8420, cleared: 71, disputed: 6, avgDays: 214 },
  { state: "Uttar Pradesh", projects: 88, parcels: 11230, cleared: 58, disputed: 11, avgDays: 268 },
  { state: "Gujarat", projects: 41, parcels: 5890, cleared: 79, disputed: 3, avgDays: 176 },
  { state: "Madhya Pradesh", projects: 37, parcels: 4310, cleared: 63, disputed: 8, avgDays: 231 },
  { state: "Odisha", projects: 29, parcels: 3760, cleared: 54, disputed: 14, avgDays: 289 },
  { state: "Tamil Nadu", projects: 33, parcels: 4988, cleared: 74, disputed: 5, avgDays: 198 },
];

export const ALERTS = [
  { id: 1, project: "Delhi–Varanasi Expressway, Pkg 4", state: "Uttar Pradesh", stage: "Section 15 objections", days: 96, severity: "high" },
  { id: 2, project: "Dhamra Port Rail Link", state: "Odisha", stage: "Award declaration", days: 61, severity: "high" },
  { id: 3, project: "Bhopal Ring Road Ph-2", state: "Madhya Pradesh", stage: "Compensation disbursement", days: 44, severity: "medium" },
  { id: 4, project: "Surat Metro Depot Land", state: "Gujarat", stage: "Section 11 declaration", days: 22, severity: "low" },
];

export const PROJECTS = [
  { id: "PRJ-2291", name: "Delhi–Varanasi Expressway, Pkg 4", state: "Uttar Pradesh", authority: "NHAI", parcels: 612, stageIndex: 2, status: "in_process" },
  { id: "PRJ-1187", name: "Dhamra Port Rail Link", state: "Odisha", authority: "Ministry of Railways", parcels: 340, stageIndex: 3, status: "disputed" },
  { id: "PRJ-0894", name: "Bhopal Ring Road Phase 2", state: "Madhya Pradesh", authority: "MPRDC", parcels: 208, stageIndex: 4, status: "in_process" },
  { id: "PRJ-3310", name: "Surat Metro Depot Land", state: "Gujarat", authority: "Gujarat Metro Rail Corp.", parcels: 76, stageIndex: 1, status: "cleared" },
  { id: "PRJ-4021", name: "Chennai Peripheral Ring Road", state: "Tamil Nadu", authority: "TNRDC", parcels: 455, stageIndex: 5, status: "cleared" },
];

export const STAGES = [
  { key: "s4", label: "Section 4", sub: "Preliminary notification" },
  { key: "s11", label: "Section 11", sub: "Declaration of intent" },
  { key: "s15", label: "Section 15", sub: "Objections & hearing" },
  { key: "s19", label: "Section 19", sub: "Award declaration" },
  { key: "comp", label: "Compensation", sub: "Disbursement" },
  { key: "poss", label: "Possession", sub: "Handover complete" },
];

// Deterministic-ish mock parcel grid for the GIS map
export const PARCELS = Array.from({ length: 96 }).map((_, i) => {
  const r = Math.random();
  const status = r > 0.78 ? "disputed" : r > 0.45 ? "in_process" : "cleared";
  return { id: `P-${1000 + i}`, status, area: (0.4 + Math.random() * 3.2).toFixed(2) };
});

export const ROLES = [
  { key: "officer", label: "District Officer", icon: Building2, desc: "Manage acquisition workflows for your district" },
  { key: "state", label: "State Nodal Officer", icon: Landmark, desc: "Oversee all projects within your state" },
  { key: "national", label: "National Command", icon: Globe2, desc: "Monitor acquisition activity across India" },
  { key: "landowner", label: "Landowner / Citizen", icon: UserCircle2, desc: "Track your parcel, objections & compensation" },
  { key: "auditor", label: "Legal / Audit", icon: ShieldCheck, desc: "Review compliance & dispute records" },
];

