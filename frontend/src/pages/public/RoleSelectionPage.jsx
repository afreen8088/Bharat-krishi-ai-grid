import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  ScrollText,
  Search,
  Check,
  ChevronRight
} from 'lucide-react';
import Logo from '../../components/branding/Logo';
import { useAuth } from '../../context/AuthContext';

export const RoleSelectionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, demoLogin } = useAuth();

  // If already authenticated, direct to authoritative dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      if (currentUser?.role === 'officer') {
        navigate('/officer/dashboard', { replace: true });
      } else {
        navigate('/farmer/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleSelectRole = (role) => {
    navigate('/login', { state: { role } });
  };

  const handleDirectDemo = async (role) => {
    const res = await demoLogin(role);
    if (res.success) {
      navigate(role === 'officer' ? '/officer/dashboard' : '/farmer/dashboard');
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-ivory-bg)',
        padding: 'clamp(2rem, 4vw, 4rem) var(--space-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: '960px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            <Logo variant="dark" size="large" />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-forest-green)', marginBottom: '0.75rem' }}>
            Select Your Workspace Role
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Choose the appropriate portal to enter Bharat Krishi Intelligence Grid. Authentication credentials will verify your access privileges.
          </p>
        </div>

        {/* Two Role Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-xl)',
            marginBottom: 'var(--space-2xl)'
          }}
        >
          {/* Card 1: Farmer */}
          <div 
            className="card card-hover"
            style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--color-warm-cream)',
              borderTop: '5px solid var(--color-forest-green)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-sage-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-forest-green)',
              marginBottom: 'var(--space-lg)'
            }}>
              <Sprout size={32} />
            </div>

            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-forest-green)', marginBottom: '0.5rem' }}>
              Farmer / Kisan
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Built for cultivators, tenant farmers, and agricultural producers seeking transparency and fair compensation.
            </p>

            {/* Feature Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: 'var(--space-xl)', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                <span>Submit crop loss insurance claims with photo evidence</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                <span>Track live claim status and assessment timelines</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                <span>Compare real-time mandi prices across regional APMCs</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-forest-green)" style={{ flexShrink: 0 }} />
                <span>Explore eligible central and state government schemes</span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                type="button"
                className="btn btn-primary"
                onClick={() => handleSelectRole('farmer')}
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <span>Continue to Farmer Login</span>
                <ArrowRight size={16} />
              </button>
              <button 
                type="button"
                className="btn btn-gold btn-sm"
                onClick={() => handleDirectDemo('farmer')}
                style={{ width: '100%' }}
              >
                <Sparkles size={14} />
                <span>Launch Farmer Demo Dashboard</span>
              </button>
            </div>
          </div>

          {/* Card 2: Insurance Officer */}
          <div 
            className="card card-hover"
            style={{
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--color-warm-cream)',
              borderTop: '5px solid var(--color-harvest-gold)',
              position: 'relative'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-harvest-gold)',
              marginBottom: 'var(--space-lg)'
            }}>
              <ShieldCheck size={32} />
            </div>

            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-forest-green)', marginBottom: '0.5rem' }}>
              Insurance Officer
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Dedicated portal for PMFBY insurance claim assessors, surveyors, and nodal agricultural officers.
            </p>

            {/* Feature Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: 'var(--space-xl)', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-harvest-gold)" style={{ flexShrink: 0 }} />
                <span>Review assigned claims in the centralized assessment queue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-primary)' }}>
                <CheckCircle2 size={18} color="var(--color-harvest-gold)" style={{ flexShrink: 0 }} />
                <span>Inspect AI risk scores, NDVI anomaly, and weather matches</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-harvest-gold)' }}>
                <CheckCircle2 size={18} color="var(--color-harvest-gold)" style={{ flexShrink: 0 }} />
                <span>Examine uploaded geotagged crop photographic evidence</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-harvest-gold)' }}>
                <CheckCircle2 size={18} color="var(--color-harvest-gold)" style={{ flexShrink: 0 }} />
                <span>Record formal claim decisions with mandatory audit remarks</span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                type="button"
                className="btn btn-primary"
                onClick={() => handleSelectRole('officer')}
                style={{ width: '100%', padding: '0.75rem' }}
              >
                <span>Continue to Officer Login</span>
                <ArrowRight size={16} />
              </button>
              <button 
                type="button"
                className="btn btn-outline-gold btn-sm"
                onClick={() => handleDirectDemo('officer')}
                style={{ width: '100%', color: 'var(--color-forest-green)', borderColor: 'var(--color-harvest-gold)' }}
              >
                <Sparkles size={14} />
                <span>Launch Officer Demo Review Queue</span>
              </button>
            </div>
          </div>
        </div>

        {/* Return home link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--color-forest-green)', fontWeight: 500 }}>
            &larr; Return to Public Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
