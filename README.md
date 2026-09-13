# BhoomiDrishti

**A National Digital Command Centre for Land Acquisition Monitoring, Bottleneck Detection & Decision Support**

Built for **Smart India Hackathon 2026**

| | |
|---|---|
| **Problem Statement ID** | SIH 26016 |
| **Problem Statement Title** | Real-Time National Land Acquisition and Management System |
| **Theme** | Smart Automation |
| **PS Category** | Software |
| **Team Name** | GEOINTEL |
| **Team ID** | _TBD_ |

---

## Overview

Land acquisition for infrastructure projects in India — highways, railways, irrigation, industrial corridors, renewable energy, and urban development — is currently managed through fragmented, ministry-specific, and largely manual systems. There is no single national platform that lets Central Ministries, State Governments, District Authorities, and Project Implementing Agencies track an acquisition end-to-end, from project proposal to final possession.

**BhoomiDrishti** digitizes this lifecycle under the **Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement (RFCTLARR) Act, 2013**, giving every stakeholder — from a Central Ministry official to an affected landowner — a role-scoped view of the same underlying data: project status, GIS-mapped parcels, statutory stage progress, compensation disbursement, and rehabilitation & resettlement (R&R) tracking.

## What this is *not*

To avoid confusion with adjacent government systems, it's worth being explicit about scope:

- **Not a land records system** — that's the job of DILRMP / the "Land Stack" (ownership history, titles, ULPIN).
- **Not a property registration system** — that's NGDRS (buying/selling transactions).
- **This is a land *acquisition* system** — the process of government compulsorily acquiring land for a public project and compensating the owner, governed by RFCTLARR.

The closest existing real-world system is **Bhoomi Rashi** (Ministry of Road Transport & Highways), which does this well but only for national highway projects. BhoomiDrishti generalizes that model across ministries and project types, which currently has no national equivalent.

## Statutory Workflow (RFCTLARR Act, 2013)

Every project tracked in BhoomiDrishti moves through the Act's actual legal stages, not generic labels:

| Stage | Section | Description |
|---|---|---|
| 1 | **Section 4** | Social Impact Assessment (SIA) |
| 2 | **Section 11** | Preliminary Notification |
| 3 | **Section 15** | Objections & Hearing |
| 4 | **Section 19** | Declaration |
| 5 | **Section 23** | Award & Compensation |
| 6 | **Section 38** | Possession |

> **Note:** Under **Section 25**, if the Collector does not declare the award within 12 months of the Section 19 declaration, the acquisition automatically lapses. This deadline is surfaced as a live countdown on project detail pages to support timely decision-making.

## Core Features (Prototype Scope)

- **National Command Dashboard** — real-time KPIs (parcels under acquisition, awards declared, compensation disbursed, disputed parcels), state-wise progress, and bottleneck alerts.
- **GIS Parcel Map** — interactive, color-coded parcel visualization (cleared / in-process / disputed) built on Leaflet.
- **Project Detail & Statutory Tracker** — per-project visual progress through the six RFCTLARR stages above.
- **Role-Scoped Views** — Central Ministry, State Authority, District Officer, Land Acquisition Officer, and Landowner/Citizen each see a scoped version of the same data.
- **Document Verification (in progress)** — OCR-based field extraction and comparison against records, with human review for flagged mismatches.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (JSX) + Vite, React Router v6 |
| GIS | Leaflet / React-Leaflet |
| Backend | Node.js + Express |
| Database | PostgreSQL + PostGIS |
| AI/Document Verification | Python (in progress) |
| Design | Figma |

## Project Structure

```
bhoomidhristi-sih2026/
├── frontend/          React application (UI, GIS map, routing, auth context)
├── backend/           Express REST API + PostgreSQL/PostGIS connection
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL with the PostGIS extension enabled

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
cp .env.example .env   # fill in your local database credentials
npm run dev
```

The backend exposes a health check at `GET /api/health` to confirm the server is running.

## Reference Portals & Policy Citations

**Existing government systems (design & functional reference):**
- [Bhoomi Rashi](https://bhoomirashi.gov.in) — MoRTH's land acquisition portal (highways only)
- [NGDRS](https://ngdrs.gov.in) — National Generic Document Registration System
- [DILRMP](https://dilrmp.gov.in) / [DoLR](https://dolr.gov.in) — Digital India Land Records Modernisation Programme

**Legal & policy basis:**
- Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement (RFCTLARR) Act, 2013

## Team — GEOINTEL

| Name | Focus Area |
|---|---|
| Syed Abdullah | Frontend |
| Chaitanya | Database |
| Arjav | GIS |
| Devansh | Backend |
| Rajat | AI / Python (document verification) |
| Twinkle | Pitch & Presentation |

---

*Built for Smart India Hackathon 2026 · Problem Statement SIH 26016*