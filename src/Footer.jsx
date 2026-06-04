import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="brand" aria-label="Mindful US CPA — home">
              <img src={window.IMG["logo-mark-splash"]} alt="Mindful US CPA logo mark" className="brand-mark-img" style={{ filter: "brightness(1.05)" }} />
              <span className="brand-name" style={{ color: "var(--brand-gold-soft)" }}>Mindful US CPA</span>
            </a>
            <p className="footer-tagline">Quiet expertise.<br />Trusted counsel.</p>
          </div>
          <div>
            <h4 className="footer-heading">Services</h4>
            <a className="footer-link" href="#services">US Expat Returns</a>
            <a className="footer-link" href="#services">Streamlined Filing</a>
            <a className="footer-link" href="#services">Corporate Returns</a>
            <a className="footer-link" href="#services">Personal Returns</a>
            <a className="footer-link" href="#services">Tax Planning</a>
            <a className="footer-link" href="#services">CPA Consulting</a>
          </div>
          <div>
            <h4 className="footer-heading">Firm</h4>
            <a className="footer-link" href="#about">About</a>
            <a className="footer-link" href="#credentials">CPA credentials</a>
            <a className="footer-link" href="#process">How we work</a>
            <a className="footer-link" href="#faq">FAQ</a>
            <a className="footer-link" href="#">Client portal</a>
            <a className="footer-link" href="#knowledge">Notes & guides</a>
          </div>
          <div>
            <h4 className="footer-heading">Contact</h4>
            <a className="footer-link" href="mailto:support@mindfuluscpa.com">support@mindfuluscpa.com</a>
            <a className="footer-link" href="tel:+15513103732">+1 (551) 310-3732</a>
            <span className="footer-link" style={{ color: "rgba(255,255,255,.55)" }}>By appointment · video first</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Mindful US CPA LLC · Licensed in the State of New York</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a className="footer-link" style={{ display: "inline", padding: 0 }} href="#">Privacy</a>
            <a className="footer-link" style={{ display: "inline", padding: 0 }} href="#">Terms</a>
            <a className="footer-link" style={{ display: "inline", padding: 0 }} href="#">Disclosures</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
