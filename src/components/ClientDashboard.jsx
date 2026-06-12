import React from 'react';
import { BookkeepingOrganizer } from './BookkeepingOrganizer.jsx';
import { ConsultOrganizer } from './ConsultOrganizer.jsx';
import { DocumentCenter } from './DocumentCenter.jsx';
import { EntityTaxOrganizer } from './EntityTaxOrganizer.jsx';
import { ExtensionOrganizer } from './ExtensionOrganizer.jsx';
import { Icon } from './Icon.jsx';
import { IncorporationOrganizer } from './IncorporationOrganizer.jsx';
import { IntakePortal } from './IntakePortal.jsx';
import { MessageCenter } from './MessageCenter.jsx';
import { NoticeOrganizer } from './NoticeOrganizer.jsx';
import { StateComplianceOrganizer } from './StateComplianceOrganizer.jsx';
import { TaxOrganizer } from './TaxOrganizer.jsx';
import { IMG } from '../images.js';
import { SERVICE_CATEGORIES } from '../data/serviceCategories.js';

// ClientDashboard — overlay that appears after successful client login.
// Welcome strip + status cards + service picker + the multi-step intake/organizer.

// Service IDs that should open the dedicated Entity Tax Organizer instead of
// the individual (1040) Tax Organizer.
const ENTITY_SERVICE_IDS = ["corp-return"];
// Service IDs that open their own dedicated flow (not the individual 1040 organizer).
const EXTENSION_SERVICE_IDS = ["personal-extension"];
const BOOKKEEPING_SERVICE_IDS = ["bookkeeping"];
const INCORPORATION_SERVICE_IDS = ["incorporation"];
const STATE_COMPLIANCE_SERVICE_IDS = ["state-compliance"];
const NOTICE_SERVICE_IDS = ["irs-notice"];
const CONSULT_SERVICE_IDS = ["cpa-consulting"];

