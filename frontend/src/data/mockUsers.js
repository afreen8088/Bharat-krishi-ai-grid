/**
 * Mock Users & Demo Authentication Data
 * NOTE: For frontend prototype & demonstration only.
 * In production, authentication and authorization are handled exclusively by the secure backend.
 */

export const DEMO_USERS = [
  {
    id: "BKIG-FARMER-001",
    mobile: "9876543210",
    name: "Rameshwar Patel",
    role: "farmer",
    state: "Karnataka",
    district: "Bengaluru Rural",
    taluk: "Doddaballapur",
    village: "Rajankunte",
    landArea: "4.2 Hectares",
    primaryCrop: "Ragi & Maize",
    aadhaarMasked: "XXXX-XXXX-4921",
    kisanCreditCard: "KCC-KA-88912",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "BKIG-OFFICER-001",
    mobile: "9123456789",
    name: "Dr. Ananya Sharma",
    role: "officer",
    designation: "Senior Agricultural Claims Assessor",
    officerId: "OFF-KA-8402",
    branch: "PMFBY Zonal Assessment Wing",
    department: "Department of Agriculture & Farmers Welfare",
    jurisdiction: "Southern Karnataka Zone",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
  }
];

export const DEMO_OTP = "123456";

/**
 * Validates credentials against demo users.
 * The user's role is strictly derived from the account record, never from client-side choice.
 */
export function authenticateDemoUser(mobile, otp) {
  const user = DEMO_USERS.find(u => u.mobile === mobile.trim());
  if (!user) {
    return { success: false, error: "Mobile number not recognized in demo directory. Try 9876543210 (Farmer) or 9123456789 (Officer)." };
  }
  if (otp !== DEMO_OTP) {
    return { success: false, error: "Invalid OTP. Use demo OTP: 123456" };
  }
  return { success: true, user };
}
