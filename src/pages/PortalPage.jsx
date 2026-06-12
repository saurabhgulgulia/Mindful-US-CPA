import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientDashboard } from '../components/ClientDashboard.jsx';
import { fetchMe, logout, isAuthenticated } from '../api/auth.js';
import '../styles/portal.css';

export default function PortalPage() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState('loading'); // 'loading' | 'ready'

  // Validate the stored token against the API before showing the portal.
  // No valid session → bounce back to the marketing site.
  React.useEffect(() => {
    let active = true;
    if (!isAuthenticated()) {
      navigate('/');
      return;
    }
    fetchMe()
      .then((u) => {
        if (!active) return;
        setUser(u);
        setStatus('ready');
      })
      .catch(() => {
        if (!active) return;
        logout();
        navigate('/');
      });
    return () => { active = false; };
  }, [navigate]);

  const signOut = () => {
    logout();
    navigate('/');
  };

  if (status !== 'ready' || !user) {
    return (
      <div className="portal-page" style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <div style={{ color: 'var(--ink-2)', fontSize: 14 }}>Loading your portal…</div>
      </div>
    );
  }

  return (
    <div className="portal-page">
      <ClientDashboard
        open={true}
        clientName={user.name}
        clientEmail={user.email}
        onClose={signOut}
      />
    </div>
  );
}
