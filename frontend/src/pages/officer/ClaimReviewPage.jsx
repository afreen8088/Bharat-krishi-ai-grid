import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  MapPin, 
  Calendar, 
  Maximize2, 
  X, 
  FileText,
  User,
  Clock,
  Send,
  Sparkles
} from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import RiskBadge from '../../components/common/RiskBadge';
import ClaimTimeline from '../../components/common/ClaimTimeline';
import ConfirmModal from '../../components/common/ConfirmModal';
import LoadingState from '../../components/common/LoadingState';
import claimsService from '../../services/claimsService';

export const ClaimReviewPage = () => {
  const { claimId } = useParams();
  const navigate = useNavigate();

  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info'); // info, evidence, ai, decision, audit
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Review Decision Form State
  const [decision, setDecision] = useState('approved'); // approved, rejected, needs_more_information
  const [decisionNotes, setDecisionNotes] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [decisionFeedback, setDecisionFeedback] = useState(null);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    async function fetchClaimDetail() {
      setLoading(true);
      try {
        const data = await claimsService.getClaimById(claimId);
        setClaim(data);
        if (data.officer_notes) {
          setDecisionNotes(data.officer_notes);
        }
      } catch (err) {
        console.error('Failed to load claim detail:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchClaimDetail();
  }, [claimId]);

  const handleOpenDecisionModal = (selectedDecision) => {
    setDecision(selectedDecision);
    setValidationError('');
    setShowConfirmModal(true);
  };

  const handleConfirmDecision = async () => {
    if (!decisionNotes.trim()) {
      setValidationError('Please record assessor notes explaining your formal decision.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await claimsService.submitOfficerReview(claimId, {
        decision,
        notes: decisionNotes
      });

      // Reload updated claim
      const updated = await claimsService.getClaimById(claimId);
      setClaim(updated);
      setShowConfirmModal(false);
      setDecisionFeedback({
        decision,
        message: res.message || 'Review decision recorded in local demo session.'
      });
      setActiveTab('audit'); // Switch to audit history to view updated timeline
    } catch (err) {
      setValidationError(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingState message="Retrieving claim evidence and telemetry dossier..." />;
  }

  if (!claim) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
        <h2>Claim Not Found</h2>
        <p>No insurance claim matching #{claimId} was found in the review queue.</p>
        <Link to="/officer/queue" className="btn btn-primary">Back to Review Queue</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'info', label: 'Claim Information' },
    { id: 'evidence', label: `Photographic Evidence (${claim.evidence_photos?.length || 0})` },
    { id: 'ai', label: 'AI Risk Telemetry' },
    { id: 'decision', label: 'Review & Decision' },
    { id: 'audit', label: 'Audit Timeline' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
      {/* Header and Back navigation */}
      <div>
        <div style={{ marginBottom: '0.75rem' }}>
          <Link 
            to="/officer/queue"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--color-forest-green)', fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            <span>Back to Review Queue</span>
          </Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--color-forest-green)' }}>
                Audit Claim #{claim.claim_id}
              </h1>
              <span className="demo-pill">Officer Review</span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Farmer: <strong>{claim.farmer_name}</strong> ({claim.farmer_id}) &bull; Filed {new Date(claim.created_at).toLocaleDateString('en-GB')}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <RiskBadge level={claim.risk_level} score={claim.risk_score} />
            <StatusBadge status={claim.status} />
          </div>
        </div>
      </div>

      {/* Decision Success Notification (if any) */}
      {decisionFeedback && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-status-success-bg)',
            border: '1px solid var(--color-status-success-border)',
            color: 'var(--color-status-success)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} />
            <div>
              <strong>Decision Recorded: {decisionFeedback.decision.toUpperCase()}</strong>
              <div style={{ fontSize: '0.85rem' }}>{decisionFeedback.message}</div>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-icon" 
            onClick={() => setDecisionFeedback(null)}
            aria-label="Dismiss feedback"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div 
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid var(--color-border)',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: 600,
              fontSize: '0.92rem',
              cursor: 'pointer',
              borderBottom: activeTab === tab.id ? '3px solid var(--color-forest-green)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--color-forest-green)' : 'var(--color-text-secondary)',
              backgroundColor: 'transparent',
              marginBottom: '-2px',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: 1. Claim Information */}
      {activeTab === 'info' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '1.25rem' }}>
              Cultivator & Landholding Dossier
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>FARMER BENEFICIARY</span>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{claim.farmer_name}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>ID: {claim.farmer_id}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>CROP TYPE & VARIETY</span>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{claim.crop}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{claim.crop_variety || 'High Yield'}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>AFFECTED PLOT AREA</span>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{claim.area_hectares} Hectares</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>Cadastral Plot: {claim.survey_number}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>CLAIMED INDEMNITY</span>
                <div style={{ fontWeight: 700, fontSize: '1.35rem', color: 'var(--color-forest-green)' }}>
                  ₹{parseFloat(claim.claimed_amount).toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>SOWING DATE</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{claim.sowing_date}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>INCIDENT / LOSS DATE</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{claim.incident_date}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>SUBMISSION TIMESTAMP</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{new Date(claim.created_at).toLocaleString('en-GB')}</div>
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>REVENUE LOCATION</span>
                <div style={{ fontWeight: 600, marginTop: '2px' }}>{claim.village}, {claim.taluk}, {claim.district}</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>STATED REASON FOR CLAIM</span>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.95rem', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
                "{claim.claim_reason}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. Evidence */}
      {activeTab === 'evidence' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>
              Submitted Field Evidence Photographs
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Inspect geotagged crop photographs to verify visual damage consistency.
            </p>

            {claim.evidence_photos && claim.evidence_photos.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                {claim.evidence_photos.map((photo) => (
                  <div 
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      backgroundColor: 'var(--color-surface-white)'
                    }}
                    className="card-hover"
                  >
                    <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                      <img 
                        src={photo.url} 
                        alt={photo.caption || "Crop evidence"} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div 
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          opacity: 0,
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                      >
                        <Maximize2 size={24} />
                      </div>
                    </div>
                    <div style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-primary)' }}>
                      <strong>{photo.caption || 'Field Inspection Photo'}</strong>
                      {photo.uploaded_at && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Uploaded {new Date(photo.uploaded_at).toLocaleString('en-GB')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--color-text-muted)' }}>
                No photographic evidence was uploaded with this claim.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. AI Analysis */}
      {activeTab === 'ai' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {/* AI Banner Notice */}
          <div 
            style={{
              backgroundColor: 'var(--color-gold-light)',
              border: '1px solid var(--color-harvest-gold)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Sparkles size={20} color="var(--color-harvest-gold)" style={{ flexShrink: 0 }} />
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
              <strong>Demo Telemetry Assessment:</strong> These scores and satellite anomaly findings are synthesized for prototype review. They do not constitute an autonomous rejection or formal accusation of fraud.
            </div>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {/* Risk Gauge Card */}
            <div className="card">
              <h3 className="card-title" style={{ marginBottom: '1rem' }}>Risk Score Model Output</h3>

              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  fontSize: '3.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: claim.risk_level === 'high' ? 'var(--color-status-danger)' : claim.risk_level === 'medium' ? 'var(--color-status-warning)' : 'var(--color-status-success)'
                }}>
                  {claim.risk_score}%
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  <RiskBadge level={claim.risk_level} score={claim.risk_score} showScore={false} />
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '1rem' }}>
                  Derived via Random Forest classifier trained on block rainfall anomalies, cadastral hectares, and historical claim recurrence.
                </p>
              </div>

              {/* Inconsistencies List */}
              {claim.ai_assessment?.inconsistencies?.length > 0 ? (
                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-status-danger)' }}>
                    DETECTED SPECTRAL / TEMPORAL ANOMALIES:
                  </span>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-status-danger)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {claim.ai_assessment.inconsistencies.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-status-success)', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} />
                  <span>No cadastral boundary conflicts or NDVI reflectance contradictions detected.</span>
                </div>
              )}
            </div>

            {/* Satellite & Radar Telemetry Card */}
            <div className="card">
              <h3 className="card-title" style={{ marginBottom: '1rem' }}>Remote Sensing Telemetry</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                <div style={{ backgroundColor: 'var(--color-ivory-bg)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>BLOCK PRECIPITATION ANOMALY</span>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                    {claim.ai_assessment?.rainfall_deficit || 'Normal precipitation records'}
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-ivory-bg)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>NDVI VEGETATION VIGOR INDEX</span>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                    {claim.ai_assessment?.ndvi_vegetation_index || '0.35 (Typical crop cycle)'}
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--color-ivory-bg)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>DOPPLER RADAR CORRELATION</span>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '2px' }}>
                    {claim.ai_assessment?.weather_satellite_match || 'Telemetry matched'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. Review & Decision */}
      {activeTab === 'decision' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>
              Record Officer Review & Formal Sanction
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              Submit your formal administrative decision. All decisions require an assessor statement and are timestamped.
            </p>

            {/* Current Decision Notes */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" htmlFor="officer-notes">
                Assessor Review Remarks & Field Notes <span className="required">*</span>
              </label>
              <textarea
                id="officer-notes"
                className="form-textarea"
                rows={4}
                placeholder="Enter field assessment rationale, survey verification notes, or reasons for rejection..."
                value={decisionNotes}
                onChange={(e) => {
                  setDecisionNotes(e.target.value);
                  setValidationError('');
                }}
                required
              />
              <span className="form-hint">
                Mandatory notes describing the basis of approval, rejection, or inquiry.
              </span>
            </div>

            {validationError && (
              <div style={{ color: 'var(--color-status-danger)', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertCircle size={16} />
                <span>{validationError}</span>
              </div>
            )}

            {/* Three Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleOpenDecisionModal('approved')}
              >
                <CheckCircle2 size={16} />
                <span>Approve Claim</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleOpenDecisionModal('needs_more_information')}
              >
                <HelpCircle size={16} />
                <span>Request More Information</span>
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleOpenDecisionModal('rejected')}
              >
                <XCircle size={16} />
                <span>Reject Claim</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. Audit History */}
      {activeTab === 'audit' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <div className="card">
            <h3 className="card-title" style={{ marginBottom: '0.5rem' }}>
              Ordered Audit History & Event Timeline
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Audit events logged in prototype local state.
            </p>
            <ClaimTimeline events={claim.timeline} />
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title={`Confirm Decision: ${decision.replace(/_/g, ' ').toUpperCase()}`}
        description={`Are you sure you wish to mark Claim #${claim.claim_id} as "${decision.replace(/_/g, ' ')}"?`}
        confirmLabel="Confirm Decision"
        cancelLabel="Go Back"
        variant={decision === 'rejected' ? 'danger' : decision === 'approved' ? 'primary' : 'gold'}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirmDecision}
        onCancel={() => setShowConfirmModal(false)}
      >
        <div style={{ backgroundColor: 'var(--color-ivory-bg)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
          <strong>Assessor Note to be recorded:</strong>
          <p style={{ margin: '4px 0 0 0', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
            "{decisionNotes || '(No notes entered)'}"
          </p>
        </div>
      </ConfirmModal>

      {/* Image Preview Modal */}
      {selectedPhoto && (
        <div 
          className="modal-overlay" 
          onClick={() => setSelectedPhoto(null)}
          style={{ zIndex: 1100 }}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '800px',
              width: '90%',
              backgroundColor: '#000',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close preview"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                color: '#fff',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption || "Crop Evidence"} 
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimReviewPage;
