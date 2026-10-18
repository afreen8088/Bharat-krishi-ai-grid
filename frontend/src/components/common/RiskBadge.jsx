import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

export const RiskBadge = ({ level = 'low', score = null, showScore = true }) => {
  const normLevel = (level || '').toLowerCase();

  const config = {
    low: {
      label: 'Low Risk',
      className: 'badge-low',
      icon: ShieldCheck,
      color: '#2A6F4E'
    },
    medium: {
      label: 'Medium Risk',
      className: 'badge-medium',
      icon: AlertTriangle,
      color: '#B87B14'
    },
    high: {
      label: 'High Risk',
      className: 'badge-high',
      icon: ShieldAlert,
      color: '#B53A35'
    }
  }[normLevel] || {
    label: level || 'Assessing',
    className: 'badge-low',
    icon: ShieldCheck,
    color: '#2A6F4E'
  };

  const Icon = config.icon;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <span className={`badge ${config.className}`}>
        <Icon size={12} strokeWidth={2.2} />
        <span>{config.label}</span>
        {showScore && score !== null && (
          <span style={{ 
            marginLeft: '2px', 
            opacity: 0.9, 
            fontWeight: 700 
          }}>
            ({score}%)
          </span>
        )}
      </span>
      <span 
        title="Simulated output for prototype review only"
        style={{
          fontSize: '0.65rem',
          color: 'var(--color-text-muted)',
          backgroundColor: '#EDEAE1',
          padding: '1px 5px',
          borderRadius: '4px',
          fontWeight: 600
        }}
      >
        DEMO
      </span>
    </div>
  );
};

export default RiskBadge;