function ClientDashboard({ open, clientName, clientEmail, onClose }) {
  const [view, setView] = React.useState("home");  // "home" | "intake" | "organizer" | "messages"
  const [organizerService, setOrganizerService] = React.useState(null);

  React.useEffect(() => {
    if (open) setView("home");
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="client-dashboard">
      
      {/* Portal header */}
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <a href="#" className="brand" aria-label="Mindful US CPA — portal home" onClick={(e) => { e.preventDefault(); setView("home"); }}>
            <img src={IMG["logo-mark-splash"]} alt="" className="brand-mark-img" />
            <span className="brand-name">Mindful US CPA</span>
            <span className="dashboard-pill">Client portal</span>
          </a>
          <nav className="dashboard-nav">
            <button type="button" className={"dashboard-nav-link" + (view === "home" ? " active" : "")} onClick={() => setView("home")}>
              <Icon name="layout-grid" size={15} />
              Dashboard
            </button>
            <button type="button" className={"dashboard-nav-link" + (view === "intake" ? " active" : "")} onClick={() => setView("intake")}>
              <Icon name="file-plus" size={15} />
              Start a service
            </button>
            <button type="button" className={"dashboard-nav-link" + (view === "documents" ? " active" : "")} onClick={() => setView("documents")}>
              <Icon name="folder" size={15} />
              Documents
            </button>
            <button type="button" className={"dashboard-nav-link" + (view === "messages" ? " active" : "")} onClick={() => setView("messages")}>
              <Icon name="message-square" size={15} />
              Messages
            </button>
            <div className="dashboard-user">
              <div className="dashboard-user-avatar">{(clientName || "C").slice(0, 1).toUpperCase()}</div>
              <div className="dashboard-user-meta">
                <div className="dashboard-user-name">{clientName || "Client"}</div>
                <div className="dashboard-user-email">{clientEmail || "you@example.com"}</div>
              </div>
              <button type="button" className="dashboard-signout" onClick={onClose} title="Sign out">
                <Icon name="log-out" size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="dashboard-main">
        {view === "home" ? (
          <DashboardHome
            clientName={clientName}
            onStartService={() => setView("intake")}
            onStartOrganizer={(svc) => { setOrganizerService(svc); setView("organizer"); }}
          />
        ) : view === "organizer" ? (
          ENTITY_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <EntityTaxOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : EXTENSION_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <ExtensionOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : BOOKKEEPING_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <BookkeepingOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : INCORPORATION_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <IncorporationOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : STATE_COMPLIANCE_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <StateComplianceOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : NOTICE_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <NoticeOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : CONSULT_SERVICE_IDS.indexOf(organizerService && organizerService.id) > -1 ? (
            <ConsultOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          ) : (
            <TaxOrganizer
              presetService={organizerService}
              onExit={() => setView("home")}
            />
          )
        ) : view === "messages" ? (
          <MessageCenter clientName={clientName} cpaName="Daniel Mercer, CPA" />
        ) : view === "documents" ? (
          <DocumentCenter clientName={clientName} />
        ) : (
          <IntakePortal hideHeading={true} />
        )}
      </main>
    </div>
  );
}

function DashboardHome({ clientName, onStartService, onStartOrganizer }) {
  return (
    <div className="container-narrow" style={{ paddingTop: "var(--space-7)", paddingBottom: "var(--space-9)" }}>
      {/* Welcome */}
      <div style={{ marginBottom: "var(--space-7)" }}>
        <div className="section-eyebrow">Welcome back</div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(36px, 4vw, 48px)",
          fontWeight: 500,
          color: "var(--brand-navy)",
          margin: 0,
          letterSpacing: "-0.012em",
          lineHeight: 1.1,
        }}>
          Hello{clientName ? ", " + clientName.split(" ")[0] : ""} — what can we help with today?
        </h1>
        <p style={{
          fontSize: 16,
          color: "var(--ink-2)",
          lineHeight: 1.6,
          margin: "var(--space-3) 0 0",
          maxWidth: "62ch",
        }}>
          Pick a service below to start a new engagement, or use the navigation above
          to view your documents and messages with your assigned CPA.
        </p>
      </div>

      {/* Status summary cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--space-4)",
        marginBottom: "var(--space-7)",
      }}>
        <StatCard icon="file-text" label="Active engagements" value="0" hint="No engagements yet" />
        <StatCard icon="message-square" label="Unread messages" value="0" hint="No messages waiting" />
        <StatCard icon="calendar-clock" label="Next deadline" value="—" hint="We'll alert you on file" />
      </div>

      {/* Service picker — same component, embedded here */}
      <div className="service-selector">
        <div className="service-selector-head">
          <h3>How can we help with your tax situation?</h3>
          <p>Select what brings you here — we'll tailor the intake to your situation.</p>
        </div>
        {SERVICE_CATEGORIES.map((cat) => (
          <div key={cat.group} className="service-category">
            <div className="service-category-label">{cat.group}</div>
            <div className="service-options">
              {cat.items.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="service-option"
                  onClick={() => {
                    if (onStartOrganizer) {
                      onStartOrganizer(opt);
                    } else {
                      window.__intakePresetService = opt;
                      onStartService();
                    }
                  }}
                >
                  <span className="service-option-icon"><Icon name={opt.icon} size={20} /></span>
                  <span className="service-option-title">{opt.title}</span>
                  <span className="service-option-arrow"><Icon name="arrow-right" size={16} /></span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="service-selector-foot">
          Not sure? <button type="button" className="link-button" onClick={onStartService}>Start with a general intake</button> and we'll route you to the right CPA.
        </p>
      </div>

      <div style={{
        marginTop: "var(--space-6)",
        padding: "var(--space-5) var(--space-6)",
        background: "var(--brand-navy)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        color: "var(--paper)",
      }}>
        <span style={{ color: "var(--brand-gold)", flexShrink: 0 }}>
          <Icon name="lock" size={18} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, lineHeight: 1.2, marginBottom: 4 }}>
            Your files are encrypted end-to-end.
          </div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.72)" }}>
            All uploads use AES-256. Only the licensed CPA assigned to your file has access.
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, hint }) {
  return (
    <div style={{
      background: "var(--paper)",
      border: "1px solid var(--rule-soft)",
      borderRadius: 12,
      padding: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--brand-gold-deep)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        <Icon name={icon} size={14} />
        {label}
      </div>
      <div className="numeric" style={{
        fontFamily: "var(--font-display)",
        fontSize: 36,
        fontWeight: 500,
        color: "var(--brand-navy)",
        lineHeight: 1,
      }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{hint}</div>
    </div>
  );
}

export { ClientDashboard };
