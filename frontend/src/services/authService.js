import { DEMO_USERS, DEMO_OTP, authenticateDemoUser } from '../data/mockUsers';
import apiClient, { IS_MOCK_MODE } from './apiClient';

/**
 * Authentication Service
 * Manages user authentication, OTP validation, and session lifecycle.
 */
export const authService = {
  /**
   * Request OTP for a given mobile number
   */
  async requestOtp(mobile, roleHint = 'farmer') {
    if (IS_MOCK_MODE) {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const cleanMobile = mobile.trim();
      const existing = DEMO_USERS.find(u => u.mobile === cleanMobile);
      
      if (!existing) {
        throw new Error(
          `Demo number not found. Please use 9876543210 (Farmer) or 9123456789 (Officer).`
        );
      }
      
      return {
        success: true,
        message: `Demo OTP is ${DEMO_OTP}. (Simulated SMS - No real SMS was dispatched)`,
        demoOtp: DEMO_OTP,
        maskedMobile: `+91 ${cleanMobile.slice(0, 2)}••••••${cleanMobile.slice(-2)}`
      };
    }

    // Backend endpoint (when backend auth is available)
    return apiClient.post('/api/v1/auth/request-otp', { mobile, role_hint: roleHint });
  },

  /**
   * Verify OTP and retrieve authenticated user profile
   * The authenticated user's authoritative role is determined ONLY by the server/database record.
   */
  async verifyOtp(mobile, otp) {
    if (IS_MOCK_MODE) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const res = authenticateDemoUser(mobile, otp);
      if (!res.success) {
        throw new Error(res.error);
      }
      return {
        user: res.user,
        token: `demo-token-${Date.now()}`
      };
    }

    return apiClient.post('/api/v1/auth/verify-otp', { mobile, otp });
  },

  /**
   * Fast Demo Login for quick testing & reviewers
   */
  async demoQuickLogin(role) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const targetUser = DEMO_USERS.find(u => u.role === role);
    if (!targetUser) {
      throw new Error(`No demo profile configured for role: ${role}`);
    }
    return {
      user: targetUser,
      token: `demo-token-${Date.now()}`
    };
  }
};

export default authService;
