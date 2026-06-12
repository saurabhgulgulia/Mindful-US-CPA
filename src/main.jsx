import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PortalPage from './pages/PortalPage.jsx';

import './styles/colors_and_type.css';
import './styles/site.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="Mindful-US-CPA/" element={<HomePage />} />
        <Route path="Mindful-US-CPA/portal/" element={<PortalPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
