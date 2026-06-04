import React from 'react';

const PROCESS_STEPS = [
  { num: "01", title: "Discovery conversation", body: "A short conversation to listen to your situation and answer whatever you want to ask. No prep required." },
  { num: "02", title: "Engagement & onboarding", body: "Written engagement letter, secure portal access, and a checklist of documents we'll need from you." },
  { num: "03", title: "Preparation & review", body: "We prepare the return. Every return is reviewed line-by-line by a licensed CPA before you see a draft." },
  { num: "04", title: "Walkthrough & filing", body: "A review session to walk through the return together, answer any questions, and confirm the positions taken. We e-file once you've signed off." },
];

function Process() {
  return (
    <section className="process-section" id="process">
      <div className="container">
        <div className="section-eyebrow">How we work</div>
        <h2 className="section-head" style={{ maxWidth: "20ch" }}>
          A deliberate process,<br />never rushed.
        </h2>
        <p className="section-sub" style={{ maxWidth: "60ch" }}>
          Most filings take a week and a half or less once we have your documents.
          That's the right cadence — fast enough to respect your time, slow
          enough to get it right.
        </p>
        <div className="process-grid">
          {PROCESS_STEPS.map((s) => (
            <div key={s.num} className="process-step">
              <div className="process-num numeric">{s.num}</div>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Process };
