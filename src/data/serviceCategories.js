// Shared service catalogue — single source of truth.
// Imported by IntakePortal (public intake form) and ClientDashboard (post-login picker)
// so the two never drift out of sync.

export const SERVICE_CATEGORIES = [
  {
    group: "Individuals & US Expats",
    items: [
      { id: "expat-current",    title: "US Expat Tax return", icon: "globe-2" },
      { id: "streamlined",      title: "Past-due taxes / Streamlined Filing", icon: "shield-check" },
      { id: "dual-status",      title: "Dual-status filing (1040 & 1040-NR)", icon: "split" },
      { id: "personal-extension", title: "Extension", icon: "calendar-clock" },
      { id: "assignment",       title: "Working abroad on international assignment", icon: "plane" },
      { id: "personal-complex", title: "Personal return (equity, K-1s, multi-state)", icon: "file-text" },
    ],
  },
  {
    group: "Businesses",
    items: [
      { id: "corp-return",     title: "Corporate / entity tax return (1120, 1120-S, 1065)", icon: "building-2" },
      { id: "payroll-1099",    title: "Payroll & 1099 filings (941, 940, W-2)", icon: "receipt" },
      { id: "bookkeeping",     title: "Bookkeeping (QuickBooks / Xero)", icon: "book-open" },
      { id: "state-compliance",title: "US state tax compliance", icon: "landmark" },
      { id: "incorporation",   title: "Business incorporation (LLC / S-corp / C-corp)", icon: "briefcase" },
      { id: "audit-attest",    title: "Auditing & attestation / net-worth certificate", icon: "clipboard-check" },
    ],
  },
  {
    group: "Planning & Advisory",
    items: [
      { id: "tax-planning",    title: "Strategic tax planning", icon: "compass" },
      { id: "cpa-consulting",  title: "CPA consulting (hourly)", icon: "message-square" },
      { id: "irs-notice",      title: "IRS or state notice response", icon: "alert-circle" },
    ],
  },
];
