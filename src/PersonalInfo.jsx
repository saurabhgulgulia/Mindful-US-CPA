import React from 'react';
import { Icon } from './Icon.jsx';

// PersonalInfo — top of the "About you" step. Two tabs: Tax payer (always)
// and Spouse (enabled only when the client is married). Collects identity,
// profession, and current mailing address for each.

const COUNTRIES = [
  "United States","Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Brazzaville)","Congo (Kinshasa)","Costa Rica","Côte d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe","Other"
];

const ZIP_RANGES = [
  ["AL",350,369],["AK",995,999],["AZ",850,865],["AR",716,729],["CA",900,961],
  ["CO",800,816],["CT",60,69],["DE",197,199],["DC",200,205],["FL",320,349],
  ["GA",300,319],["GA",398,399],["HI",967,968],["ID",832,838],["IL",600,629],
  ["IN",460,479],["IA",500,528],["KS",660,679],["KY",400,427],["LA",700,714],
  ["ME",39,49],["MD",206,219],["MA",10,27],["MA",55,55],["MI",480,499],
  ["MN",550,567],["MS",386,397],["MO",630,658],["MT",590,599],["NE",680,693],
  ["NV",889,898],["NH",30,38],["NJ",70,89],["NM",870,884],["NY",90,149],
  ["NC",270,289],["ND",580,588],["OH",430,459],["OK",730,749],["OR",970,979],
  ["PA",150,196],["RI",28,29],["SC",290,299],["SD",570,577],["TN",370,385],
  ["TX",750,799],["TX",885,885],["TX",733,733],["UT",840,847],["VT",50,59],
  ["VA",220,246],["WA",980,994],["WV",247,268],["WI",530,549],["WY",820,831],
];
function zipToState(zip) {
  if (!zip || zip.length < 3) return "";
  const p = parseInt(zip.slice(0, 3), 10);
  if (isNaN(p)) return "";
  for (const [st, lo, hi] of ZIP_RANGES) if (p >= lo && p <= hi) return st;
  return "";
}

