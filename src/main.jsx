import React from 'react';
import ReactDOM from 'react-dom/client';

// Design tokens + component styles (order matters: tokens first)
import './colors_and_type.css';
import './site.css';

// images.js assigns window.IMG (used by <img src={window.IMG[...]} /> across components)
import './images.js';

import { ClientDashboard } from './ClientDashboard.jsx';

// Boots straight into the client portal dashboard — this mirrors the original
// client-portal.html preview. To render the full marketing site instead, swap
// the import to `import App from './App.jsx'` and render <App /> below.
function PortalPreview() {
  const [open, setOpen] = React.useState(true);
  return (
    <ClientDashboard
      open={open}
      clientName="Avery Whitfield"
      clientEmail="avery@example.com"
      onClose={() => {
        // In the standalone preview, "sign out" just resets so you can re-enter.
        setOpen(false);
        setTimeout(() => setOpen(true), 50);
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PortalPreview />
  </React.StrictMode>
);
