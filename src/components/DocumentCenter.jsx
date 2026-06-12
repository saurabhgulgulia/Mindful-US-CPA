import React from 'react';
import { Icon } from './Icon.jsx';

// DocumentCenter — lets the client browse the documents they've uploaded,
// organized by tax year. Selecting a year filters the list to that year's files.
//
// Per the firm's rules:
//  • Clients can FLAG a document as a duplicate, but can never DELETE a file.
//  • Every document shows a protection box (Password protected / Not protected).
//  • For password-protected files, a secure password-entry box appears ONLY in the
//    Preparer / Admin role — it is never shown to the client.

const DOC_YEARS = [
  { year: "2024", docs: [
    { name: "W-2 — Acme Corporation.pdf", cat: "Wages", size: "248 KB", date: "Feb 12, 2025", status: "accepted" },
    { name: "1099-DIV — Fidelity.pdf", cat: "Investment income", size: "196 KB", date: "Feb 12, 2025", status: "accepted" },
    { name: "1099-INT — Chase Bank.pdf", cat: "Interest income", size: "132 KB", date: "Feb 14, 2025", status: "review" },
    { name: "Form 1098 — Mortgage interest.pdf", cat: "Deductions", size: "210 KB", date: "Feb 18, 2025", status: "received" },
    { name: "Charitable receipts.pdf", cat: "Deductions", size: "1.2 MB", date: "Mar 2, 2025", status: "received" },
  ] },
  { year: "2023", docs: [
    { name: "W-2 — Acme Corporation.pdf", cat: "Wages", size: "240 KB", date: "Feb 9, 2024", status: "accepted" },
    { name: "1099-NEC — Freelance.pdf", cat: "Self-employment", size: "180 KB", date: "Feb 9, 2024", status: "accepted" },
    { name: "Form 1098-T — Tuition.pdf", cat: "Education credits", size: "156 KB", date: "Feb 20, 2024", status: "accepted" },
    { name: "2023 Form 1040 (filed).pdf", cat: "Filed return", size: "420 KB", date: "Apr 3, 2024", status: "accepted" },
  ] },
  { year: "2022", docs: [
    { name: "W-2 — Northgate LLC.pdf", cat: "Wages", size: "232 KB", date: "Feb 11, 2023", status: "accepted" },
    { name: "2022 Form 1040 (filed).pdf", cat: "Filed return", size: "398 KB", date: "Apr 1, 2023", status: "accepted" },
  ] },
];

// Which documents are password-protected, and the (demo) password that opens them.
const DOC_PROTECTED = {
  "W-2 — Acme Corporation.pdf": "acme",
  "1099-INT — Chase Bank.pdf": "chase",
  "2023 Form 1040 (filed).pdf": "return23",
  "2022 Form 1040 (filed).pdf": "return22",
};

const DOC_STATUS = { received: "Received", review: "Under review", accepted: "Accepted" };

