import React from 'react';

function Testimonial() {
  return (
    <section className="testimonial">
      <div className="container-narrow">
        <div className="section-eyebrow" style={{ textAlign: "center", marginBottom: "var(--space-7)" }}>
          A client letter
        </div>
        <blockquote className="testimonial-quote" style={{ margin: "0 auto var(--space-6)", textAlign: "center", textWrap: "balance" }}>
          We'd been abroad for nine years and were terrified of catching up. Mindful US CPA
          handled the Streamlined filing without drama, kept us informed, and quietly closed
          the loop with the IRS. We sleep better now.
        </blockquote>
        <div className="testimonial-attr" style={{ justifyContent: "center" }}>
          <div className="testimonial-avatar">AW</div>
          <div>
            <strong>Avery & Whit W.</strong>
            <span>US citizens, Singapore · Streamlined Filing client, 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Testimonial };
