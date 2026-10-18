import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, UserCheck, Sprout } from 'lucide-react';
import Logo from '../branding/Logo';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/#features' },
    { label: 'Impact', path: '/#impact' },
    { label: 'How It Works', path: '/#how-it-works' }
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#F7F1E3',
        borderBottom: '1px solid #E6DEC8',
        padding: '0.85rem 0'
      }}
    >
      {/* Top-left subtle botanical flourish */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '72px',
          height: '72px',
          pointerEvents: 'none',
          opacity: 0.35,
          zIndex: 0
        }}
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M0 0 C30 10, 50 35, 60 70 C40 60, 20 40, 0 0 Z"
          fill="#D6A84F"
          opacity="0.3"
        />
        <path
          d="M0 0 C20 25, 30 55, 35 90 C25 65, 10 35, 0 0 Z"
          fill="#173F2A"
          opacity="0.25"
        />
        <circle cx="15" cy="15" r="2.5" fill="#D6A84F" opacity="0.6" />
        <circle cx="30" cy="28" r="2" fill="#173F2A" opacity="0.5" />
      </svg>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        {/* BKIG Botanical Logo at left */}
        <Logo variant="dark" />

        {/* Desktop Nav Links */}
        <nav 
          style={{ display: 'none', alignItems: 'center', gap: '2rem' }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '0.95rem',
                color: location.pathname === link.path && !link.path.includes('#') ? '#173F2A' : '#4A554D',
                transition: 'color 0.2s ease',
                position: 'relative',
                padding: '4px 0'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section: Community Message & Forest-Green Login Button */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }} className="desktop-nav">
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.82rem',
              color: '#173F2A',
              backgroundColor: 'rgba(221, 228, 208, 0.45)',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid #DDE4D0',
              fontWeight: 500
            }}
          >
            <Sprout size={15} color="#D6A84F" />
            <span>For Indian Farming Communities</span>
          </div>

          {isAuthenticated ? (
            <Link 
              to={currentUser?.role === 'officer' ? '/officer/dashboard' : '/farmer/dashboard'}
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: '#173F2A',
                color: '#F7F1E3',
                border: '1px solid #173F2A',
                borderRadius: '8px',
                padding: '0.55rem 1.25rem',
                fontWeight: 600
              }}
            >
              <UserCheck size={16} />
              <span>Go to {currentUser?.role === 'officer' ? 'Officer Portal' : 'Farmer Portal'}</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: '#173F2A',
                color: '#F7F1E3',
                border: '1px solid #173F2A',
                borderRadius: '8px',
                padding: '0.55rem 1.35rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(23, 63, 42, 0.15)'
              }}
            >
              <span>Login</span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="btn-icon mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          style={{ display: 'flex', color: '#173F2A' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#F7F1E3',
            borderBottom: '1px solid #E6DEC8',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            zIndex: 99
          }}
        >
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              color: '#173F2A',
              backgroundColor: 'rgba(221, 228, 208, 0.45)',
              padding: '6px 12px',
              borderRadius: '9999px',
              border: '1px solid #DDE4D0',
              fontWeight: 500,
              alignSelf: 'flex-start'
            }}
          >
            <Sprout size={15} color="#D6A84F" />
            <span>For Indian Farming Communities</span>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: '#172A21',
                padding: '0.4rem 0'
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ paddingTop: '1rem', borderTop: '1px solid #E4E0D5', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isAuthenticated ? (
              <Link 
                to={currentUser?.role === 'officer' ? '/officer/dashboard' : '/farmer/dashboard'}
                className="btn btn-primary"
                style={{ backgroundColor: '#173F2A', color: '#F7F1E3' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-primary"
                  style={{ backgroundColor: '#173F2A', color: '#F7F1E3', display: 'flex', justifyContent: 'center', gap: '8px' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Login</span>
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/role-selection" 
                  className="btn btn-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Choose Role & Explore
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
