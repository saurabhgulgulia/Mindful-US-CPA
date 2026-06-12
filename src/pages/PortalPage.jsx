import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientDashboard } from '../components/ClientDashboard.jsx';
import '../styles/portal.css';

export default function PortalPage() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  return (
    <div className="portal-page">
      <ClientDashboard
        open={open}
        clientName="Avery Whitfield"
        clientEmail="avery@example.com"
        onClose={() => navigate('/')}
      />
    </div>
  );
}