function docHumanSize(b) {
  if (b < 1024) return b + " B";
  if (b < 1048576) return Math.round(b / 1024) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

function DocumentCenter({ clientName }) {
  const CLIENT = clientName || "Avery Whitfield";
  const [years, setYears] = React.useState(() => DOC_YEARS.map((y) => ({
    year: y.year,
    docs: y.docs.map((d, di) => ({
      ...d,
      id: y.year + "-" + di,
      protected: !!DOC_PROTECTED[d.name],
      pw: DOC_PROTECTED[d.name] || "",
      duplicate: false,
      unlocked: false,
    })),
  })));
  const [activeYear, setActiveYear] = React.useState(DOC_YEARS[0].year);
  const [role, setRole] = React.useState("preparer"); // "client" | "preparer"
  const [drag, setDrag] = React.useState(false);
  const [pwInput, setPwInput] = React.useState({});
  const [pwError, setPwError] = React.useState({});
  const fileRef = React.useRef(null);

  const isStaff = role === "preparer";
  const active = years.find((y) => y.year === activeYear) || years[0];

  function updateDoc(id, patch) {
    setYears((prev) => prev.map((y) => ({ ...y, docs: y.docs.map((d) => d.id === id ? { ...d, ...patch } : d) })));
  }

  function tryUnlock(d) {
    if (d.pw && (pwInput[d.id] || "") === d.pw) {
      updateDoc(d.id, { unlocked: true });
      setPwError((e) => ({ ...e, [d.id]: "" }));
      setPwInput((p) => ({ ...p, [d.id]: "" }));
    } else {
      setPwError((e) => ({ ...e, [d.id]: "Incorrect password — please try again." }));
    }
  }

  function addFiles(list) {
    const added = [...list].map((f, k) => ({
      id: "u" + Date.now() + "-" + k,
      name: f.name, cat: "Uploaded by you", size: docHumanSize(f.size), date: "Just now",
      status: "received", protected: false, pw: "", duplicate: false, unlocked: false,
    }));
    if (!added.length) return;
    setYears((prev) => prev.map((y) => y.year === activeYear ? { ...y, docs: [...added, ...y.docs] } : y));
  }

  return (
    <div className="doc-center">
      <div className="doc-center-head">
        <div className="section-eyebrow">Documents</div>
        <h1>Your documents</h1>
        <p>Everything you've uploaded to us, organized by tax year. Pick a year to see its files — you can flag duplicates, but uploaded files can't be deleted.</p>
      </div>

      {/* Year selector */}
      <aside className="doc-years">
        <div className="doc-years-head">Tax years</div>
        {years.map((y) => (
          <button
            key={y.year}
            type="button"
            className={"doc-year-item" + (y.year === activeYear ? " active" : "")}
            onClick={() => setActiveYear(y.year)}
          >
            <span className="doc-year-label">Tax year {y.year}</span>
            <span className="doc-year-count">{y.docs.length} file{y.docs.length === 1 ? "" : "s"}</span>
          </button>
        ))}
      </aside>

      {/* Documents for the selected year */}
      <section className="doc-main">
        <div className="doc-main-head">
          <div>
            <div className="doc-main-title">{active.year} documents</div>
            <div className="doc-main-sub">
              {active.docs.length} file{active.docs.length === 1 ? "" : "s"} uploaded by {CLIENT.split(" ")[0]}
            </div>
          </div>
          <div className="doc-head-actions">
            <div className="doc-roles">
              <button type="button" className={"doc-role-btn" + (role === "client" ? " active" : "")} onClick={() => setRole("client")}>
                <Icon name="user" size={13} />
                Client view
              </button>
              <button type="button" className={"doc-role-btn" + (role === "preparer" ? " active" : "")} onClick={() => setRole("preparer")}>
                <Icon name="shield-check" size={13} />
                Preparer / Admin
              </button>
            </div>
            <button type="button" className="doc-upload-btn" onClick={() => fileRef.current && fileRef.current.click()}>
              <Icon name="upload" size={15} />
              Upload document
            </button>
          </div>
        </div>

        <input
          ref={fileRef}
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
        />

        <div className="doc-list">
          <div
            className={"doc-dropzone" + (drag ? " drag" : "")}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
          >
            <span className="doc-dropzone-icon"><Icon name="upload-cloud" size={18} /></span>
            <span>Drag files here to file them under {active.year}, or use Upload document.</span>
          </div>

          {active.docs.length === 0 ? (
            <div className="doc-empty">No documents for {active.year} yet.</div>
          ) : (
            active.docs.map((d) => (
              <div key={d.id} className={"doc-row" + (d.duplicate ? " dup" : "")}>
                <div className="doc-row-main">
                  <span className="doc-icon">
                    <Icon name={/return/i.test(d.name) ? "file-check" : "file-text"} size={19} />
                  </span>
                  <div className="doc-info">
                    <div className="doc-name">{d.name}</div>
                    <div className="doc-meta">{d.cat} · {d.size} · Uploaded {d.date}</div>
                    <div className="doc-badges">
                      {d.duplicate ? (
                        <span className="doc-dup-badge"><Icon name="copy" size={12} />Duplicate</span>
                      ) : null}
                      {!d.protected ? (
                        <span className="doc-protect open"><Icon name="shield" size={12} />Not protected</span>
                      ) : d.unlocked ? (
                        <span className="doc-protect unlocked"><Icon name="lock-open" size={12} />Unlocked</span>
                      ) : (
                        <span className="doc-protect locked"><Icon name="lock" size={12} />Password protected</span>
                      )}
                      <span className={"doc-status " + d.status}>{DOC_STATUS[d.status]}</span>
                    </div>
                  </div>
                  <div className="doc-actions">
                    <button
                      type="button"
                      className={"doc-mark" + (d.duplicate ? " active" : "")}
                      onClick={() => updateDoc(d.id, { duplicate: !d.duplicate })}
                      title="Flag as duplicate — files can't be deleted"
                    >
                      <Icon name={d.duplicate ? "check" : "copy"} size={14} />
                      {d.duplicate ? "Marked duplicate" : "Mark duplicate"}
                    </button>
                    <button type="button" className="doc-view" disabled={d.protected && !d.unlocked}>
                      <Icon name="eye" size={14} />View
                    </button>
                  </div>
                </div>

                {/* Secure password box — preparer / admin only */}
                {d.protected && !d.unlocked && isStaff ? (
                  <div className="doc-secure">
                    <div className="doc-secure-head">
                      <Icon name="key-round" size={14} />
                      Enter document password to open
                    </div>
                    <div className="doc-secure-row">
                      <input
                        type="password"
                        className="doc-secure-input"
                        placeholder="Document password"
                        autoComplete="off"
                        value={pwInput[d.id] || ""}
                        onChange={(e) => setPwInput((p) => ({ ...p, [d.id]: e.target.value }))}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); tryUnlock(d); } }}
                      />
                      <button type="button" className="doc-secure-btn" onClick={() => tryUnlock(d)}>
                        <Icon name="unlock" size={14} />Unlock
                      </button>
                    </div>
                    {pwError[d.id] ? <div className="doc-secure-error">{pwError[d.id]}</div> : null}
                    <div className="doc-secure-note">
                      <Icon name="eye-off" size={12} />
                      <span>Visible to tax preparer &amp; admin only — never shown to the client.</span>
                      {d.pw ? <span className="doc-secure-hint">Demo password: {d.pw}</span> : null}
                    </div>
                  </div>
                ) : null}

                {/* Client sees only that it's protected — no password entry */}
                {d.protected && !d.unlocked && !isStaff ? (
                  <div className="doc-secure client">
                    <Icon name="lock" size={13} />
                    <span>Password protected — only your preparer can open this file.</span>
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export { DocumentCenter };
