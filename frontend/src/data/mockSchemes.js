/**
 * Mock Government Agricultural Schemes Data
 * Sample curated records for demonstration.
 * Official links point to recognized national portals for verification.
 */

export const MOCK_SCHEME_CATEGORIES = [
  "All Categories",
  "Insurance",
  "Financial Assistance",
  "Equipment",
  "Irrigation & Soil",
  "Training & Organic"
];

export const MOCK_SCHEMES = [
  {
    id: "SCHEME-001",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    ministry: "Ministry of Agriculture and Farmers Welfare, Govt of India",
    category: "Insurance",
    state: "All India / National",
    summary: "Comprehensive risk insurance cover against non-preventable natural risks from pre-sowing to post-harvest stages.",
    subsidyDetails: "Farmer premium share: Kharif (2%), Rabi (1.5%), Commercial/Horticultural crops (5%). Rest subsidized by Central & State Govts.",
    eligibility: [
      "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
      "Valid land record (Pahani / RoR) or verified tenancy agreement.",
      "Must have enrolled before the seasonal cut-off deadline."
    ],
    benefits: [
      "Financial assistance against yield losses due to drought, dry spells, flood, inundation, pests & diseases.",
      "Prevented sowing / planting risk coverage.",
      "Post-harvest loss coverage up to 14 days for crops kept in 'cut & spread' condition in fields."
    ],
    documents: [
      "Aadhaar Card of the farmer",
      "Land Ownership Record (RoR / Pahani / 7/12 extract)",
      "Bank Account Passbook / Cancelled Cheque",
      "Sowing Certificate issued by Village Administrative Officer / Panchayat Secretary"
    ],
    steps: [
      "Visit the official PMFBY national portal or nearest Common Service Centre (CSC).",
      "Register using Aadhaar and mobile OTP verification.",
      "Select State, District, Taluk, Village, and Survey plot.",
      "Upload land certificate and sowing declaration.",
      "Pay nominal premium online via UPI or Net Banking to obtain policy certificate."
    ],
    officialUrl: "https://pmfby.gov.in",
    isPopular: true
  },
  {
    id: "SCHEME-002",
    title: "PM Kisan Samman Nidhi (PM-KISAN)",
    ministry: "Ministry of Agriculture and Farmers Welfare, Govt of India",
    category: "Financial Assistance",
    state: "All India / National",
    summary: "Direct income support of ₹6,000 per year in three equal 4-monthly installments directly transferred to farmer bank accounts.",
    subsidyDetails: "100% Central Government funded direct benefit transfer (DBT).",
    eligibility: [
      "Small and marginal landholder farmer families with cultivable land in their names.",
      "Institutional landholders and high-income taxpayers excluded under standard guidelines.",
      "Aadhaar-seeded bank account is mandatory."
    ],
    benefits: [
      "₹2,000 transferred every four months (April-July, August-November, December-March).",
      "Supplementary financial cushion for seed, fertilizer, and farm inputs."
    ],
    documents: [
      "Aadhaar Card",
      "Landholding documents with e-KYC validation",
      "Bank Account details linked with NPCI Aadhaar mapper"
    ],
    steps: [
      "Access the PM-Kisan portal 'Farmer Corner'.",
      "Choose 'New Farmer Registration' and enter Aadhaar details.",
      "Verify rural/urban residential status and land cadastral reference.",
      "Complete mandatory facial or biometric e-KYC."
    ],
    officialUrl: "https://pmkisan.gov.in",
    isPopular: true
  },
  {
    id: "SCHEME-003",
    title: "Sub-Mission on Agricultural Mechanization (SMAM)",
    ministry: "Department of Agriculture & Cooperation",
    category: "Equipment",
    state: "All India / National",
    summary: "Financial subsidies ranging from 40% to 50% for purchasing modern tractors, power tillers, rotavators, and harvesters.",
    subsidyDetails: "40% to 50% subsidy depending on farmer category (higher for SC/ST, women, and small/marginal farmers).",
    eligibility: [
      "Individual farmers, self-help groups (SHGs), and Farmer Producer Organizations (FPOs).",
      "Must not have availed mechanization subsidy on the same machinery category in the preceding 5 years."
    ],
    benefits: [
      "Subsidized access to high-efficiency tillage, sowing, and harvesting machinery.",
      "Assistance to establish Custom Hiring Centres (CHCs) in rural clusters."
    ],
    documents: [
      "Aadhaar & Voter ID",
      "Land Record copy",
      "Caste / Category certificate (where applicable)",
      "Quotation / Proforma invoice from empaneled machinery dealer"
    ],
    steps: [
      "Register on the Agri-Mechanization portal (agrimachinery.nic.in).",
      "Select desired machinery model and authorized dealer.",
      "Submit application and receive Department approval sanction order.",
      "Purchase machine; DBT subsidy is credited post physical verification."
    ],
    officialUrl: "https://agrimachinery.nic.in",
    isPopular: false
  },
  {
    id: "SCHEME-004",
    title: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) - Per Drop More Crop",
    ministry: "Ministry of Jal Shakti & Ministry of Agriculture",
    category: "Irrigation & Soil",
    state: "All India / National",
    summary: "Promotes micro-irrigation systems (drip and sprinkler) to maximize water efficiency, reduce pumping costs, and increase crop productivity.",
    subsidyDetails: "Up to 55% subsidy for small & marginal farmers and 45% for other farmers.",
    eligibility: [
      "All categories of farmers with confirmed access to assured irrigation water source.",
      "Minimum 0.2 hectare cultivable parcel."
    ],
    benefits: [
      "Saves up to 40-50% water while boosting yield by 20-30%.",
      "Reduces fertilizer leaching through precise fertigation integration."
    ],
    documents: [
      "Land Record (Pahani/RoR)",
      "Water source availability certificate / Electricity bill for pump",
      "Aadhaar card and soil test report copy"
    ],
    steps: [
      "Apply through the State Horticulture or Agriculture portal.",
      "Field officer inspects water source and land topography.",
      "Empaneled micro-irrigation vendor submits layout CAD diagram.",
      "Installation completed; joint verification undertaken prior to subsidy release."
    ],
    officialUrl: "https://pmksy.gov.in",
    isPopular: true
  },
  {
    id: "SCHEME-005",
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    ministry: "Department of Agriculture, Cooperation & Farmers Welfare",
    category: "Training & Organic",
    state: "All India / National",
    summary: "Supports cluster-based traditional and organic farming practices, bio-fertilizer usage, and PGS-India organic certification.",
    subsidyDetails: "Financial assistance of ₹50,000 per hectare over 3 years, of which ₹31,000 is directly provided for organic inputs.",
    eligibility: [
      "Farmer groups forming contiguous clusters of 20 or more hectares.",
      "Commitment to pesticide-free crop management."
    ],
    benefits: [
      "Free PGS-India organic certification for 3 years.",
      "Assistance for on-farm vermicompost production and bio-pesticide preparation.",
      "Marketing linkages with specialized organic FPOs and retail buyers."
    ],
    documents: [
      "Farmer group cluster declaration",
      "Individual Aadhaar cards of cluster members",
      "Cluster boundary GPS mapping document"
    ],
    steps: [
      "Form or join a local organic cluster with local Krishi Vigyan Kendra (KVK).",
      "Register cluster on the Jaivik Kheti portal.",
      "Undergo PGS peer-review training and soil organic carbon testing.",
      "Receive input support installments and annual certification."
    ],
    officialUrl: "https://pgsindia-ncof.gov.in",
    isPopular: false
  },
  {
    id: "SCHEME-006",
    title: "Kisan Credit Card (KCC) Scheme",
    ministry: "Ministry of Finance & Ministry of Agriculture",
    category: "Financial Assistance",
    state: "All India / National",
    summary: "Concessional institutional short-term credit for crop cultivation, post-harvest expenses, and animal husbandry at 4% effective interest.",
    subsidyDetails: "Base rate 7% with 3% prompt repayment incentive, reducing effective borrowing cost to 4% per annum up to ₹3 Lakhs.",
    eligibility: [
      "Owner cultivators, tenant farmers, sharecroppers, and self-help groups.",
      "Age between 18 and 75 years."
    ],
    benefits: [
      "Flexible revolving credit line with ATM-enabled RuPay debit card.",
      "No collateral required for loans up to ₹1.60 Lakh (extended to ₹3 Lakh for animal husbandry).",
      "Crop insurance coverage automatically tied to seasonal disbursements."
    ],
    documents: [
      "Filled KCC application form from bank branch",
      "Land cultivation record / Revenue entry",
      "Aadhaar and PAN card",
      "Passport size photos"
    ],
    steps: [
      "Approach your nearest public/private commercial bank, RRB, or Cooperative bank.",
      "Submit 1-page simplified KCC form.",
      "Bank processes credit appraisal and issues RuPay Kisan Credit Card within 14 days."
    ],
    officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
    isPopular: true
  }
];