const DIAL_CODES = [
  {iso:"US",code:"+1"},{iso:"CA",code:"+1"},{iso:"GB",code:"+44"},{iso:"AE",code:"+971"},{iso:"AF",code:"+93"},{iso:"AL",code:"+355"},{iso:"DZ",code:"+213"},{iso:"AD",code:"+376"},{iso:"AO",code:"+244"},{iso:"AR",code:"+54"},{iso:"AM",code:"+374"},{iso:"AU",code:"+61"},{iso:"AT",code:"+43"},{iso:"AZ",code:"+994"},{iso:"BH",code:"+973"},{iso:"BD",code:"+880"},{iso:"BY",code:"+375"},{iso:"BE",code:"+32"},{iso:"BZ",code:"+501"},{iso:"BJ",code:"+229"},{iso:"BT",code:"+975"},{iso:"BO",code:"+591"},{iso:"BA",code:"+387"},{iso:"BW",code:"+267"},{iso:"BR",code:"+55"},{iso:"BN",code:"+673"},{iso:"BG",code:"+359"},{iso:"BF",code:"+226"},{iso:"BI",code:"+257"},{iso:"KH",code:"+855"},{iso:"CM",code:"+237"},{iso:"CV",code:"+238"},{iso:"CF",code:"+236"},{iso:"TD",code:"+235"},{iso:"CL",code:"+56"},{iso:"CN",code:"+86"},{iso:"CO",code:"+57"},{iso:"KM",code:"+269"},{iso:"CG",code:"+242"},{iso:"CD",code:"+243"},{iso:"CR",code:"+506"},{iso:"CI",code:"+225"},{iso:"HR",code:"+385"},{iso:"CU",code:"+53"},{iso:"CY",code:"+357"},{iso:"CZ",code:"+420"},{iso:"DK",code:"+45"},{iso:"DJ",code:"+253"},{iso:"DO",code:"+1809"},{iso:"EC",code:"+593"},{iso:"EG",code:"+20"},{iso:"SV",code:"+503"},{iso:"GQ",code:"+240"},{iso:"ER",code:"+291"},{iso:"EE",code:"+372"},{iso:"SZ",code:"+268"},{iso:"ET",code:"+251"},{iso:"FJ",code:"+679"},{iso:"FI",code:"+358"},{iso:"FR",code:"+33"},{iso:"GA",code:"+241"},{iso:"GM",code:"+220"},{iso:"GE",code:"+995"},{iso:"DE",code:"+49"},{iso:"GH",code:"+233"},{iso:"GR",code:"+30"},{iso:"GT",code:"+502"},{iso:"GN",code:"+224"},{iso:"GW",code:"+245"},{iso:"GY",code:"+592"},{iso:"HT",code:"+509"},{iso:"HN",code:"+504"},{iso:"HK",code:"+852"},{iso:"HU",code:"+36"},{iso:"IS",code:"+354"},{iso:"IN",code:"+91"},{iso:"ID",code:"+62"},{iso:"IR",code:"+98"},{iso:"IQ",code:"+964"},{iso:"IE",code:"+353"},{iso:"IL",code:"+972"},{iso:"IT",code:"+39"},{iso:"JP",code:"+81"},{iso:"JO",code:"+962"},{iso:"KZ",code:"+7"},{iso:"KE",code:"+254"},{iso:"KW",code:"+965"},{iso:"KG",code:"+996"},{iso:"LA",code:"+856"},{iso:"LV",code:"+371"},{iso:"LB",code:"+961"},{iso:"LS",code:"+266"},{iso:"LR",code:"+231"},{iso:"LY",code:"+218"},{iso:"LI",code:"+423"},{iso:"LT",code:"+370"},{iso:"LU",code:"+352"},{iso:"MO",code:"+853"},{iso:"MG",code:"+261"},{iso:"MW",code:"+265"},{iso:"MY",code:"+60"},{iso:"MV",code:"+960"},{iso:"ML",code:"+223"},{iso:"MT",code:"+356"},{iso:"MR",code:"+222"},{iso:"MU",code:"+230"},{iso:"MX",code:"+52"},{iso:"MD",code:"+373"},{iso:"MC",code:"+377"},{iso:"MN",code:"+976"},{iso:"ME",code:"+382"},{iso:"MA",code:"+212"},{iso:"MZ",code:"+258"},{iso:"MM",code:"+95"},{iso:"NA",code:"+264"},{iso:"NP",code:"+977"},{iso:"NL",code:"+31"},{iso:"NZ",code:"+64"},{iso:"NI",code:"+505"},{iso:"NE",code:"+227"},{iso:"NG",code:"+234"},{iso:"MK",code:"+389"},{iso:"NO",code:"+47"},{iso:"OM",code:"+968"},{iso:"PK",code:"+92"},{iso:"PA",code:"+507"},{iso:"PG",code:"+675"},{iso:"PY",code:"+595"},{iso:"PE",code:"+51"},{iso:"PH",code:"+63"},{iso:"PL",code:"+48"},{iso:"PT",code:"+351"},{iso:"QA",code:"+974"},{iso:"RO",code:"+40"},{iso:"RU",code:"+7"},{iso:"RW",code:"+250"},{iso:"SA",code:"+966"},{iso:"SN",code:"+221"},{iso:"RS",code:"+381"},{iso:"SC",code:"+248"},{iso:"SL",code:"+232"},{iso:"SG",code:"+65"},{iso:"SK",code:"+421"},{iso:"SI",code:"+386"},{iso:"SO",code:"+252"},{iso:"ZA",code:"+27"},{iso:"KR",code:"+82"},{iso:"SS",code:"+211"},{iso:"ES",code:"+34"},{iso:"LK",code:"+94"},{iso:"SD",code:"+249"},{iso:"SR",code:"+597"},{iso:"SE",code:"+46"},{iso:"CH",code:"+41"},{iso:"SY",code:"+963"},{iso:"TW",code:"+886"},{iso:"TJ",code:"+992"},{iso:"TZ",code:"+255"},{iso:"TH",code:"+66"},{iso:"TL",code:"+670"},{iso:"TG",code:"+228"},{iso:"TN",code:"+216"},{iso:"TR",code:"+90"},{iso:"TM",code:"+993"},{iso:"UG",code:"+256"},{iso:"UA",code:"+380"},{iso:"UY",code:"+598"},{iso:"UZ",code:"+998"},{iso:"VE",code:"+58"},{iso:"VN",code:"+84"},{iso:"YE",code:"+967"},{iso:"ZM",code:"+260"},{iso:"ZW",code:"+263"},
];

