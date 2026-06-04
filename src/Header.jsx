import React from 'react';
import { Icon } from './Icon.jsx';

function Header({ onConsultClick }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <React.Fragment>
      <div className="utility-bar">
        <div className="container">
          <div className="utility-bar-inner">
            <div className="utility-contacts">
              <a className="utility-contact" href="tel:+15513103732">
                <Icon name="phone" size={13} />
                +1 (551) 310-3732
              </a>
              <a className="utility-contact" href="mailto:support@mindfuluscpa.com">
                <Icon name="mail" size={13} />
                support@mindfuluscpa.com
              </a>
            </div>
              <a className="utility-link" href="#client-login" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-client-login")); }}>
                <Icon name="lock" size={13} />
                Client login
              </a>
          </div>
        </div>
      </div>
      <header className={"site-header" + (scrolled ? " scrolled" : "")}>
        <div className="container">
          <div className="header-inner">
            <a href="#" className="brand" aria-label="Mindful US CPA — home">
              <img src={window.IMG["logo-mark-splash"]} alt="Mindful US CPA logo mark" className="brand-mark-img" />
              <span className="brand-name">Mindful US CPA</span>
            </a>
            <nav className="nav" aria-label="Primary">
              <a className="nav-link" href="#services">Services</a>
              <a className="nav-link" href="#who-we-help">Who we help</a>
              <a className="nav-link" href="#about">About</a>
              <a className="nav-link" href="#countries">Countries</a>
              <a className="nav-link" href="#knowledge">Resources</a>
              <a className="nav-link" href="#faq">FAQ</a>
              <button className="btn btn-primary btn-small" onClick={onConsultClick}>
                Schedule a consultation
              </button>
            </nav>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

export { Header };
