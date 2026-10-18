import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  TrendingUp, 
  ScrollText, 
  ArrowRight, 
  Play, 
  X, 
  Sprout, 
  CheckCircle2,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export const LandingPage = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div 
      style={{ 
        backgroundColor: '#F7F1E3', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        color: '#172A21',
        fontFamily: "var(--font-body)",
        overflowX: 'hidden'
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section 
        style={{
          position: 'relative',
          padding: 'clamp(2.5rem, 5vw, 4.5rem) 0 clamp(3rem, 6vw, 5rem)',
          backgroundColor: '#F7F1E3',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative botanical flourish in background */}
        <div 
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(221, 228, 208, 0.45) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0
          }} 
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2.5rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
            className="hero-grid"
          >
            {/* Left Column */}
            <div style={{ maxWidth: '580px' }}>
              {/* Eyebrow & Harvest Gold Line */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '1.25rem'
                }}
              >
                <span 
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: '#173F2A',
                    textTransform: 'uppercase'
                  }}
                >
                  AI-POWERED INSIGHTS
                </span>
                <span 
                  style={{
                    width: '46px',
                    height: '2px',
                    backgroundColor: '#D6A84F',
                    display: 'inline-block',
                    borderRadius: '1px'
                  }} 
                />
              </div>

              {/* Main Heading */}
              <h1 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 'clamp(2.6rem, 4.5vw, 4.1rem)',
                  lineHeight: 1.12,
                  color: '#173F2A',
                  fontWeight: 700,
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Empowering<br />
                Farmers Today<br />
                for a <span style={{ color: '#D6A84F', fontStyle: 'italic' }}>Brighter</span><br />
                Tomorrow
              </h1>

              {/* Supporting Text */}
              <p 
                style={{
                  fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
                  color: '#4A554D',
                  lineHeight: 1.65,
                  marginBottom: '2.25rem',
                  maxWidth: '520px'
                }}
              >
                AI-driven crop insurance, real-time market prices and government schemes — built for every farmer.
              </p>

              {/* CTA Group: Get Started + Watch Video */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginBottom: '2.5rem'
                }}
              >
                <Link 
                  to="/role-selection" 
                  className="btn btn-primary btn-lg"
                  style={{
                    backgroundColor: '#173F2A',
                    color: '#F7F1E3',
                    border: '1px solid #173F2A',
                    padding: '0.85rem 1.95rem',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1.02rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 14px rgba(23, 63, 42, 0.22)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>

                <button 
                  onClick={() => setVideoModalOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 0.75rem',
                    color: '#173F2A',
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}
                  aria-label="Watch Video Introduction"
                >
                  <span 
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      border: '2px solid #173F2A',
                      backgroundColor: '#FFFDF7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(23, 63, 42, 0.12)',
                      transition: 'transform 0.2s ease'
                    }}
                    className="play-icon-circle"
                  >
                    <Play size={16} fill="#173F2A" color="#173F2A" style={{ marginLeft: '2px' }} />
                  </span>
                  <span>Watch Video</span>
                </button>
              </div>

              {/* Tagline */}
              <div 
                style={{
                  borderLeft: '3px solid #D6A84F',
                  paddingLeft: '1.15rem',
                  fontFamily: "var(--font-heading)",
                  fontStyle: 'italic',
                  color: '#103B27',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}
              >
                “Healthy Farms. Prosperous Farmers. A Stronger Bharat.”
              </div>
            </div>

            {/* Right Column: Realistic Farmer Visual with Organic Boundary */}
            <div 
              style={{ 
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '1.5rem',
                paddingRight: '1rem'
              }}
            >
              {/* Handwritten-style Tagline Overlay at Upper-Right */}
              <div 
                className="handwritten-tagline"
                style={{
                  position: 'absolute',
                  top: '-15px',
                  right: '15px',
                  zIndex: 6,
                  fontFamily: "var(--font-cursive)",
                  fontSize: '1.55rem',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  textAlign: 'right',
                  transform: 'rotate(2.5deg)',
                  filter: 'drop-shadow(0 2px 4px rgba(247, 241, 227, 0.9))',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ color: '#A64B2A' }}>Healthy Farms</div>
                <div style={{ color: '#173F2A' }}>Prosperous Farmers</div>
                <div style={{ color: '#D6A84F' }}>A Stronger Bharat</div>
              </div>

              {/* Organic Curved Container for Farmer Image */}
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '520px',
                  height: '490px',
                  borderRadius: '42% 58% 62% 38% / 46% 44% 56% 54%',
                  overflow: 'hidden',
                  boxShadow: '0 24px 50px rgba(23, 63, 42, 0.16)',
                  border: '8px solid rgba(255, 253, 247, 0.85)',
                  backgroundColor: '#DDE4D0',
                  transition: 'border-radius 0.4s ease'
                }}
                className="organic-hero-shape"
              >
                <img 
                  src="/images/farmer-hero.jpg" 
                  alt="Indian farmer viewed from behind standing in lush green agricultural field at warm sunset"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 40%',
                    display: 'block'
                  }}
                  loading="eager"
                />

                {/* Subtle warm organic gradient overlay blending into base */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(247, 241, 227, 0.05) 0%, rgba(23, 63, 42, 0.25) 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Cream Information Card Overlay at Lower-Right */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '10px',
                  backgroundColor: '#FFFDF7',
                  borderRadius: '16px',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 12px 28px rgba(23, 63, 42, 0.16)',
                  border: '1.5px solid #E8DFCE',
                  zIndex: 5,
                  maxWidth: '300px'
                }}
              >
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: '#EEF3E6',
                    border: '1px solid #DDE4D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Sprout size={22} color="#173F2A" />
                </div>
                <div 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: '#173F2A',
                    lineHeight: 1.25
                  }}
                >
                  Better Insights for Better Decisions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Feature Cards Section */}
      <section 
        id="features" 
        style={{ 
          padding: 'clamp(3rem, 6vw, 5.5rem) 0', 
          backgroundColor: '#F7F1E3'
        }}
      >
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.25rem)',
              alignItems: 'stretch'
            }}
          >
            {/* Card 1: Soft Sage Treatment — Crop Insurance Fraud Detection */}
            <div 
              style={{
                backgroundColor: '#EDF3E7',
                border: '1.5px solid #D2DEC6',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 6px 20px rgba(23, 63, 42, 0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              className="feature-card"
            >
              {/* Subtle Botanical SVG Motif in Corner */}
              <svg 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '54px',
                  height: '54px',
                  opacity: 0.18,
                  pointerEvents: 'none'
                }}
                viewBox="0 0 48 48"
                fill="none"
              >
                <path d="M24 4C24 4 12 16 12 28C12 34 17 40 24 44C31 40 36 34 36 28C36 16 24 4 24 4Z" fill="#173F2A" />
                <path d="M24 10V40" stroke="#173F2A" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Square Rounded Icon */}
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#DFEBD5',
                  border: '1px solid #CBDABF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.35rem'
                }}
              >
                <ShieldCheck size={28} color="#173F2A" />
              </div>

              {/* Title */}
              <h3 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#173F2A',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25
                }}
              >
                Crop Insurance Fraud Detection
              </h3>

              {/* Text */}
              <p 
                style={{
                  color: '#4E5A51',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: '1.75rem'
                }}
              >
                Fair and transparent claim assessment using AI.
              </p>

              {/* Circular Arrow Button */}
              <div>
                <Link 
                  to="/farmer/submit-claim" 
                  aria-label="Crop Insurance Fraud Detection"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#173F2A',
                    color: '#F7F1E3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    boxShadow: '0 3px 8px rgba(23, 63, 42, 0.2)'
                  }}
                  className="arrow-circle-btn"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Card 2: Cream/Gold Treatment — Mandi Price Intelligence */}
            <div 
              style={{
                backgroundColor: '#FAF4E6',
                border: '1.5px solid #EADBBA',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 6px 20px rgba(214, 168, 79, 0.08)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              className="feature-card"
            >
              {/* Subtle Botanical SVG Motif */}
              <svg 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '54px',
                  height: '54px',
                  opacity: 0.22,
                  pointerEvents: 'none'
                }}
                viewBox="0 0 48 48"
                fill="none"
              >
                <path d="M24 6C24 6 16 14 16 24C16 30 20 36 24 40C28 36 32 30 32 24C32 14 24 6 24 6Z" fill="#D6A84F" />
                <path d="M24 10V38" stroke="#D6A84F" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Square Rounded Icon */}
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#F5EBCE',
                  border: '1px solid #E5D5AE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.35rem'
                }}
              >
                <TrendingUp size={28} color="#C5963E" />
              </div>

              {/* Title */}
              <h3 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#173F2A',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25
                }}
              >
                Mandi Price Intelligence
              </h3>

              {/* Text */}
              <p 
                style={{
                  color: '#555F55',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: '1.75rem'
                }}
              >
                Compare market prices and choose the best selling option.
              </p>

              {/* Circular Arrow Button */}
              <div>
                <Link 
                  to="/farmer/mandi-prices" 
                  aria-label="Mandi Price Intelligence"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#173F2A',
                    color: '#F7F1E3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    boxShadow: '0 3px 8px rgba(23, 63, 42, 0.2)'
                  }}
                  className="arrow-circle-btn"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Card 3: Warm Beige / Terracotta Treatment — Government Scheme Finder */}
            <div 
              style={{
                backgroundColor: '#FAF0EB',
                border: '1.5px solid #ECCDC1',
                borderRadius: '20px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: '0 6px 20px rgba(166, 75, 42, 0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              className="feature-card"
            >
              {/* Subtle Botanical SVG Motif */}
              <svg 
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '54px',
                  height: '54px',
                  opacity: 0.2,
                  pointerEvents: 'none'
                }}
                viewBox="0 0 48 48"
                fill="none"
              >
                <path d="M24 6C24 6 14 16 14 26C14 32 18 38 24 42C30 38 34 32 34 26C34 16 24 6 24 6Z" fill="#A64B2A" />
                <path d="M24 10V38" stroke="#A64B2A" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Square Rounded Icon */}
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  backgroundColor: '#F5DFD5',
                  border: '1px solid #E8C8BA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.35rem'
                }}
              >
                <ScrollText size={28} color="#A64B2A" />
              </div>

              {/* Title */}
              <h3 
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#173F2A',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25
                }}
              >
                Government Scheme Finder
              </h3>

              {/* Text */}
              <p 
                style={{
                  color: '#555550',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: '1.75rem'
                }}
              >
                Find schemes you are eligible for with ease.
              </p>

              {/* Circular Arrow Button */}
              <div>
                <Link 
                  to="/farmer/schemes" 
                  aria-label="Government Scheme Finder"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#173F2A',
                    color: '#F7F1E3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease, background-color 0.2s ease',
                    boxShadow: '0 3px 8px rgba(23, 63, 42, 0.2)'
                  }}
                  className="arrow-circle-btn"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section 
        id="impact" 
        style={{ 
          padding: 'clamp(3rem, 6vw, 5.5rem) 0 clamp(4rem, 7vw, 6.5rem)',
          backgroundColor: '#F7F1E3'
        }}
      >
        <div className="container">
          <div 
            style={{
              position: 'relative',
              backgroundColor: '#DDE4D0',
              borderRadius: '28px',
              padding: 'clamp(2.5rem, 5vw, 4.5rem) clamp(2rem, 4vw, 4rem)',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(23, 63, 42, 0.08)',
              border: '1.5px solid #CCD5BD'
            }}
            className="vision-card"
          >
            {/* Botanical Decoration around Edges */}
            <svg 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '160px',
                height: '160px',
                opacity: 0.22,
                pointerEvents: 'none'
              }}
              viewBox="0 0 160 160"
              fill="none"
            >
              <path d="M0 0 C40 20, 70 60, 90 120 C60 100, 30 70, 0 0 Z" fill="#173F2A" />
              <path d="M0 0 C30 40, 50 90, 60 150 C40 110, 20 60, 0 0 Z" fill="#D6A84F" />
            </svg>

            <svg 
              style={{
                position: 'absolute',
                bottom: 0,
                left: '30%',
                width: '140px',
                height: '90px',
                opacity: 0.18,
                pointerEvents: 'none'
              }}
              viewBox="0 0 140 90"
              fill="none"
            >
              <path d="M0 90 C30 60, 60 40, 100 20 C80 50, 50 80, 0 90 Z" fill="#173F2A" />
            </svg>

            {/* Grid for Vision text and Rural Landscape Imagery */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1
              }}
            >
              {/* Left Side: Label, Heading, Supporting Paragraph */}
              <div style={{ maxWidth: '580px' }}>
                {/* Small Label "OUR VISION" with Gold Line */}
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '1rem'
                  }}
                >
                  <span 
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: '#173F2A',
                      textTransform: 'uppercase'
                    }}
                  >
                    OUR VISION
                  </span>
                  <span 
                    style={{
                      width: '46px',
                      height: '2px',
                      backgroundColor: '#D6A84F',
                      display: 'inline-block',
                      borderRadius: '1px'
                    }} 
                  />
                </div>

                {/* Heading */}
                <h2 
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 'clamp(2.1rem, 3.8vw, 3.2rem)',
                    lineHeight: 1.18,
                    color: '#173F2A',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.02em'
                  }}
                >
                  Stronger Farmers<br />
                  A Better Bharat
                </h2>

                {/* Supporting Paragraph */}
                <p 
                  style={{
                    fontSize: 'clamp(1.02rem, 1.6vw, 1.15rem)',
                    color: '#284534',
                    lineHeight: 1.7,
                    marginBottom: '2rem'
                  }}
                >
                  Bringing data, technology, and agricultural insights together to create a transparent, accountable, and prosperous future for every farmer across India.
                </p>

                {/* Direct Action Link */}
                <Link 
                  to="/about"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: '0.98rem',
                    color: '#173F2A',
                    paddingBottom: '2px',
                    borderBottom: '2px solid #D6A84F'
                  }}
                >
                  <span>Learn more about our architecture</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right Side: Rural Landscape Imagery along the bottom-right */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative'
                }}
              >
                <div 
                  style={{
                    width: '100%',
                    maxWidth: '460px',
                    height: '320px',
                    borderRadius: '24px 60px 30px 50px',
                    overflow: 'hidden',
                    boxShadow: '0 16px 36px rgba(23, 63, 42, 0.15)',
                    border: '5px solid rgba(255, 253, 247, 0.7)'
                  }}
                  className="rural-landscape-container"
                >
                  <img 
                    src="/images/rural-landscape.jpg" 
                    alt="Scenic rural Indian agricultural landscape with green terraced farming and rolling hills"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Walkthrough */}
      {videoModalOpen && (
        <div 
          className="modal-overlay"
          onClick={() => setVideoModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(16, 59, 39, 0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFDF7',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '640px',
              width: '100%',
              boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
              border: '1px solid #E8DFCE',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setVideoModalOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#173F2A',
                padding: '4px'
              }}
              aria-label="Close video walkthrough"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#EEF3E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sprout size={20} color="#173F2A" />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '1.35rem', color: '#173F2A' }}>
                Bharat Krishi Intelligence Grid Overview
              </h3>
            </div>

            <p style={{ color: '#4A554D', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Experience how BKIG unifies satellite telemetry, historical weather indices, and transparent mandi intelligence for Indian agriculture.
            </p>

            {/* Video Preview Card */}
            <div 
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#103B27',
                color: '#FFFDF7',
                padding: '2rem 1.5rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
                position: 'relative',
                border: '1px solid #D6A84F'
              }}
            >
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#D6A84F',
                  color: '#173F2A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}
              >
                <Play size={24} fill="#173F2A" style={{ marginLeft: '3px' }} />
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                BKIG Architecture & Interactive Walkthrough
              </div>
              <div style={{ fontSize: '0.85rem', color: '#DDE4D0', maxWidth: '420px', margin: '0 auto' }}>
                Simulating automated NDVI vegetative analysis, local rainfall verification, and direct farmer welfare subsidies.
              </div>
            </div>

            {/* Feature Bullets */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#172A21' }}>
                <CheckCircle2 size={16} color="#2A6F4E" />
                <span>AI Fraud Assessment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#172A21' }}>
                <CheckCircle2 size={16} color="#2A6F4E" />
                <span>Live Multistate Mandis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#172A21' }}>
                <CheckCircle2 size={16} color="#2A6F4E" />
                <span>Welfare Scheme Finder</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#172A21' }}>
                <CheckCircle2 size={16} color="#2A6F4E" />
                <span>100% Objective Decisions</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setVideoModalOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Close
              </button>
              <Link 
                to="/role-selection"
                className="btn btn-primary btn-sm"
                onClick={() => setVideoModalOpen(false)}
                style={{ backgroundColor: '#173F2A', color: '#F7F1E3' }}
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Responsive and Hover Style Enhancements */}
      <style>{`
        .play-icon-circle:hover {
          transform: scale(1.08);
          background-color: #F7F1E3 !important;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(23, 63, 42, 0.1) !important;
        }
        .arrow-circle-btn:hover {
          transform: scale(1.08);
          background-color: #103B27 !important;
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .handwritten-tagline {
            position: relative !important;
            top: 0 !important;
            right: 0 !important;
            margin-bottom: 0.75rem !important;
            text-align: center !important;
            transform: none !important;
          }
          .organic-hero-shape {
            height: 380px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
