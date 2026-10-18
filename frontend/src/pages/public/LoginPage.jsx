import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Phone, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import Logo from '../../components/branding/Logo';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { demoLogin, isAuthenticated, currentUser } = useAuth();

  // Selected role tab for visual context
  const [selectedRole, setSelectedRole] = useState(location.state?.role || 'farmer');
  const [mobile, setMobile] = useState(selectedRole === 'officer' ? '9123456789' : '9876543210');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to appropriate portal
  React.useEffect(() => {
    if (isAuthenticated) {
      const dest = currentUser?.role === 'officer' ? '/officer/dashboard' : '/farmer/dashboard';
      navigate(dest, { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleRoleTabChange = (role) => {
    setSelectedRole(role);
    setError('');
    // Auto-fill convenience demo number for the tab
    if (role === 'officer') {
      setMobile('9123456789');
    } else {
      setMobile('9876543210');
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Mobile Validation: 10 digits
    const cleanedMobile = mobile.trim();
    if (!/^[6-9]\d{9}$/.test(cleanedMobile)) {
      setError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    if (!password) {
      setError('Please enter your account password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const otpResponse = await authService.requestOtp(cleanedMobile, selectedRole);
      // Navigate to OTP verification page with mobile and masked number
      navigate('/verify-otp', {
        state: {
          mobile: cleanedMobile,
          maskedMobile: otpResponse.maskedMobile,
          demoOtp: otpResponse.demoOtp,
          roleHint: selectedRole
        }
      });
    } catch (err) {
      setError(err.message || 'Unable to generate verification code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Instant Quick Demo Login helper
  const handleQuickDemo = async (role) => {
    setError('');
    setIsSubmitting(true);
    try {
      const res = await demoLogin(role);
      if (res.success) {
        navigate(role === 'officer' ? '/officer/dashboard' : '/farmer/dashboard');
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--color-ivory-bg)' }}>
      {/* Left Storytelling Visual Panel (Desktop only) */}
      <div 
        className="login-visual-panel"
        style={{
          flex: 1,
          backgroundColor: 'var(--color-deep-green)',
          color: '#FFFDF7',
          padding: 'clamp(2rem, 4vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'radial-gradient(rgba(214, 168, 79, 0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      >
        <div>
          <Logo variant="light" size="large" />
          <div style={{ marginTop: '3.5rem', maxWidth: '480px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-harvest-gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              National Agricultural Grid
            </span>
            <h1 style={{ fontSize: '2.5rem', marginTop: '0.75rem', marginBottom: '1.25rem', color: '#FFFDF7' }}>
              Fair Insurance. Real Prices. Direct Schemes.
            </h1>
            <p style={{ color: '#DDE4D0', fontSize: '1.05rem', lineHeight: 1.6 }}>
              A unified digital infrastructure connecting India's agricultural backbone with automated telemetry, verified mandi data, and institutional transparency.
            </p>
          </div>
        </div>

        {/* Demo Credentials Box */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 253, 247, 0.08)',
            border: '1px solid rgba(214, 168, 79, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            backdropFilter: 'blur(6px)',
            maxWidth: '480px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
            <Sparkles size={16} color="var(--color-harvest-gold)" />
            <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-harvest-gold)' }}>
              Prototype Demonstration Accounts
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#DDE4D0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div><strong>Farmer:</strong> Mobile <code>9876543210</code> &bull; OTP <code>123456</code></div>
            <div><strong>Insurance Officer:</strong> Mobile <code>9123456789</code> &bull; OTP <code>123456</code></div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '8px' }}>
            <button 
              type="button" 
              className="btn btn-gold btn-sm"
              onClick={() => handleQuickDemo('farmer')}
              disabled={isSubmitting}
            >
              1-Click Demo Farmer
            </button>
            <button 
              type="button" 
              className="btn btn-outline-gold btn-sm"
              onClick={() => handleQuickDemo('officer')}
              disabled={isSubmitting}
              style={{ color: '#FFFDF7', borderColor: '#D6A84F' }}
            >
              1-Click Demo Officer
            </button>
          </div>
        </div>

        <div style={{ fontSize: '0.78rem', color: '#8E9990' }}>
          &copy; {new Date().getFullYear()} Bharat Krishi Intelligence Grid &bull; Department of Agriculture & Farmers Welfare
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1.5rem, 3vw, 3rem)'
        }}
      >
        <div 
          className="card"
          style={{
            maxWidth: '460px',
            width: '100%',
            backgroundColor: 'var(--color-warm-cream)',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Mobile Logo representation */}
          <div style={{ marginBottom: '1.5rem' }} className="mobile-logo-wrap">
            <Logo variant="dark" />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-forest-green)', marginBottom: '0.4rem' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            Sign in to access your agricultural intelligence workspace.
          </p>

          {/* Role Switcher Tabs */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              padding: '4px',
              backgroundColor: 'var(--color-ivory-bg)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              border: '1px solid var(--color-border)'
            }}
          >
            <button
              type="button"
              onClick={() => handleRoleTabChange('farmer')}
              style={{
                padding: '0.55rem',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedRole === 'farmer' ? 'var(--color-forest-green)' : 'transparent',
                color: selectedRole === 'farmer' ? 'var(--color-warm-cream)' : 'var(--color-text-secondary)'
              }}
            >
              Farmer Portal
            </button>
            <button
              type="button"
              onClick={() => handleRoleTabChange('officer')}
              style={{
                padding: '0.55rem',
                borderRadius: 'var(--radius-xs)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedRole === 'officer' ? 'var(--color-forest-green)' : 'transparent',
                color: selectedRole === 'officer' ? 'var(--color-warm-cream)' : 'var(--color-text-secondary)'
              }}
            >
              Insurance Officer
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-status-danger-bg)',
                border: '1px solid var(--color-status-danger-border)',
                color: 'var(--color-status-danger)',
                fontSize: '0.85rem',
                marginBottom: '1.25rem'
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>{error}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSendOtp}>
            {/* Mobile Number */}
            <div className="form-group">
              <label className="form-label" htmlFor="login-mobile">
                Mobile Number <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <span 
                  style={{
                    position: 'absolute',
                    left: '12px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'var(--color-forest-green)',
                    pointerEvents: 'none'
                  }}
                >
                  +91
                </span>
                <input
                  id="login-mobile"
                  type="tel"
                  className="form-input"
                  style={{ paddingLeft: '50px' }}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              <span className="form-hint">
                {selectedRole === 'farmer' ? 'Demo Farmer: 9876543210' : 'Demo Officer: 9123456789'}
              </span>
            </div>

            {/* Password */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="login-password">
                  Password <span className="required">*</span>
                </label>
                <span 
                  style={{ fontSize: '0.78rem', color: 'var(--color-forest-green)', cursor: 'pointer' }}
                  onClick={() => alert('Demo mode: You can enter any password (e.g. demo123) or use 1-Click Demo buttons.')}
                >
                  Forgot Password?
                </span>
              </div>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon-left" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter account password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="input-icon-right btn-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  style={{ padding: '4px' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending Verification...' : 'Send OTP Verification'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Role Selection Directory Link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>New to BKIG or want to compare roles? </span>
            <Link to="/role-selection" style={{ fontWeight: 600, color: 'var(--color-forest-green)' }}>
              Choose Role Directory
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .login-visual-panel {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .mobile-logo-wrap {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
