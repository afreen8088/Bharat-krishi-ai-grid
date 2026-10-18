import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Info } from 'lucide-react';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-ivory-bg)' }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div 
        className="main-layout-wrapper"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          transition: 'all 0.3s ease'
        }}
      >
        {/* Global Demo Indicator Banner */}
        <div className="demo-banner">
          <Info size={14} color="var(--color-forest-green)" />
          <span>
            <strong>Prototype Mode:</strong> Demonstrating BKIG interface with sample data. No real financial or government records are altered.
          </span>
          <span className="demo-pill">Simulated Environment</span>
        </div>

        {/* Topbar */}
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />

        {/* Page Content Viewport */}
        <main 
          style={{
            flex: 1,
            padding: 'var(--space-xl)',
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            boxSizing: 'border-box'
          }}
          className="dashboard-main-content"
        >
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 961px) {
          .main-layout-wrapper {
            margin-left: var(--sidebar-width);
          }
        }
        @media (max-width: 640px) {
          .dashboard-main-content {
            padding: var(--space-md) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
