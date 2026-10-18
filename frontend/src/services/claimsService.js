import { INITIAL_MOCK_CLAIMS } from '../data/mockClaims';
import apiClient, { IS_MOCK_MODE } from './apiClient';

// Local in-memory session store so user actions (submitting claims, reviewing) persist during the test session
let sessionClaims = [...INITIAL_MOCK_CLAIMS];

export const claimsService = {
  /**
   * Retrieve claims with optional query filters
   */
  async getClaims(filters = {}) {
    if (IS_MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 350));
      let results = [...sessionClaims];

      if (filters.farmerId) {
        results = results.filter(c => c.farmer_id === filters.farmerId);
      }
      if (filters.status && filters.status !== 'all') {
        results = results.filter(c => c.status === filters.status);
      }
      if (filters.crop && filters.crop !== 'all') {
        results = results.filter(c => c.crop.toLowerCase().includes(filters.crop.toLowerCase()));
      }
      if (filters.riskLevel && filters.riskLevel !== 'all') {
        results = results.filter(c => c.risk_level === filters.riskLevel);
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        results = results.filter(c => 
          c.claim_id.toLowerCase().includes(query) ||
          c.farmer_name.toLowerCase().includes(query) ||
          c.crop.toLowerCase().includes(query) ||
          c.district.toLowerCase().includes(query)
        );
      }

      return {
        count: results.length,
        claims: results
      };
    }

    // Connect to real FastAPI backend
    const response = await apiClient.get('/api/v1/insurance/claims/');
    return response;
  },

  /**
   * Retrieve a single claim by its ID
   */
  async getClaimById(claimId) {
    if (IS_MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 300));
      const claim = sessionClaims.find(c => c.claim_id === claimId);
      if (!claim) {
        throw new Error(`Claim #${claimId} not found`);
      }
      return claim;
    }

    // In backend, get claim details
    const claimsRes = await apiClient.get('/api/v1/insurance/claims/');
    const claim = claimsRes.claims?.find(c => c.claim_id === claimId);
    if (!claim) {
      throw new Error(`Claim #${claimId} not found on server`);
    }
    return claim;
  },

  /**
   * Submit a new crop insurance claim
   */
  async createClaim(claimData) {
    if (IS_MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 700));

      const randomSuffix = Math.floor(100 + Math.random() * 900);
      const newClaimId = `BKIG-CLM-2026-${randomSuffix}`;

      // Simulate a synthetic AI assessment score based on claim reason & rainfall
      const simulatedRiskScore = Math.floor(15 + Math.random() * 45); // typically 15-60
      const riskLevel = simulatedRiskScore > 70 ? 'high' : simulatedRiskScore > 35 ? 'medium' : 'low';

      const newClaim = {
        claim_id: newClaimId,
        farmer_name: claimData.farmer_name || 'Rameshwar Patel',
        farmer_id: claimData.farmer_id || 'BKIG-FARMER-001',
        crop: claimData.crop || 'Ragi',
        crop_variety: claimData.crop_variety || 'High Yield Variety',
        district: claimData.district || 'Bengaluru Rural',
        taluk: claimData.taluk || 'Doddaballapur',
        village: claimData.village || 'Local Village',
        survey_number: claimData.survey_number || 'SY-NEW/01',
        area_hectares: parseFloat(claimData.area_hectares) || 2.0,
        claimed_amount: parseFloat(claimData.claimed_amount) || 40000,
        sowing_date: claimData.sowing_date || '2026-06-15',
        incident_date: claimData.incident_date || new Date().toISOString().split('T')[0],
        claim_reason: claimData.claim_reason || 'Crop damage due to unfavorable climatic conditions',
        status: 'submitted',
        created_at: new Date().toISOString(),
        risk_score: simulatedRiskScore,
        risk_level: riskLevel,
        ai_assessment: {
          model_version: 'BKIG-RF-v1.4 (Simulated)',
          prediction_date: new Date().toISOString(),
          rainfall_deficit: 'Calculated from demo IMD block baseline',
          ndvi_vegetation_index: '0.28 (Moderate vegetation index drop)',
          weather_satellite_match: 'Awaiting secondary ground radar check',
          inconsistencies: []
        },
        evidence_photos: claimData.evidence_photos || [],
        timeline: [
          {
            status: 'submitted',
            title: 'Claim Submitted (Demo Mode)',
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            note: 'Claim successfully logged in local session. Demo record generated.'
          }
        ],
        officer_notes: ''
      };

      // Prepend to session list
      sessionClaims = [newClaim, ...sessionClaims];
      return newClaim;
    }

    // Call real FastAPI backend
    return apiClient.post('/api/v1/insurance/claims/', {
      farmer_name: claimData.farmer_name,
      farmer_id: claimData.farmer_id,
      crop: claimData.crop,
      district: claimData.district,
      claimed_amount: parseFloat(claimData.claimed_amount)
    });
  },

  /**
   * Officer submits an evaluation decision (Approve, Reject, Needs More Info)
   */
  async submitOfficerReview(claimId, { decision, notes }) {
    if (IS_MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const targetIndex = sessionClaims.findIndex(c => c.claim_id === claimId);
      if (targetIndex === -1) {
        throw new Error(`Claim #${claimId} not found`);
      }

      // Map decision to claim status
      let newStatus = decision;
      if (decision === 'needs_more_information') {
        newStatus = 'under_review';
      }

      const updated = {
        ...sessionClaims[targetIndex],
        status: newStatus,
        officer_notes: notes,
        timeline: [
          ...sessionClaims[targetIndex].timeline,
          {
            status: newStatus,
            title: `Officer Decision: ${decision.replace(/_/g, ' ').toUpperCase()}`,
            date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            note: notes || 'Officer review record saved (Demo session).'
          }
        ]
      };

      sessionClaims[targetIndex] = updated;
      return {
        success: true,
        claim_id: claimId,
        decision,
        message: 'Review saved in local demo state. (No real database claim modified)'
      };
    }

    // Call FastAPI backend
    return apiClient.post(`/api/v1/officer/claims/${claimId}/review`, {
      decision,
      notes
    });
  }
};

export default claimsService;
