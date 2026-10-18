import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'light', size = 'default', showSubtitle = true, to = '/' }) => {
  const isLight = variant === 'light'; // Light text for dark backgrounds (e.g. sidebar)
  const isLarge = size === 'large';

  return (
    <Link 
      to={to} 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isLarge ? '12px' : '10px',
        textDecoration: 'none'
      }}
    >
      {/* Botanical Emblem */}
      <div 
        style={{
          width: isLarge ? '44px' : '36px',
          height: isLarge ? '44px' : '36px',
          borderRadius: '10px',
          backgroundColor: isLight ? '#103B27' : '#173F2A',
          border: '1.5px solid #D6A84F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
        }}
      >
        <svg width={isLarge ? "26" : "22"} height={isLarge ? "26" : "22"} viewBox="0 0 24 24" fill="none">
          <path d="M12 3C12 3 7 8 7 14C7 18 10 21 12 22C14 21 17 18 17 14C17 8 12 3 12 3Z" fill="#D6A84F" opacity="0.35"/>
          <path d="M12 6V20" stroke="#D6A84F" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M12 10C10 8.5 8 9.5 8 9.5" stroke="#FFFDF7" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 14C9.5 13 7.5 14.5 7.5 14.5" stroke="#FFFDF7" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 10C14 8.5 16 9.5 16 9.5" stroke="#FFFDF7" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 14C14.5 13 16.5 14.5 16.5 14.5" stroke="#FFFDF7" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: isLarge ? '1.45rem' : '1.15rem',
          letterSpacing: '-0.02em',
          color: isLight ? '#FFFDF7' : '#173F2A'
        }}>
          BKIG
        </div>
        {showSubtitle && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isLarge ? '0.72rem' : '0.64rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: isLight ? '#D6A84F' : '#667168'
          }}>
            Bharat Krishi Intelligence Grid
          </div>
        )}
      </div>
    </Link>
  );
};

export default Logo;
