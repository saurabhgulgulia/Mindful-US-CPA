import React from 'react';
import { About } from './About.jsx';
import { Audiences } from './Audiences.jsx';
import { CTA } from './CTA.jsx';
import { Calendar } from './Calendar.jsx';
import { ChecklistDownload } from './ChecklistDownload.jsx';
import { ClientDashboard } from './ClientDashboard.jsx';
import { ClientLoginModal } from './ClientLoginModal.jsx';
import { Compare } from './Compare.jsx';
import { ConsultDrawer } from './ConsultDrawer.jsx';
import { ContactSection } from './ContactSection.jsx';
import { CountryGuides } from './CountryGuides.jsx';
import { Credentials } from './CredentialsCPAEA.jsx';
import { FAQ } from './FAQ.jsx';
import { Footer } from './Footer.jsx';
import { Guarantees } from './Guarantees.jsx';
import { Header } from './Header.jsx';
import { Hero } from './Hero.jsx';
import { KnowledgeHub } from './KnowledgeHub.jsx';
import { Newsletter } from './Newsletter.jsx';
import { Process } from './Process.jsx';
import { Reviews } from './Reviews.jsx';
import { ServicePanel } from './ServicePanel.jsx';
import { Services } from './Services.jsx';
import { StatsBand } from './StatsBand.jsx';
import { TaxForms } from './TaxForms.jsx';
import { WhatWeFile } from './WhatWeFile.jsx';
import { WhoWeHelp } from './WhoWeHelp.jsx';

function App() {
  const [consultOpen, setConsultOpen] = React.useState(false);
  const [activeService, setActiveService] = React.useState(null);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(null);  // { name, email } | null

  const openConsult = () => setConsultOpen(true);
  const closeConsult = () => setConsultOpen(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  const handleSignedIn = (user) => {
    setLoginOpen(false);
    setSignedIn(user);
  };
  const handleSignOut = () => setSignedIn(null);

  React.useEffect(() => {
    const onConsult = () => openConsult();
    const onLogin = () => openLogin();
    window.addEventListener("open-consult", onConsult);
    window.addEventListener("open-client-login", onLogin);
    return () => {
      window.removeEventListener("open-consult", onConsult);
      window.removeEventListener("open-client-login", onLogin);
    };
  }, []);

  const openService = (svc) => setActiveService(svc);
  const closeService = () => setActiveService(null);

  const openAudience = () => openConsult();
  const openCountry = () => openConsult();

  return (
    <React.Fragment>
      <Header onConsultClick={openConsult} />
      <Hero onConsultClick={openConsult} />
      <StatsBand />
      <WhatWeFile />
      <Audiences onAudienceClick={openAudience} />
      <WhoWeHelp />
      <Services onServiceClick={openService} />
      <Credentials />
      <About onConsultClick={openConsult} />
      <Compare />
      <CountryGuides onCountryClick={openCountry} />
      <Process />
      <Guarantees />
      <Calendar />
      <KnowledgeHub />
      <TaxForms />
      <ChecklistDownload />
      <Reviews />
      <FAQ />
      <Newsletter />
      <ContactSection onConsultClick={openConsult} />
      <CTA onConsultClick={openConsult} />
      <Footer />
      <ConsultDrawer open={consultOpen} onClose={closeConsult} />
      <ServicePanel service={activeService} onClose={closeService} onConsultClick={openConsult} />
      <ClientLoginModal open={loginOpen} onClose={closeLogin} onSignedIn={handleSignedIn} />
      <ClientDashboard
        open={!!signedIn}
        clientName={signedIn ? signedIn.name : ""}
        clientEmail={signedIn ? signedIn.email : ""}
        onClose={handleSignOut}
      />
    </React.Fragment>
  );
}

export default App;
