import React from 'react';
import { Icon } from './Icon.jsx';

const SERVICES = [
  {
    id: "svc-expat-returns",
    icon: "globe-2",
    image: "svc-expat",
    placeholder: "Person at a sunny window with a laptop",
    title: "US Expat Returns",
    body: "Form 1040 with foreign earned income exclusion, foreign tax credit, FBAR, and Form 8938. Filed on time, every time.",
    tag: "Expat",
    detail: {
      eyebrow: "For Americans abroad",
      lead: "Living outside the US doesn't excuse you from filing. We make it routine.",
      includes: [
        "Form 1040 with §911 foreign earned income exclusion ($126,500 for 2026)",
        "Foreign tax credit under §901 (Form 1116) to avoid double taxation",
        "FBAR (FinCEN 114) for foreign account reporting",
        "Form 8938 (FATCA) for specified foreign financial assets",
        "Form 5471 / 8865 for owners of foreign corporations and partnerships",
        "State return analysis — including residency arguments where applicable",
      ],
      footnote: "Most expat returns are completed within a week and a half of receiving your documents.",
    },
  },
  {
    id: "svc-property-abroad",
    icon: "home",
    image: "svc-property",
    placeholder: "Foreign property — coastal home, balcony, or villa",
    title: "Americans with Property Abroad",
    body: "Rental income, foreign mortgage interest, capital gains on sale, Schedule E reporting, and depreciation rules for property held outside the US.",
    tag: "Real estate",
    detail: {
      eyebrow: "Foreign property reporting",
      lead: "A home abroad is a Schedule E, a currency-conversion exercise, and a potential 8938 trigger — done in one pass.",
      includes: [
        "Schedule E rental income with foreign-currency translation",
        "Depreciation under §168 on foreign real property",
        "Foreign mortgage interest treatment and Form 1098 alternatives",
        "Section 1031 like-kind exchange analysis (US-to-US property only)",
        "Capital gains on sale, including §121 exclusion where eligible",
        "FATCA / FBAR reporting if held through a foreign entity or account",
      ],
      footnote: "Foreign real estate held directly is not an FBAR item — but rental income held in a foreign account often is.",
    },
  },
  {
    id: "svc-streamlined",
    icon: "shield-check",
    image: "svc-streamlined",
    placeholder: "Calm horizon / quiet morning desk",
    title: "Streamlined Filing Catch-Up",
    body: "Years of unfiled returns? No panic. The IRS Streamlined Filing Compliance Procedures help taxpayers catch up — discreetly, and on the right side of the rules.",
    tag: "Catch-up",
    detail: {
      eyebrow: "Streamlined Filing Compliance Procedures",
      lead: "Years of unfiled returns? No panic. The IRS Streamlined Filing Compliance Procedures help taxpayers catch up on missed foreign income, FBAR, and tax reporting requirements through a structured, non-willful return-to-compliance program — completed discreetly and professionally. Available under both the Streamlined Foreign Offshore Procedures (SFOP) and Streamlined Domestic Offshore Procedures (SDOP).",
      includes: [
        "Three years of delinquent or amended Form 1040 returns",
        "Six years of delinquent FBARs",
        "Form 14653 (foreign) or 14654 (domestic) non-willful certification",
        "Penalty mitigation analysis and IRS correspondence",
        "Coordinated state catch-up filings where required",
      ],
      footnote: "We've walked dozens of clients through Streamlined. The IRS is more forgiving than most people fear.",
    },
  },
  {
    id: "svc-dual-citizen",
    icon: "users",
    image: "svc-dual",
    placeholder: "Two passports on a table / couple at home",
    title: "Americans with Dual Residency",
    body: "Holding residency status in two countries means two sets of tax obligations. We coordinate treaty positions, tie-breaker rules, and the exit-tax exposure of long-term dual residents.",
    tag: "Dual resident",
    detail: {
      eyebrow: "Dual residency tax coordination",
      lead: "Holding tax residency in two countries means two sets of filings, and a careful read of the relevant treaty to decide which country wins the tie.",
      includes: [
        "Treaty residency tie-breaker analysis under applicable US treaty",
        "Coordination of foreign tax credit basketing",
        "Totalization-agreement application for self-employment tax",
        "Pre-renunciation planning and §877A exit-tax exposure modeling",
        "Multi-passport estate-planning coordination with your attorney",
      ],
      footnote: "If you're considering renouncing, talk to us before — not after. The §877A calculation is a one-shot event.",
    },
  },
  {
    id: "svc-dual-status",
    icon: "split",
    image: "svc-dualstatus",
    placeholder: "Suitcase open on bed / moving day",
    title: "Dual-Status Filing (1040 & 1040-NR)",
    body: "The year you move into or out of the US. A dual-status return done right — including the part-year residency split and treaty positions.",
    tag: "Move year",
    detail: {
      eyebrow: "Dual-status returns",
      lead: "The year of a US arrival or departure splits your tax year in two — and the IRS treats each half differently.",
      includes: [
        "Part-year resident (Form 1040) and non-resident (Form 1040-NR) preparation",
        "First-year-choice or §6013(g) election analysis",
        "Substantial Presence Test calculation and exceptions",
        "Pre-immigration planning: basis step-up, trust unwinding, deferred comp",
        "Departure tax: §877A 'covered expatriate' status modeling",
        "Form 8833 treaty-based return position disclosures",
      ],
      footnote: "The single most-mistaken return we see is a dual-status return prepared as a normal 1040.",
    },
  },
  {
    id: "svc-corporate",
    icon: "building-2",
    image: "svc-corporate",
    placeholder: "Modern office / small business owner at desk",
    title: "Corporate Tax Returns",
    body: "C-corp (1120), S-corp (1120-S), partnership (1065), and multi-state filings. Reviewed by a licensed CPA.",
    tag: "Corporate",
    detail: {
      eyebrow: "For closely-held companies",
      lead: "From single-member LLC up to mid-market C-corp. We work the way your CFO would — methodical, conservative, and documented.",
      includes: [
        "Federal Form 1120, 1120-S, or 1065 with all required schedules",
        "Multi-state allocation and apportionment analysis",
        "K-1 preparation and delivery for partners and shareholders",
        "Section 199A QBI calculations",
        "Quarterly estimated tax payments",
        "Year-round controller-grade consultation on entity changes",
      ],
      footnote: "We don't take new corporate clients between February and April. Plan ahead.",
    },
  },
  {
    id: "svc-assignment",
    icon: "plane",
    image: "svc-assignment",
    placeholder: "Person in airport / professional with luggage",
    title: "Americans Working Abroad on International Assignment",
    body: "Tax-equalization, FEIE eligibility, employer-paid benefit treatment, and the year-end true-up that catches assignees by surprise.",
    tag: "Assignee",
    detail: {
      eyebrow: "International assignees",
      lead: "Sent abroad by your employer? Tax equalization and hypothetical tax mean the return on file isn't always the return you'd expect.",
      includes: [
        "Tax-equalization & hypothetical-tax calculation review with your employer",
        "Gross-up and grossed-down income reconciliation",
        "Form 2555 FEIE eligibility — physical presence vs bona fide residence",
        "Employer-paid housing, education, and tax-prep treatment",
        "Form 1116 foreign tax credit on host-country taxes paid",
        "Repatriation-year planning and true-up reconciliation",
      ],
      footnote: "If your assignment letter mentions 'tax equalization,' your withholding and final liability will not match. We reconcile both sides.",
    },
  },
  {
    id: "svc-personal",
    icon: "file-text",
    image: "svc-personal",
    placeholder: "Couple at home reviewing finances on laptop",
    title: "Personal Returns",
    body: "Form 1040 for complex personal situations — equity comp, K-1 income, rental property, capital events, multi-state.",
    tag: "Individual",
    detail: {
      eyebrow: "Form 1040, done properly",
      lead: "Not every personal return needs a licensed CPA. The ones we take on do.",
      includes: [
        "Equity compensation: RSUs, ISOs, ESPP, including AMT analysis",
        "Schedule E rental property and depreciation",
        "Schedule D capital gains including QSBS and §1031 exchanges",
        "Multi-state returns and residency determinations",
        "Trust and estate K-1 (Schedule K-1, Form 1041) integration",
        "Charitable structures, DAFs, and qualified charitable distributions",
      ],
      footnote: "We take a small, deliberate number of personal clients each year. Send us a note and we'll be honest about fit.",
    },
  },
  {
    id: "svc-planning",
    icon: "calendar",
    image: "svc-planning",
    placeholder: "Notebook with calendar / planning session",
    title: "Tax Planning",
    body: "Year-round strategic planning — not just compliance. Equity events, business sales, relocation, retirement.",
    tag: "Advisory",
    detail: {
      eyebrow: "Strategic tax planning",
      lead: "Compliance is what you owe. Planning is what you keep.",
      includes: [
        "Multi-year tax projection modeling",
        "Equity compensation strategy (83(b), early exercise, QSBS)",
        "Business sale and succession planning",
        "Cross-border move planning — entering or leaving the US",
        "Retirement account strategy (mega-backdoor, SEP, Solo 401(k))",
        "Charitable strategy: DAF, CRT, CLT structures",
      ],
      footnote: "Planning engagements are scoped quarterly. Most clients meet with us 2–4 times per year.",
    },
  },
  {
    id: "svc-auditing",
    icon: "clipboard-check",
    image: "svc-auditing",
    placeholder: "Audit working papers / financial statements on desk",
    title: "US Auditing & Attestation",
    body: "Net-worth certificates, attestation engagements, and reviews of financial statements — performed under AICPA professional standards.",
    tag: "Audit",
    detail: {
      eyebrow: "Auditing & attestation services",
      lead: "When you need an independent professional to look at the numbers — for a lender, a regulator, an immigration application, or your own assurance — we provide the engagement, the opinion, and the documentation.",
      includes: [
        "Net-worth certificates for immigration, lending, and personal use",
        "Attestation engagements under AICPA SSAE standards",
        "Reviews of financial statements (SSARS Section 90)",
        "Compilations of financial statements (SSARS Section 80)",
        "Agreed-upon procedures engagements",
        "Independent verification letters for visa & immigration matters",
      ],
      footnote: "Audit and attestation work requires CPA independence — performed only by the licensed CPA on staff.",
    },
  },
  {
    id: "svc-state-compliance",
    icon: "landmark",
    image: "svc-state-compliance",
    placeholder: "State capitol building / filing cabinets",
    title: "US State Tax Compliance",
    body: "Sales & use tax, business incorporation, and ongoing state-level filings — kept current with every state's department of revenue.",
    tag: "State",
    detail: {
      eyebrow: "Multi-state tax compliance",
      lead: "Every state has its own rules, its own forms, and its own deadlines. We keep your filings current so you're never out of compliance with a state department of revenue.",
      includes: [
        "Sales & use tax registration, returns, and nexus analysis",
        "Business incorporation: LLC, S-corp, C-corp, partnership formation",
        "Annual report and franchise tax filings, all 50 states",
        "Registered agent coordination and state-level mailings",
        "State income tax returns: personal and entity",
        "Ongoing compliance calendar managed on your behalf",
      ],
      footnote: "We monitor every active state filing on your calendar so deadlines never become surprises.",
    },
  },
  {
    id: "svc-payroll-1099",
    icon: "receipt",
    image: "svc-payroll",
    placeholder: "Stack of payroll forms / paychecks on desk",
    title: "Payroll & Contractor Filings",
    body: "1099 contractor filings, Form 941 quarterly payroll returns, Form 940 annual FUTA — and the year-round reporting that keeps your business in good standing.",
    tag: "Payroll",
    detail: {
      eyebrow: "Payroll & contractor compliance",
      lead: "Whether you employ a team or pay a roster of contractors, the IRS expects clean, on-time filings — quarterly and annually. We handle the cadence so you don't have to remember it.",
      includes: [
        "Form 1099-NEC and 1099-MISC filings for contractor payments",
        "Form W-9 collection and contractor onboarding compliance",
        "Form 941 quarterly federal payroll tax returns",
        "Form 940 annual federal unemployment (FUTA) returns",
        "Form W-2 / W-3 employee wage reporting at year-end",
        "State unemployment (SUTA) and withholding tax filings",
        "1099-K reconciliation for marketplace and platform income",
      ],
      footnote: "Payroll deadlines are unforgiving — late 941s and unfiled 1099s draw penalties quickly. We file on the calendar, not at the deadline.",
    },
  },
  {
    id: "svc-bookkeeping",
    icon: "book-open",
    image: "svc-bookkeeping",
    placeholder: "Open ledger book / monthly reconciliation",
    title: "Bookkeeping for Business",
    body: "Monthly bookkeeping in QuickBooks Online and Xero — reconciliation, management reports, and books that are tax-ready at any moment.",
    tag: "Bookkeeping",
    detail: {
      eyebrow: "Monthly bookkeeping & reporting",
      lead: "Good books make every other engagement easier — your tax return, your loan application, your investor update. We keep your records clean, current, and audit-ready in the platform you already use.",
      includes: [
        "QuickBooks Online setup, cleanup, and ongoing administration",
        "Xero setup, cleanup, and ongoing administration",
        "Monthly bank, credit-card, and merchant-account reconciliation",
        "Chart of accounts setup and ongoing maintenance",
        "Accounts receivable and accounts payable tracking",
        "Monthly close: P&L, balance sheet, and cash-flow statements",
        "Sales tax tracking and remittance support",
        "Year-end clean-up and tax-ready file preparation",
      ],
      footnote: "Bookkeeping engagements are quoted monthly based on transaction volume. Most small businesses fit within a single fixed monthly fee.",
    },
  },
  {
    id: "svc-consulting",
    icon: "landmark",
    image: "svc-consulting",
    placeholder: "Office bookshelf with tax codes / video call setup",
    title: "CPA Consulting",
    body: "Hourly consultation for one-off questions, IRS notices, second opinions, and pre-transaction analysis.",
    tag: "Hourly",
    detail: {
      eyebrow: "Hourly consultation",
      lead: "Sometimes you don't need a full engagement. You need an hour of a licensed CPA's time.",
      includes: [
        "IRS or state notice review and response strategy",
        "Second opinions on returns prepared elsewhere",
        "Pre-transaction tax impact analysis",
        "Entity selection (LLC vs S-corp vs C-corp) consultations",
        "Estimated payment and withholding review",
      ],
      footnote: "Sometimes you don't need a full engagement. You need an hour of a licensed CPA's time.",
    },
  },
];

