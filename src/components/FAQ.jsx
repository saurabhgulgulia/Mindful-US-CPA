import React from 'react';
import { Icon } from './Icon.jsx';

const FAQS = [
  {
    q: "How much does a return cost?",
    a: "Every engagement starts with a no-cost discovery call and a written fee estimate before any work begins. Fees scale with the complexity of your return — number of foreign accounts, foreign entities, states, K-1s, equity events. You'll always know the cost in writing before we start. Hourly consultation is available for one-off questions, billed in 15-minute increments.",
  },
  {
    q: "Are you a licensed CPA?",
    a: "Yes. Licensed by a state board of accountancy as a Certified Public Accountant, AICPA member, and IRS-authorized e-File originator. Every return is reviewed and signed by a licensed CPA. Nothing leaves the office unreviewed.",
  },
  {
    q: "I haven't filed in several years. Am I in trouble?",
    a: "Almost certainly not in the way you fear. For non-willful failures — which is most expats and many domestic taxpayers — the IRS offers Streamlined Filing Procedures, a structured catch-up program that avoids the criminal exposure most people imagine. We've walked dozens of clients through it. The IRS is more forgiving than the internet suggests.",
  },
  {
    q: "What's your engagement capacity? Will you take my return?",
    a: "We're a small practice on purpose. We take roughly 40 new personal clients and a handful of corporate engagements per year. We don't take new corporate work between February and April. Send us a note and we'll be honest about whether we can fit you in this cycle.",
  },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="section" id="faq">
      <div className="container-narrow">
        <div className="section-eyebrow" style={{ textAlign: "center" }}>Common questions</div>
        <h2 className="section-head" style={{ textAlign: "center", margin: "0 auto var(--space-8)", maxWidth: "24ch" }}>
          Questions worth asking before you hire a CPA.
        </h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq-toggle"><Icon name="plus" size={16} /></span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FAQ };
