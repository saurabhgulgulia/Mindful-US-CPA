import React from 'react';
import { DependentOrganizer } from './DependentOrganizer.jsx';
import { EmployerOrganizer } from './EmployerOrganizer.jsx';
import { ForeignAccountsOrganizer } from './ForeignAccountsOrganizer.jsx';
import { Form1099Organizer } from './Form1099Organizer.jsx';
import { HomeSaleOrganizer } from './HomeSaleOrganizer.jsx';
import { Icon } from './Icon.jsx';
import { IncomeOrganizer } from './IncomeOrganizer.jsx';
import { InvestmentOrganizer } from './InvestmentOrganizer.jsx';
import { ItemizedDeductionsOrganizer } from './ItemizedDeductionsOrganizer.jsx';
import { OtherSituations } from './OtherSituations.jsx';
import { OwnershipOrganizer } from './OwnershipOrganizer.jsx';
import { PersonalInfo } from './PersonalInfo.jsx';
import { RentalOrganizer } from './RentalOrganizer.jsx';
import { RetirementOrganizer } from './RetirementOrganizer.jsx';
import { ScheduleCOrganizer } from './ScheduleCOrganizer.jsx';
import { SpouseIncome } from './SpouseIncome.jsx';
import { SpouseOrganizer } from './SpouseOrganizer.jsx';

// TaxOrganizer — the post-login questionnaire that scopes a client's
// engagement. Built in the Mindful brand language (no emoji, calm voice,
// editorial serif headlines, gold accents, no "save time!" marketing tone).
//
// Step 1 covers scope of work:
//   - How many years
//   - Conditional: which year OR catch-up context

const ORGANIZER_STEPS = [
  { id: "scope",       label: "Scope of work" },
  { id: "status",      label: "Tax status" },
  { id: "about",       label: "About you" },
  { id: "income",      label: "Income" },
  { id: "documents",   label: "Documents" },
  { id: "review",      label: "Review" },
];

const TAX_YEARS = ["2025", "2024", "2023", "2022", "2021", "2020"];

const CATCH_UP_REASONS = [
  {
    id: "unaware",
    label: "I didn't know Americans abroad still had to file.",
  },
  {
    id: "bad-advice",
    label: "I followed guidance that turned out to be wrong.",
  },
  {
    id: "life",
    label: "A move, an illness, or a major life event broke my routine.",
  },
  {
    id: "deliberate",
    label: "I knew about the obligation and chose not to file.",
  },
];

