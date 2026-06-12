import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header.jsx';
import { Hero } from '../components/Hero.jsx';
import { StatsBand } from '../components/StatsBand.jsx';
import { WhatWeFile } from '../components/WhatWeFile.jsx';
import { Audiences } from '../components/Audiences.jsx';
import { WhoWeHelp } from '../components/WhoWeHelp.jsx';
import { Services } from '../components/Services.jsx';
import { Credentials } from '../components/CredentialsCPAEA.jsx';
import { About } from '../components/About.jsx';
import { Compare } from '../components/Compare.jsx';
import { CountryGuides } from '../components/CountryGuides.jsx';
import { Process } from '../components/Process.jsx';
import { Guarantees } from '../components/Guarantees.jsx';
import { Calendar } from '../components/Calendar.jsx';
import { KnowledgeHub } from '../components/KnowledgeHub.jsx';
import { TaxForms } from '../components/TaxForms.jsx';
import { ChecklistDownload } from '../components/ChecklistDownload.jsx';
import { Reviews } from '../components/Reviews.jsx';
import { FAQ } from '../components/FAQ.jsx';
import { Newsletter } from '../components/Newsletter.jsx';
import { ContactSection } from '../components/ContactSection.jsx';
import { CTA } from '../components/CTA.jsx';
import { Footer } from '../components/Footer.jsx';
import { ConsultDrawer } from '../components/ConsultDrawer.jsx';
import { ServicePanel } from '../components/ServicePanel.jsx';
import { ClientLoginModal } from '../components/ClientLoginModal.jsx';

export default function HomePage() {
  const navigate = useNavigate();
  const [consultOpen, setConsultOpen] = React.useState(false);
  const [activeService, setActiveService] = React.useState(null);
  const [loginOpen, setLoginOpen] = React.useState(false);

  const openConsult = () => setConsultOpen(true);
  const closeConsult = () => setConsultOpen(false);
  const openService = (svc) => setActiveService(svc);
  const closeService = () => setActiveService(null);

  React.useEffect(() => {
    const onConsult = () => openConsult();
    const onLogin = () => setLoginOpen(true);
    window.addEventListener('open-consult', onConsult);
    window.addEventListener('open-client-login', onLogin);
    return () => {
      window.removeEventListener('open-consult', onConsult);
      window.removeEventListener('open-client-login', onLogin);
    };
  }, []);

  return (
    <React.Fragment>
      <Header onConsultClick={openConsult} />
      <Hero onConsultClick={openConsult} />
      <StatsBand />
      <WhatWeFile />
      <Audiences onAudienceClick={openConsult} />
      <WhoWeHelp />
      <Services onServiceClick={openService} />
      <Credentials />
      <About onConsultClick={openConsult} />
      <Compare />
      <CountryGuides onCountryClick={openConsult} />
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
      <ClientLoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSignedIn={() => { setLoginOpen(false); navigate('/portal'); }}
      />
    </React.Fragment>
  );
}