function PersonalInfo({ taxpayer, setTaxpayerField, spouse, setSpouseField, married, filingYear }) {
  const [tab, setTab] = React.useState("taxpayer");

  // Auto-switch to the spouse tab the moment the client marks married,
  // so the spouse's info comes into view. Fall back to taxpayer if un-marked.
  React.useEffect(() => {
    if (married) setTab("spouse");
    else if (tab === "spouse") setTab("taxpayer");
  }, [married]);

  const person = tab === "taxpayer" ? taxpayer : spouse;
  const setField = tab === "taxpayer" ? setTaxpayerField : setSpouseField;

  return (
    <div className="pinfo-card">
      <div className="pinfo-header">
        <span className="pinfo-emoji" aria-hidden="true">🧾</span>
        <div>
          <h3>Personal information</h3>
          <p>Who's on this return. We use this exactly as it appears on your official documents.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="pinfo-tabs">
        <button
          type="button"
          className={"pinfo-tab" + (tab === "taxpayer" ? " active" : "")}
          onClick={() => setTab("taxpayer")}
        >
          <Icon name="user" size={15} />
          Tax payer
        </button>
        <button
          type="button"
          className={"pinfo-tab" + (tab === "spouse" ? " active" : "") + (married ? "" : " disabled")}
          disabled={!married}
          onClick={() => married && setTab("spouse")}
          title={married ? "" : "Mark “I was married this year” below to add your spouse"}
        >
          <Icon name="users" size={15} />
          Spouse
          {!married && <span className="pinfo-tab-note">if applicable</span>}
        </button>
      </div>

      <div className="pinfo-grid">
        <label className="rental-field"><span className="rental-field-label">First name<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="First name" value={person.firstName} onChange={(e) => setField("firstName", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">Middle name</span>
          <input className="rental-input" type="text" placeholder="Optional" value={person.middleName} onChange={(e) => setField("middleName", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">Last name<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="Last name" value={person.lastName} onChange={(e) => setField("lastName", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">Date of birth<span className="req">*</span></span>
          <input className="rental-input" type="text" inputMode="numeric" placeholder="MM/DD/YYYY" maxLength={10} value={person.dob} onChange={(e) => setField("dob", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">SSN or ITIN<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="XXX-XX-XXXX" value={person.taxId} onChange={(e) => setField("taxId", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">Profession / occupation<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="e.g. Software engineer, Physician" value={person.profession} onChange={(e) => setField("profession", e.target.value)} /></label>
        {tab === "taxpayer" && (
          <label className="rental-field"><span className="rental-field-label">Email address<span className="req">*</span></span>
            <input className="rental-input" type="email" placeholder="you@example.com" value={person.email || ""} onChange={(e) => setField("email", e.target.value)} /></label>
        )}
        {tab === "taxpayer" && (
          <label className="rental-field"><span className="rental-field-label">Contact number<span className="req">*</span></span>
            <span className="phone-row">
              <select className="rental-input phone-cc" value={person.phoneCC || "+1"} onChange={(e) => setField("phoneCC", e.target.value)}>
                {DIAL_CODES.map((d) => <option key={d.code + d.iso} value={d.code}>{d.iso} {d.code}</option>)}
              </select>
              <input className="rental-input phone-num" type="tel" placeholder="(555) 000-0000" value={person.phone || ""} onChange={(e) => setField("phone", e.target.value)} />
            </span>
          </label>
        )}
      </div>

      <div className="pinfo-subhead">
        <span className="pinfo-subhead-emoji" aria-hidden="true">📮</span>
        Current mailing address <span className="pinfo-subhead-note">where you receive mail</span>
      </div>
      <div className="pinfo-grid">
        <label className="rental-field full"><span className="rental-field-label">Mailing address<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="Street address, apartment / unit" value={person.mailing || ""} onChange={(e) => setField("mailing", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">City<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="City" value={person.city || ""} onChange={(e) => setField("city", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">ZIP / Postal code<span className="req">*</span></span>
          <input className="rental-input" type="text" placeholder="ZIP" value={person.zip || ""}
            onChange={(e) => {
              const zip = e.target.value;
              setField("zip", zip);
              if ((person.country || "United States") === "United States") {
                const st = zipToState(zip);
                if (st) setField("state", st);
              }
            }} /></label>
        <label className="rental-field"><span className="rental-field-label">State / Region{(person.country || "United States") === "United States" ? <span className="pinfo-auto"> auto from ZIP</span> : null}</span>
          <input className="rental-input" type="text" placeholder={(person.country || "United States") === "United States" ? "Auto-filled" : "State / region"} value={person.state || ""} onChange={(e) => setField("state", e.target.value)} /></label>
        <label className="rental-field"><span className="rental-field-label">Country<span className="req">*</span></span>
          <select className="rental-input" value={person.country || "United States"}
            onChange={(e) => {
              const c = e.target.value;
              setField("country", c);
              if (c !== "United States") setField("state", person.state || "");
            }}>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select></label>
        {person.country === "Other" && (
          <label className="rental-field"><span className="rental-field-label">Please specify country<span className="req">*</span></span>
            <input className="rental-input" type="text" placeholder="Type your country" value={person.otherCountry || ""} onChange={(e) => setField("otherCountry", e.target.value)} /></label>
        )}
      </div>

      {/* History — time abroad; shows when mailing country is not the US */}
      {(person.country && person.country !== "United States") && (
        <div className="pinfo-foreign-res">
          <div className="pinfo-subhead" style={{ borderTop: "none", paddingTop: 0, marginTop: 0 }}>
            <span className="pinfo-subhead-emoji" aria-hidden="true">🧭</span>
            Your history abroad <span className="pinfo-subhead-note">moves in &amp; out of the U.S.</span>
          </div>
          <label className="rental-field full" style={{ marginTop: 4 }}>
            <span className="rental-field-label">When did you leave the U.S. to live abroad?</span>
            <input className="rental-input" type="text" placeholder="MMM-DD-YYYY" value={person.leftUSDate || ""} onChange={(e) => setField("leftUSDate", e.target.value)} />
          </label>
          <YesNoRow label={`Did you move between non-U.S. countries in ${filingYear || "the filing year"}?`}
            value={person.movedNonUS} onChange={(v) => setField("movedNonUS", v)} />
          {person.movedNonUS === "yes" && (
            <NonUSMoves value={person.nonUSMoves} onChange={(v) => setField("nonUSMoves", v)} />
          )}
          <YesNoRow label={`Did you move from or to the U.S. in ${filingYear || "the filing year"}?`}
            value={person.movedToFromUS} onChange={(v) => setField("movedToFromUS", v)} />
          {person.movedToFromUS === "yes" && (
            <label className="rental-field full" style={{ marginTop: 14 }}>
              <span className="rental-field-label">Provide date when you moved and country names (from → to)</span>
              <input className="rental-input" type="text" placeholder="e.g. Mar 2025 · United States → Portugal"
                value={person.movedDetails || ""} onChange={(e) => setField("movedDetails", e.target.value)} />
            </label>
          )}
          <label className="rental-field full" style={{ marginTop: 14 }}>
            <span className="rental-field-label">Have you previously filed Form 2555?</span>
            <span className="rental-field-hint" style={{ marginBottom: 6 }}>Form 2555 is used to exclude foreign earned income from U.S. taxation.</span>
            <select className="rental-input" value={person.filed2555 || ""} onChange={(e) => setField("filed2555", e.target.value)}>
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>
      )}

      {/* Foreign-residence (Housing Arrangements) — shows when mailing country is not the US */}
      {(person.country && person.country !== "United States") && (
        <div className="pinfo-foreign-res">
          <label className="rental-field full">
            <span className="rental-field-label">
              <span className="pinfo-foreign-emoji" aria-hidden="true">🏠</span>
              Did you rent or own your primary foreign (i.e. non-US) residence this year?<span className="req">*</span>
            </span>
            <select className="rental-input" value={person.foreignResidence || ""} onChange={(e) => setField("foreignResidence", e.target.value)}>
              <option value="">Select</option>
              <option value="rent">Rent</option>
              <option value="own">Own</option>
              <option value="employer">Employer-provided residence</option>
            </select>
          </label>

          {/* Rent → amount + employer-paid */}
          {person.foreignResidence === "rent" && (
            <label className="rental-field full" style={{ marginTop: 14 }}>
              <span className="rental-field-label">What rent &amp; utilities did you pay on the foreign residence this year?</span>
              <MoneyInput value={person.foreignRent} onChange={(v) => setField("foreignRent", v)} placeholder="0" />
            </label>
          )}
          {person.foreignResidence === "rent" && (
            <YesNoRow label="Did your employer pay for your residence?"
              value={person.employerPaidHousing} onChange={(v) => setField("employerPaidHousing", v)} />
          )}

          {/* Own → employer-paid */}
          {person.foreignResidence === "own" && (
            <YesNoRow label="Did your employer pay for your residence?"
              value={person.employerPaidHousing} onChange={(v) => setField("employerPaidHousing", v)} />
          )}

          {/* Employer-provided → condition of employment */}
          {person.foreignResidence === "employer" && (
            <YesNoRow label="Is living in the employer-provided residence a condition of employment?"
              value={person.housingCondition} onChange={(v) => setField("housingCondition", v)} />
          )}

          {/* All paths → family members */}
          {person.foreignResidence && (
            <YesNoRow
              label="Did any of your family members live with you during the filing year?"
              hint="E.g. your spouse, children, parents, siblings, or a partner in a committed relationship — regardless of official registration."
              value={person.familyLivedWith} onChange={(v) => setField("familyLivedWith", v)} />
          )}
        </div>
      )}
    </div>
  );
}



// NonUSMoves — repeatable detail rows shown when the client moved between
// non-US countries during the filing year. Each move captures the date moved,
// date of entry, the route, the purpose, and the reason for travelling.
const emptyMove = () => ({ dateMove: "", dateIn: "", fromTo: "", purpose: "", reason: "" });

function NonUSMoves({ value, onChange }) {
  const moves = value && value.length > 0 ? value : [emptyMove()];
  const update = (idx, patch) => onChange(moves.map((m, i) => (i === idx ? { ...m, ...patch } : m)));
  const add = () => onChange([...moves, emptyMove()]);
  const remove = (idx) => onChange(moves.length === 1 ? [emptyMove()] : moves.filter((_, i) => i !== idx));

  return (
    <div className="moves-block">
      {moves.map((m, i) => (
        <div key={i} className="moves-row">
          <div className="moves-row-head">
            <span className="moves-row-title">Move {i + 1}</span>
            {moves.length > 1 && (
              <button type="button" className="moves-row-remove" onClick={() => remove(i)} aria-label={`Remove move ${i + 1}`}>
                <Icon name="x" size={13} />
              </button>
            )}
          </div>
          <div className="rental-grid">
            <label className="rental-field"><span className="rental-field-label">Date of move</span>
              <input className="rental-input" type="text" placeholder="MMM-DD-YYYY" value={m.dateMove} onChange={(e) => update(i, { dateMove: e.target.value })} /></label>
            <label className="rental-field"><span className="rental-field-label">Date of entry (in)</span>
              <input className="rental-input" type="text" placeholder="MMM-DD-YYYY" value={m.dateIn} onChange={(e) => update(i, { dateIn: e.target.value })} /></label>
            <label className="rental-field full"><span className="rental-field-label">From where → where</span>
              <input className="rental-input" type="text" placeholder="e.g. Portugal → Germany" value={m.fromTo} onChange={(e) => update(i, { fromTo: e.target.value })} /></label>
            <label className="rental-field"><span className="rental-field-label">Purpose of visit</span>
              <input className="rental-input" type="text" placeholder="e.g. Relocation, work, family" value={m.purpose} onChange={(e) => update(i, { purpose: e.target.value })} /></label>
            <label className="rental-field"><span className="rental-field-label">Travelling reason</span>
              <input className="rental-input" type="text" placeholder="e.g. New assignment" value={m.reason} onChange={(e) => update(i, { reason: e.target.value })} /></label>
          </div>
        </div>
      ))}
      <button type="button" className="rental-tab-add" onClick={add}>
        <Icon name="plus" size={14} />
        Add another move
      </button>
    </div>
  );
}


function YesNoRow({ label, hint, value, onChange }) {
  return (
    <div className="pinfo-yesno">
      <div className="pinfo-yesno-body">
        <div className="pinfo-yesno-label">{label}</div>
        {hint && <div className="pinfo-yesno-hint">{hint}</div>}
      </div>
      <div className="pinfo-yesno-pick">
        <button type="button" className={"about-pick" + (value === "no" ? " selected-no" : "")} onClick={() => onChange("no")}>No</button>
        <button type="button" className={"about-pick" + (value === "yes" ? " selected-yes" : "")} onClick={() => onChange("yes")}>Yes</button>
      </div>
    </div>
  );
}

export { PersonalInfo, NonUSMoves, YesNoRow };