function TaxOrganizer({ presetService, onExit }) {
  const [step, setStep] = React.useState(0);
  const isExtension = presetService && presetService.id === "personal-extension";
  const [scope, setScope] = React.useState({
    yearCount: "",
    singleYear: "2025",
    catchUpReason: "",
    citizenship: "",
    livedAbroad: "",
    daysY: "", daysY1: "", daysY2: "",
  });

  // Step 3 — About-you answers (yes/no per situation)
  const [about, setAbout] = React.useState({
    married:         "",
    dependents:      "",
    trumpAccounts:   "",
    employed:        "",
    foreignAccounts: "",
    selfEmployed:    "",
    investments:     "",
    ownership:       "",
    itemize:         "",
    retirement:      "",
    soldHome:        "",
    dividends:       "",
    interest:        "",
    rental:          "",
  });
  // Rental property details (only collected if about.rental === "yes")
  const [rentalProps, setRentalProps] = React.useState([]);

  // Dependents (only collected if about.dependents === "yes")
  const [dependents, setDependents] = React.useState([]);

  // Income amounts (Step 4)
  const [income, setIncome] = React.useState({});

  // Retirement detail (under "I receive retirement income → yes")
  const [retirement, setRetirement] = React.useState({});

  // Investment detail (under "I have investments → yes")
  const [investments, setInvestments] = React.useState({});

  // Business / partnership / trust ownership (under "I have ownership → yes")
  const [ownership, setOwnership] = React.useState([]);

  // Dividend (1099-DIV) and interest (1099-INT) detail
  const [dividendDetail, setDividendDetail] = React.useState([]);
  const [interestDetail, setInterestDetail] = React.useState([]);

  // Self-employment / Schedule C detail (under "I work for myself → yes")
  const [scheduleC, setScheduleC] = React.useState({});

  // Itemized deductions / Schedule A (under "itemizing → yes")
  const [itemized, setItemized] = React.useState({});

  // Home sale detail (under "I sold a home this year → yes")
  const [homeSale, setHomeSale] = React.useState([]);

  // Other situations (entities, crypto, misc, non-taxable)
  const [otherSituations, setOtherSituations] = React.useState({});

  // Foreign accounts (under "I have accounts outside the US → yes")
  const [foreignAccounts, setForeignAccounts] = React.useState({});

  // Employer wages detail (under "I get paid by an employer → yes")
  const [employers, setEmployers] = React.useState([]);

  // Spouse details + filing status (only if about.married === "yes")
  const [spouse, setSpouse] = React.useState({
    firstName: "", middleName: "", lastName: "",
    dob: "", taxId: "", profession: "",
    mailing: "", city: "", zip: "", state: "", country: "United States", otherCountry: "",
    filingStatus: "",
  });
  const setSpouseField = (k, v) => setSpouse((s) => ({ ...s, [k]: v }));

  // Spouse income Yes/No flags (shown when married + joint/separate)
  const [spouseIncome, setSpouseIncome] = React.useState({});

  // Taxpayer personal info (top of the About-you step)
  const [taxpayer, setTaxpayer] = React.useState({
    firstName: "", middleName: "", lastName: "",
    dob: "", taxId: "", profession: "",
    mailing: "", city: "", zip: "", state: "", country: "United States", otherCountry: "",
  });
  const setTaxpayerField = (k, v) => setTaxpayer((t) => ({ ...t, [k]: v }));

  const setAboutAnswer = (key, v) => setAbout((a) => ({ ...a, [key]: v }));
  const aboutReady = Object.values(about).every((v) => v !== "");

  const scopeReady =
    (scope.yearCount === "single" && !!scope.singleYear) ||
    (scope.yearCount === "multiple" && !!scope.catchUpReason);

  const filingYear = parseInt(scope.singleYear, 10) || 2025;
  const yLabel = scope.yearCount === "single" ? scope.singleYear : "the years you're filing";

  // Step 2 readiness depends on which branch
  const usOrGcReady = (scope.citizenship === "us" || scope.citizenship === "gc") && !!scope.livedAbroad;
  const neitherReady = scope.citizenship === "neither"
    && scope.daysY !== "" && scope.daysY1 !== "" && scope.daysY2 !== "";
  const citizenshipReady = usOrGcReady || neitherReady;

  const setCitizenship = (v) =>
    setScope((s) => ({
      ...s, citizenship: v,
      // Clear follow-ups when switching branches
      livedAbroad: (v === "us" || v === "gc") ? s.livedAbroad : "",
      daysY: v === "neither" ? s.daysY : "",
      daysY1: v === "neither" ? s.daysY1 : "",
      daysY2: v === "neither" ? s.daysY2 : "",
    }));

  const setYearCount = (v) => setScope((s) => ({ ...s, yearCount: v, catchUpReason: "" }));

  return (
    <div className="organizer">
      <div className="container-narrow" style={{ paddingTop: "var(--space-6)", paddingBottom: "var(--space-9)" }}>
        <header className="organizer-head">
          <div>
            <div className="section-eyebrow">Tax organizer</div>
            <h1 className="organizer-title">Let's frame the scope of your engagement.</h1>
            {scope.yearCount && (
              <div className="organizer-service">
                <Icon name="calendar" size={14} />
                <span>You're working on:</span>
                <strong>
                  {scope.yearCount === "single"
                    ? `Tax year ${scope.singleYear}`
                    : "Multi-year catch-up filing"}
                </strong>
              </div>
            )}
          </div>
          <a href="#other-services" className="organizer-other" onClick={(e) => { e.preventDefault(); if (onExit) onExit(); }}>
            Need a different service?
            <Icon name="arrow-up-right" size={14} />
          </a>
        </header>

        {/* Step rail */}
        <ol className="organizer-rail">
          {ORGANIZER_STEPS.map((s, i) => {
            const cls = i === step ? "active" : i < step ? "done" : "";
            return (
              <li key={s.id} className={"organizer-rail-item " + cls}>
                <span className="organizer-rail-num">{i < step ? <Icon name="check" size={12} /> : i + 1}</span>
                <span className="organizer-rail-label">{s.label}</span>
              </li>
            );
          })}
        </ol>

        {/* Step card */}
        <div className="organizer-card">
          {step === 0 && (
            <React.Fragment>
              <div className="organizer-body">
                <Question label="How many tax years would you like us to prepare?">
                  <div className="pick-row">
                    <PickButton
                      selected={scope.yearCount === "single"}
                      onClick={() => setYearCount("single")}
                    >
                      Just this year
                    </PickButton>
                    {!isExtension && (
                      <PickButton
                        selected={scope.yearCount === "multiple"}
                        onClick={() => setYearCount("multiple")}
                      >
                        Catching up on prior years
                      </PickButton>
                    )}
                  </div>
                </Question>

                {scope.yearCount === "single" && (
                  <Question label="Which tax year are we preparing?" hint="Most clients start with the most recent year. We can add prior years later if needed.">
                    <select
                      className="organizer-select"
                      value={scope.singleYear}
                      onChange={(e) => setScope({ ...scope, singleYear: e.target.value })}
                    >
                      {TAX_YEARS.map((y) => <option key={y}>{y}</option>)}
                    </select>
                  </Question>
                )}

                {scope.yearCount === "multiple" && (
                  <Question
                    label="Help us understand the catch-up context."
                    hint="This shapes whether the IRS Streamlined Filing Procedures apply to your situation. The first three answers point to a non-willful path; the fourth changes the strategy."
                  >
                    <div className="reason-stack">
                      {CATCH_UP_REASONS.map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          className={"reason-item" + (scope.catchUpReason === r.id ? " selected" : "")}
                          onClick={() => setScope({ ...scope, catchUpReason: r.id })}
                        >
                          <span className="reason-radio" aria-hidden="true">
                            <span className="reason-dot" />
                          </span>
                          <span>{r.label}</span>
                        </button>
                      ))}
                    </div>
                  </Question>
                )}

                {scope.yearCount && (
                  <aside className="organizer-callout">
                    <span className="organizer-callout-icon"><Icon name="bookmark" size={16} /></span>
                    <span>
                      <strong>One useful thing:</strong> if you have a copy of last year's Form 1040,
                      we can pull names, dependents, and prior carryovers from it in a later step —
                      it shortens the rest of the organizer.
                    </span>
                  </aside>
                )}
              </div>

              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => { if (onExit) onExit(); }}>
                  <Icon name="arrow-left" size={14} />
                  Back to services
                </button>
                <span className="organizer-save"><Icon name="lock" size={12} /> Saved as you type</span>
                <button
                  type="button"
                  className={"btn btn-primary organizer-next" + (scopeReady ? "" : " disabled")}
                  disabled={!scopeReady}
                  onClick={() => setStep(1)}
                >
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {/* Step 2 — Citizenship / status */}
          {step === 1 && (
            <React.Fragment>
              <div className="organizer-body">
                <div className="organizer-step-head">
                  <h2 className="organizer-step-title">
                    Where do you sit with the IRS?
                    <span className="organizer-step-emoji" aria-hidden="true">🇺🇸</span>
                  </h2>
                  <p className="organizer-step-sub">
                    For <strong>{yLabel}</strong>, which of these described you?
                    Your answer decides which form your return starts from — 1040, 1040-NR, or a dual-status pair.
                  </p>
                </div>

                <div className="status-grid">
                  <StatusCard
                    id="us"
                    selected={scope.citizenship === "us"}
                    onClick={() => setCitizenship("us")}
                    title="US Citizen"
                    desc="Born in the United States, or naturalized."
                    illustration={<UsCitizenArt />}
                    badge="Form 1040"
                  />
                  <StatusCard
                    id="gc"
                    selected={scope.citizenship === "gc"}
                    onClick={() => setCitizenship("gc")}
                    title="Green-card holder"
                    desc="Lawful permanent resident — taxed on worldwide income."
                    illustration={<GreenCardArt />}
                    badge="Form 1040"
                  />
                  <StatusCard
                    id="neither"
                    selected={scope.citizenship === "neither"}
                    onClick={() => setCitizenship("neither")}
                    title="Neither"
                    desc="Visa holder, non-resident alien, or somewhere in between."
                    illustration={<NeitherArt />}
                    badge="Form 1040-NR or dual-status"
                  />
                </div>

                {/* Branch A — US Citizen or GC: were you abroad? */}
                {(scope.citizenship === "us" || scope.citizenship === "gc") && (
                  <div className="followup">
                    <div className="followup-head">
                      <span className="followup-emoji" aria-hidden="true">✈️</span>
                      <div>
                        <h3>And where were you based in {filingYear}?</h3>
                        <p>Most of our clients spent {filingYear} outside the US. Tell us which side of the ocean you were on.</p>
                      </div>
                    </div>
                    <div className="followup-options">
                      <FollowupCard
                        selected={scope.livedAbroad === "yes"}
                        onClick={() => setScope({ ...scope, livedAbroad: "yes" })}
                        icon="globe"
                        title="Mostly abroad"
                        desc={`Lived outside the US for most or all of ${filingYear}.`}
                      />
                      <FollowupCard
                        selected={scope.livedAbroad === "no"}
                        onClick={() => setScope({ ...scope, livedAbroad: "no" })}
                        icon="home"
                        title="Mostly in the US"
                        desc={`Lived in the US for most of ${filingYear}.`}
                      />
                    </div>
                  </div>
                )}

                {/* Branch B — Neither: substantial presence */}
                {scope.citizenship === "neither" && (
                  <div className="followup">
                    <div className="followup-head">
                      <span className="followup-emoji" aria-hidden="true">📅</span>
                      <div>
                        <h3>Help us run the Substantial Presence Test.</h3>
                        <p>The IRS counts your days on US soil to decide whether to treat you as a resident. Days don't have to be consecutive — count any partial day in the country.</p>
                      </div>
                    </div>
                    <div className="day-grid">
                      <DayInput
                        label={`Days in the US in ${filingYear}`}
                        value={scope.daysY}
                        onChange={(v) => setScope({ ...scope, daysY: v })}
                      />
                      <DayInput
                        label={`Days in the US in ${filingYear - 1}`}
                        value={scope.daysY1}
                        onChange={(v) => setScope({ ...scope, daysY1: v })}
                      />
                      <DayInput
                        label={`Days in the US in ${filingYear - 2}`}
                        value={scope.daysY2}
                        onChange={(v) => setScope({ ...scope, daysY2: v })}
                      />
                    </div>
                    {scope.daysY !== "" && scope.daysY1 !== "" && scope.daysY2 !== "" && (
                      <SubstantialPresenceHint
                        y={parseInt(scope.daysY, 10)}
                        y1={parseInt(scope.daysY1, 10)}
                        y2={parseInt(scope.daysY2, 10)}
                      />
                    )}
                  </div>
                )}

                {!scope.citizenship && (
                  <aside className="organizer-callout">
                    <span className="organizer-callout-icon"><Icon name="info" size={16} /></span>
                    <span>
                      <strong>Not sure?</strong> If you held a green card for any part of the year — even one day —
                      the IRS treats you as a US person for that period. We sort the substantial-presence-test math on our side.
                    </span>
                  </aside>
                )}
              </div>

              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => setStep(0)}>
                  <Icon name="arrow-left" size={14} />
                  Previous step
                </button>
                <button
                  type="button"
                  className={"btn btn-primary organizer-next" + (citizenshipReady ? "" : " disabled")}
                  disabled={!citizenshipReady}
                  onClick={() => setStep(2)}
                >
                  Start the questionnaire
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {/* Placeholder for remaining steps — to be designed in subsequent rounds */}
          {step === 2 && (
            <React.Fragment>
              <div className="organizer-body">
                <div className="organizer-step-head">
                  <h2 className="organizer-step-title">
                    Tell us a little about {filingYear}.
                    <span className="organizer-step-emoji" aria-hidden="true">🌿</span>
                  </h2>
                  <p className="organizer-step-sub">
                    These quick answers shape what we ask next — so we only bother you with what
                    actually matters for your {filingYear} return. Each one takes a second.
                  </p>
                </div>

                <div className="about-list">
                  <PersonalInfo
                    taxpayer={taxpayer}
                    setTaxpayerField={setTaxpayerField}
                    spouse={spouse}
                    setSpouseField={setSpouseField}
                    married={about.married === "yes"}
                    filingYear={filingYear}
                  />
                  <AboutRow
                    emoji="💍"
                    title="I was married this year."
                    desc={`Legally married on December 31, ${filingYear} counts — even if your spouse lives elsewhere. (Separated under a decree? Mark “Not me.”)`}
                    value={about.married}
                    onChange={(v) => setAboutAnswer("married", v)}
                  />
                  {about.married === "yes" && (
                    <SpouseOrganizer value={spouse} onChange={setSpouse} setField={setSpouseField} />
                  )}
                  {about.married === "yes" && (spouse.filingStatus === "MFJ" || spouse.filingStatus === "MFS") && (
                    <SpouseIncome value={spouseIncome} onChange={setSpouseIncome} />
                  )}
                  <AboutRow
                    emoji="👨‍👩‍👧"
                    title="I have dependents on my return."
                    desc={`Children under 17 as of December 31, ${filingYear}, full-time students, anyone you support, or a family member with a disability — they all count.`}
                    value={about.dependents}
                    onChange={(v) => setAboutAnswer("dependents", v)}
                  />
                  {about.dependents === "yes" && (
                    <DependentOrganizer value={dependents} onChange={setDependents} />
                  )}
                  {about.dependents === "yes" && (
                    <div className="dep-card" style={{ marginTop: 4 }}>
                      <div className="dep-questions">
                        <div className="dep-q">
                          <span className="dep-q-text">
                            Are the dependent(s) your children, U.S. citizens, and do you want to open Trump Accounts?
                            <span className="dep-q-hint">Trump accounts are tax deferred accounts similar to educational savings accounts.</span>
                          </span>
                          <div className="dep-seg">
                            <button type="button" className={"dep-seg-btn" + (about.trumpAccounts === "no" ? " selected-no" : "")} onClick={() => setAboutAnswer("trumpAccounts", "no")}>No</button>
                            <button type="button" className={"dep-seg-btn" + (about.trumpAccounts === "yes" ? " selected-yes" : "")} onClick={() => setAboutAnswer("trumpAccounts", "yes")}>Yes</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <AboutRow
                    emoji="💼"
                    title="I get paid by an employer."
                    desc="W-2s, regular paychecks, bonuses, equity comp — anything where someone else cuts the check."
                    value={about.employed}
                    onChange={(v) => setAboutAnswer("employed", v)}
                  />
                  {about.employed === "yes" && (
                    <EmployerOrganizer
                      value={employers}
                      onChange={setEmployers}
                      showOwner={about.married === "yes"}
                      filingYear={filingYear}
                    />
                  )}
                  <AboutRow
                    emoji="🌍"
                    title="I have accounts outside the United States."
                    desc="Checking, savings, brokerage, pension, or investment accounts held abroad. Even one combined balance over $10,000 triggers an FBAR — we'll handle it."
                    value={about.foreignAccounts}
                    onChange={(v) => setAboutAnswer("foreignAccounts", v)}
                  />
                  {about.foreignAccounts === "yes" && (
                    <ForeignAccountsOrganizer value={foreignAccounts} onChange={setForeignAccounts} />
                  )}
                  <AboutRow
                    emoji="🧰"
                    title="I work for myself."
                    desc="Freelance, consulting, contractor, sole proprietor — any income you earn for yourself rather than receive from an employer."
                    value={about.selfEmployed}
                    onChange={(v) => setAboutAnswer("selfEmployed", v)}
                  />
                  {about.selfEmployed === "yes" && (
                    <ScheduleCOrganizer value={scheduleC} onChange={setScheduleC} filingYear={filingYear} />
                  )}
                  <AboutRow
                    emoji="📈"
                    title="I have investments."
                    desc="Stocks, mutual funds, dividends, capital gains — at home or abroad. (Foreign mutual funds need extra care under the PFIC rules.)"
                    value={about.investments}
                    onChange={(v) => setAboutAnswer("investments", v)}
                  />
                  {about.investments === "yes" && (
                    <InvestmentOrganizer value={investments} onChange={setInvestments} filingYear={filingYear} />
                  )}
                  <AboutRow
                    emoji="🏛️"
                    title="I have ownership in a business, partnership, or trust."
                    desc="Any shares or interest in a corporation, LLC, partnership, or trust — US or foreign. Even a small slice counts."
                    value={about.ownership}
                    onChange={(v) => setAboutAnswer("ownership", v)}
                  />
                  {about.ownership === "yes" && (
                    <OwnershipOrganizer
                      value={ownership}
                      onChange={setOwnership}
                      showOwner={about.married === "yes"}
                      filingYear={filingYear}
                    />
                  )}
                  <AboutRow
                    emoji="🧾"
                    title="I'd like to look at itemizing my deductions."
                    desc="The IRS gives most couples a $29,000+ standard deduction by default. If you have notable charitable gifts, mortgage interest, or state taxes, itemizing may save more."
                    value={about.itemize}
                    onChange={(v) => setAboutAnswer("itemize", v)}
                  />
                  {about.itemize === "yes" && (
                    <ItemizedDeductionsOrganizer value={itemized} onChange={setItemized} />
                  )}
                  <AboutRow
                    emoji="🌅"
                    title="I receive retirement income."
                    desc="Social Security, pensions, annuities, IRAs, or 401(k) distributions — any income arriving from a retirement-related source."
                    value={about.retirement}
                    onChange={(v) => setAboutAnswer("retirement", v)}
                  />
                  {about.retirement === "yes" && (
                    <RetirementOrganizer value={retirement} onChange={setRetirement} filingYear={filingYear} />
                  )}
                  <AboutRow
                    emoji="🏠"
                    title="I sold a home this year."
                    desc={`If you sold a residence — primary, secondary, or investment — in ${filingYear}, we'll work out whether the §121 exclusion applies or whether there's a capital gain to report.`}
                    value={about.soldHome}
                    onChange={(v) => setAboutAnswer("soldHome", v)}
                  />
                  {about.soldHome === "yes" && (
                    <HomeSaleOrganizer value={homeSale} onChange={setHomeSale} filingYear={filingYear} />
                  )}
                  <AboutRow
                    emoji="💰"
                    title="I received dividend income."
                    desc="From a US brokerage like Fidelity or Schwab, or a foreign one. Even small dividends on mutual funds need reporting."
                    value={about.dividends}
                    onChange={(v) => setAboutAnswer("dividends", v)}
                  />
                  {about.dividends === "yes" && (
                    <Form1099Organizer
                      kind="DIV"
                      value={dividendDetail}
                      onChange={setDividendDetail}
                      showOwner={about.married === "yes"}
                      filingYear={filingYear}
                    />
                  )}
                  <AboutRow
                    emoji="💵"
                    title="I earned interest income."
                    desc="From bank accounts, savings, money-market funds, or interest on loans you've made. Foreign-account interest gets special FBAR / 8938 treatment."
                    value={about.interest}
                    onChange={(v) => setAboutAnswer("interest", v)}
                  />
                  {about.interest === "yes" && (
                    <Form1099Organizer
                      kind="INT"
                      value={interestDetail}
                      onChange={setInterestDetail}
                      showOwner={about.married === "yes"}
                      filingYear={filingYear}
                    />
                  )}
                  <AboutRow
                    emoji="🏘️"
                    title="I rent out property."
                    desc="House, apartment, office, land, or equipment that brings in rental income. This puts us into Schedule E territory."
                    value={about.rental}
                    onChange={(v) => setAboutAnswer("rental", v)}
                  />
                  {about.rental === "yes" && (
                    <RentalOrganizer value={rentalProps} onChange={setRentalProps} />
                  )}
                </div>

                <OtherSituations value={otherSituations} onChange={setOtherSituations} country={taxpayer.country} />

                <aside className="organizer-callout" style={{ marginTop: 24 }}>
                  <span className="organizer-callout-icon"><Icon name="info" size={16} /></span>
                  <span>
                    <strong>None of these are commitments.</strong> If something's unclear, mark your best guess —
                    your assigned CPA will confirm everything with you before anything is filed.
                  </span>
                </aside>
              </div>

              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>
                  <Icon name="arrow-left" size={14} />
                  Previous step
                </button>
                <button
                  type="button"
                  className={"btn btn-primary organizer-next" + (aboutReady ? "" : " disabled")}
                  disabled={!aboutReady}
                  onClick={() => setStep(3)}
                >
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {/* Step — Income */}
          {step === 3 && (
            <React.Fragment>
              <div className="organizer-body">
                <div className="organizer-step-head">
                  <h2 className="organizer-step-title">
                    Let's put numbers to {filingYear}.
                    <span className="organizer-step-emoji" aria-hidden="true">💵</span>
                  </h2>
                  <p className="organizer-step-sub">
                    For each income source you flagged, tell us what was earned and what tax was
                    already withheld. Enter amounts in the currency you received them — we convert later.
                  </p>
                </div>

                <IncomeOrganizer
                  about={about}
                  showSpouse={about.married === "yes" && (spouse.filingStatus === "MFJ" || spouse.filingStatus === "MFS")}
                  value={income}
                  onChange={setIncome}
                />
              </div>

              <div className="organizer-foot">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>
                  <Icon name="arrow-left" size={14} />
                  Previous step
                </button>
                <button type="button" className="btn btn-primary organizer-next" onClick={() => setStep(4)}>
                  Continue
                  <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </React.Fragment>
          )}

          {step > 3 && (
            <div className="organizer-body">
              <div className="organizer-placeholder">
                <h2>{ORGANIZER_STEPS[step].label}</h2>
                <p>This step is on the way — once you've reviewed the previous screen, we'll design this next.</p>
                <div className="organizer-foot" style={{ borderTop: "none", padding: 0, marginTop: 24 }}>
                  <button type="button" className="btn-back" onClick={() => setStep(step - 1)}>
                    <Icon name="arrow-left" size={14} />
                    Previous step
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Question({ label, hint, children }) {
  return (
    <div className="organizer-question">
      <div className="organizer-question-label">{label}</div>
      {hint && <div className="organizer-question-hint">{hint}</div>}
      <div className="organizer-question-control">{children}</div>
    </div>
  );
}

function PickButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      className={"pick-button" + (selected ? " selected" : "")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/* About-you row — emoji + title + desc + yes/no toggle */
function AboutRow({ emoji, title, desc, value, onChange }) {
  return (
    <div className="about-row">
      <div className="about-row-body">
        <div className="about-row-title">
          <span className="about-row-emoji" aria-hidden="true">{emoji}</span>
          {title}
        </div>
        <div className="about-row-desc">{desc}</div>
      </div>
      <div className="about-row-pick">
        <button
          type="button"
          className={"about-pick" + (value === "no" ? " selected-no" : "")}
          onClick={() => onChange("no")}
        >
          Not me
        </button>
        <button
          type="button"
          className={"about-pick" + (value === "yes" ? " selected-yes" : "")}
          onClick={() => onChange("yes")}
        >
          That's me
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   Step 2 — status cards + custom illustrations
   ============================================================ */
function StatusCard({ id, selected, onClick, title, desc, illustration, badge }) {
  return (
    <button
      type="button"
      className={"status-card" + (selected ? " selected" : "")}
      onClick={onClick}
      aria-pressed={selected}
    >
      <div className="status-card-art">{illustration}</div>
      <div className="status-card-content">
        <div className="status-card-title">{title}</div>
        <div className="status-card-desc">{desc}</div>
        <div className="status-card-badge">
          <Icon name="file-text" size={12} />
          {badge}
        </div>
      </div>
      <div className="status-card-radio" aria-hidden="true">
        {selected && <Icon name="check" size={14} />}
      </div>
    </button>
  );
}

function FollowupCard({ selected, onClick, icon, title, desc }) {
  return (
    <button
      type="button"
      className={"followup-card" + (selected ? " selected" : "")}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="followup-card-icon"><Icon name={icon} size={22} /></span>
      <span className="followup-card-text">
        <span className="followup-card-title">{title}</span>
        <span className="followup-card-desc">{desc}</span>
      </span>
      <span className="followup-card-radio">
        {selected && <Icon name="check" size={14} />}
      </span>
    </button>
  );
}

function DayInput({ label, value, onChange }) {
  return (
    <label className="day-input">
      <span className="day-input-label">{label}</span>
      <span className="day-input-wrap">
        <input
          type="number"
          inputMode="numeric"
          min="0"
          max="366"
          step="1"
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "" || /^\d+$/.test(v)) onChange(v);
          }}
          placeholder="0"
        />
        <span className="day-input-unit">days</span>
      </span>
    </label>
  );
}

/* The IRS substantial-presence formula: current + (prior-1 ÷ 3) + (prior-2 ÷ 6).
   If ≥ 183 and current year ≥ 31, the IRS treats you as a US resident. */
function SubstantialPresenceHint({ y, y1, y2 }) {
  const total = y + (y1 / 3) + (y2 / 6);
  const meets = total >= 183 && y >= 31;
  const headline = meets ? "You likely meet the Substantial Presence Test." : "You likely do not meet the Substantial Presence Test.";
  const detail = meets
    ? "We'll prepare a US resident return (Form 1040) and check for treaty positions or closer-connection exceptions that might apply."
    : "We'll likely prepare a non-resident return (Form 1040-NR). If you're close to the threshold, we'll re-run the math precisely.";
  return (
    <div className={"sp-hint " + (meets ? "sp-hint-meets" : "sp-hint-notmeet")}>
      <span className="sp-hint-icon"><Icon name={meets ? "check-circle-2" : "info"} size={18} /></span>
      <div>
        <div className="sp-hint-title">{headline}</div>
        <div className="sp-hint-detail">{detail}</div>
        <div className="sp-hint-math numeric">
          Weighted day count: <strong>{total.toFixed(1)}</strong>
          {" · "}IRS threshold: <strong>183.0</strong>
        </div>
      </div>
    </div>
  );
}

/* US Citizen — eagle silhouette over a navy crest */
function UsCitizenArt() {
  return (
    <svg viewBox="0 0 120 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="usSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#19345B" />
          <stop offset="100%" stopColor="#0E2240" />
        </linearGradient>
      </defs>
      {/* Sky disk */}
      <circle cx="60" cy="48" r="38" fill="url(#usSky)" />
      {/* Sun behind */}
      <circle cx="60" cy="42" r="22" fill="#E8D49A" opacity="0.6" />
      {/* Star burst */}
      <g stroke="#C9A24A" strokeWidth="0.8" opacity="0.6">
        <line x1="60" y1="22" x2="60" y2="30" />
        <line x1="60" y1="54" x2="60" y2="62" />
        <line x1="42" y1="42" x2="50" y2="42" />
        <line x1="70" y1="42" x2="78" y2="42" />
        <line x1="48" y1="30" x2="54" y2="34" />
        <line x1="66" y1="50" x2="72" y2="54" />
        <line x1="72" y1="30" x2="66" y2="34" />
        <line x1="54" y1="50" x2="48" y2="54" />
      </g>
      {/* Stylized eagle outline */}
      <path d="M 32 64 Q 60 28 88 64 L 84 66 Q 60 38 36 66 Z" fill="#C9A24A" />
      <path d="M 50 64 Q 60 52 70 64 L 67 66 Q 60 58 53 66 Z" fill="#0E2240" />
      {/* Body */}
      <ellipse cx="60" cy="68" rx="6" ry="9" fill="#0E2240" />
      <circle cx="60" cy="58" r="3.5" fill="#0E2240" />
      {/* Banner ribbon */}
      <path d="M 28 78 L 60 82 L 92 78 L 90 84 L 60 86 L 30 84 Z" fill="#A8842F" />
      <path d="M 28 78 L 32 80 L 30 84 Z" fill="#6B5320" />
      <path d="M 92 78 L 88 80 L 90 84 Z" fill="#6B5320" />
    </svg>
  );
}

/* Green card — stylized ID card with green tint */
function GreenCardArt() {
  return (
    <svg viewBox="0 0 120 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="gcCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5A9472" />
          <stop offset="100%" stopColor="#3F7A52" />
        </linearGradient>
      </defs>
      {/* Card body */}
      <rect x="14" y="20" width="92" height="60" rx="6" fill="url(#gcCard)" />
      {/* Top header band */}
      <rect x="14" y="20" width="92" height="14" rx="6" fill="#2A4A38" />
      <rect x="14" y="28" width="92" height="6" fill="#2A4A38" />
      {/* USA stripes */}
      <rect x="20" y="24" width="22" height="2" fill="#E8D49A" opacity="0.7" />
      <rect x="46" y="24" width="40" height="2" fill="#E8D49A" opacity="0.5" />
      {/* Portrait box */}
      <rect x="22" y="42" width="26" height="30" rx="2" fill="#F4EFE4" />
      <circle cx="35" cy="52" r="5" fill="#A88A6A" />
      <path d="M 25 72 Q 35 60 45 72 Z" fill="#A88A6A" />
      {/* Lines (info) */}
      <rect x="56" y="42" width="42" height="3" rx="1" fill="#FAF6EE" opacity="0.9" />
      <rect x="56" y="50" width="36" height="2.5" rx="1" fill="#FAF6EE" opacity="0.7" />
      <rect x="56" y="58" width="32" height="2.5" rx="1" fill="#FAF6EE" opacity="0.7" />
      {/* Eagle stamp */}
      <circle cx="92" cy="70" r="8" fill="#C9A24A" />
      <path d="M 86 71 Q 92 66 98 71 Q 95 73 92 72 Q 89 73 86 71 Z" fill="#0E2240" />
      {/* Card shine */}
      <path d="M 14 26 L 106 60 L 106 64 L 14 30 Z" fill="#FAF6EE" opacity="0.06" />
    </svg>
  );
}

/* Neither — globe with passport / question mark */
function NeitherArt() {
  return (
    <svg viewBox="0 0 120 96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="globeSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7AB5C8" />
          <stop offset="100%" stopColor="#3A6A78" />
        </linearGradient>
      </defs>
      {/* Globe */}
      <circle cx="48" cy="48" r="32" fill="url(#globeSky)" />
      {/* Meridians */}
      <ellipse cx="48" cy="48" rx="14" ry="32" fill="none" stroke="#FAF6EE" strokeWidth="1" opacity="0.6" />
      <ellipse cx="48" cy="48" rx="28" ry="32" fill="none" stroke="#FAF6EE" strokeWidth="0.8" opacity="0.45" />
      {/* Equator */}
      <line x1="16" y1="48" x2="80" y2="48" stroke="#FAF6EE" strokeWidth="1" opacity="0.5" />
      {/* Continents */}
      <path d="M 36 36 Q 42 28 52 32 Q 58 38 50 44 Q 42 46 36 42 Z" fill="#6B8073" opacity="0.85" />
      <path d="M 30 56 Q 38 52 48 60 Q 52 66 44 70 Q 36 68 30 60 Z" fill="#6B8073" opacity="0.85" />
      <path d="M 58 50 Q 64 48 70 52 Q 68 58 62 58 Z" fill="#6B8073" opacity="0.85" />
      {/* Passport (top-right) */}
      <rect x="76" y="20" width="32" height="40" rx="3" fill="#4B4A78" />
      <circle cx="92" cy="34" r="6" fill="#C9A24A" />
      <circle cx="92" cy="34" r="3.5" fill="#4B4A78" />
      <rect x="82" y="46" width="20" height="2" fill="#C9A24A" />
      <rect x="82" y="51" width="20" height="2" fill="#C9A24A" />
      {/* Question mark badge */}
      <circle cx="92" cy="74" r="11" fill="#A8842F" />
      <text x="92" y="79" textAnchor="middle" fontFamily="Georgia, serif" fontSize="14" fill="#FAF6EE" fontWeight="600">?</text>
    </svg>
  );
}

export { TaxOrganizer };
