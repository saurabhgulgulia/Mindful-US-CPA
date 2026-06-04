import React from 'react';
import { Icon } from './Icon.jsx';

function Hero({ onConsultClick }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          {/* Left: type-led headline */}
          <div>
            <div className="hero-eyebrow">A boutique CPA practice</div>
            <h1 className="hero-headline">
              The <em>complicated</em> return,<br />in steady hands.
            </h1>
            <p className="hero-lead">
              Mindful US CPA serves Americans abroad, individuals with complex returns, and closely-held
              businesses with deliberate, considered work. We handle US expat tax, corporate
              returns, state compliance, and Streamlined catch-up filings — and we explain
              every step to you so you actually understand it.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-primary" onClick={onConsultClick}>
                Schedule a consultation
              </button>
              <a className="btn btn-ghost" href="#services">
                View services
                <Icon name="arrow-right" size={18} />
              </a>
            </div>
            <div className="hero-foot">
              <span><strong>Licensed CPA</strong></span>
              <span style={{ color: "var(--rule)" }}>·</span>
              <span><strong>AICPA</strong> member</span>
              <span style={{ color: "var(--rule)" }}>·</span>
              <span><strong>IRS</strong> e-File authorized</span>
            </div>
          </div>

          {/* Right: actual splash logo as the hero centerpiece */}
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-rings r3" />
            <div className="hero-art-rings r2" />
            <div className="hero-art-rings" />
            <img
              src={window.IMG["logo-mark-splash"]}
              alt=""
              style={{
                width: "92%",
                height: "auto",
                position: "relative",
                zIndex: 2,
                filter: "drop-shadow(0 24px 60px rgba(168,132,47,0.20))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