function Services({ onServiceClick }) {
  return (
    <section className="section" id="services" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div className="services-head">
          <div>
            <div className="section-eyebrow">Services</div>
            <h2 className="section-head">What we do, in detail.</h2>
          </div>
          <p className="section-sub" style={{ maxWidth: "44ch" }}>
            Fourteen engagements. Every one of them reviewed by a licensed CPA
            before it leaves the office.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "var(--space-6)",
        }}>
          {SERVICES.map((s) => (
            <article
              key={s.id}
              onClick={() => onServiceClick && onServiceClick(s)}
              style={{
                background: "var(--paper)",
                border: "1px solid var(--rule-soft)",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                gap: 0,
                transition: "transform var(--dur-slow) var(--ease), box-shadow var(--dur-slow) var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(14,34,64,.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Photo */}
              <div style={{ position: "relative", background: "var(--cream-2)", minHeight: 220 }}>
                <img
                  src={window.IMG[s.image]}
                  alt={s.title}
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover", position: "absolute", inset: 0 }}
                />
                <div style={{
                  position: "absolute",
                  top: 14, left: 14,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  background: "rgba(14,34,64,0.85)",
                  color: "var(--brand-gold-soft)",
                  borderRadius: 4,
                  backdropFilter: "blur(8px)",
                }}>
                  {s.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}>
                <div style={{ color: "var(--brand-gold-deep)", marginBottom: 4 }}>
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 24,
                  fontWeight: 500,
                  color: "var(--brand-navy)",
                  margin: 0,
                  lineHeight: 1.2,
                  letterSpacing: "-0.005em",
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--ink-2)",
                  margin: 0,
                  flex: 1,
                }}>
                  {s.body}
                </p>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--brand-gold-deep)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: "var(--space-2)",
                }}>
                  Learn more
                  <Icon name="arrow-right" size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Services, SERVICES };
