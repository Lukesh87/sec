/**
 * TrustLens AI - Presets, Quiz Scenarios, and Cyber Threat Intelligence Data
 */

export const PRESET_EXAMPLES = [
  {
    id: 'preset_bank_urgent',
    title: '🚨 Fake Bank Suspicious Activity Alert',
    type: 'Email / SMS',
    targetBrand: 'Chase Bank (Spoofed)',
    expectedRisk: 'HIGH',
    content: `URGENT SECURITY ALERT: Unauthorized attempt to withdraw $2,450.00 detected on your Chase Account. Your online access will be TEMPORARILY SUSPENDED within 24 hours unless you re-verify your credentials immediately. 
Click here to confirm your identity: http://chase-bank-verify-identity.xyz/login?ref=8910`,
    url: 'http://chase-bank-verify-identity.xyz/login?ref=8910'
  },
  {
    id: 'preset_parcel_delivery',
    title: '📦 USPS Parcel Redelivery Scam',
    type: 'SMS Message',
    targetBrand: 'USPS (Spoofed)',
    expectedRisk: 'HIGH',
    content: `USPS NOTICE: Your package tracking #US9402910 could not be delivered due to an incorrect address. A fee of $1.99 is required for redelivery. Please update your details within 12 hours or item will be returned to sender: http://usps-redelivery-update.click/track`,
    url: 'http://usps-redelivery-update.click/track'
  },
  {
    id: 'preset_crypto_giveaway',
    title: '💎 Elon Musk / Crypto Double Scam',
    type: 'Social / DM',
    targetBrand: 'Crypto Giveaway',
    expectedRisk: 'HIGH',
    content: `SPECIAL CELEBRATION GIVEAWAY! Send between 0.1 ETH to 5 ETH to our official promotional vault address and receive DOUBLE (2X) back immediately! Limited time remaining: 00:14:32. Claim prize now at https://bit.ly/3xXCryptoBonus`,
    url: 'https://bit.ly/3xXCryptoBonus'
  },
  {
    id: 'preset_legit_google',
    title: '✅ Legitimate Google Security Verification',
    type: 'Email',
    targetBrand: 'Google Account',
    expectedRisk: 'SAFE',
    content: `Security Alert for your connected Google Account (user@example.com). A new sign-in was detected on a Windows PC in Seattle, WA. If this was you, no action is needed. If you didn't sign in, check your account activity at https://myaccount.google.com/notifications.`,
    url: 'https://myaccount.google.com/notifications'
  },
  {
    id: 'preset_netflix_billing',
    title: '🎬 Netflix Membership Payment Suspended',
    type: 'Email',
    targetBrand: 'Netflix (Spoofed)',
    expectedRisk: 'HIGH',
    content: `Your Netflix subscription payment failed! We were unable to process your monthly charge of $15.99. Your streaming account is locked. Update your billing credit card details immediately to avoid cancellation: http://netfl1x-billing-update.top/account`,
    url: 'http://netfl1x-billing-update.top/account'
  },
  {
    id: 'preset_legit_order',
    title: '✅ Legitimate Amazon Order Confirmation',
    type: 'Email',
    targetBrand: 'Amazon Store',
    expectedRisk: 'SAFE',
    content: `Thank you for your order! Order #112-9481029-48201. Estimated delivery: Thursday, Oct 5. You can view your order status or manage your account anytime by logging in directly at https://www.amazon.com/your-orders.`,
    url: 'https://www.amazon.com/your-orders'
  }
];

export const CYBER_QUIZ_SCENARIOS = [
  {
    id: 'quiz_1',
    category: 'Smishing (SMS Phishing)',
    sender: '+1 (800) 555-0192 (SMS)',
    headline: 'Urgent Delivery Failure Notice',
    content: 'USPS: Package 89201 failed delivery address check. Pay $0.99 redelivery fee at http://usps-track-parcel.xyz within 4 hours or package is destroyed.',
    isScam: true,
    correctChoiceExplanation: 'Classic Smishing Scam! Red flags include: 1) Urgent deadline threat ("within 4 hours"), 2) Unofficial domain (.xyz instead of usps.com), 3) Demanding small fee to harvest your credit card number.',
    keyRedFlags: ['Suspicious .xyz TLD', 'Artificial Urgency', 'Credit Card Fee Trap']
  },
  {
    id: 'quiz_2',
    category: 'Phishing Email',
    sender: 'no-reply@accounts.google.com',
    headline: 'Security Alert: New Sign-in',
    content: 'Your Google Account was logged into from a new Chrome device in San Jose, California. Review activity at https://myaccount.google.com/device-activity.',
    isScam: false,
    correctChoiceExplanation: 'Legitimate Notice! Red flags check: 1) Sender domain is official (@accounts.google.com), 2) Link leads directly to official domain (myaccount.google.com), 3) Does not demand instant password input or threaten immediate deletion.',
    keyRedFlags: []
  },
  {
    id: 'quiz_3',
    category: 'Spear Phishing / Business Email',
    sender: 'ceo-office@company-corp-internal.top',
    headline: 'CONFIDENTIAL: Urgent Wire Transfer Request',
    content: 'Hi Team, I am currently stuck in a board meeting and cannot take calls. Need $5,000 processed to supplier ASAP. Send wire details immediately to this email.',
    isScam: true,
    correctChoiceExplanation: 'CEO Impersonation Scam (BEC)! Red flags: 1) Claims inability to speak on phone, 2) High-urgency financial transaction, 3) Domain uses suspicious .top TLD instead of actual company domain.',
    keyRedFlags: ['Impersonation of Executive', 'Suspicious .top TLD', 'Urgent Wire Transfer Request']
  },
  {
    id: 'quiz_4',
    category: 'Social Media / QR Code Scam',
    sender: 'Instagram Support DM',
    headline: 'Copyright Infringement Notice',
    content: 'Your account has violated trademark policies. Scan this QR code or visit http://instagr-copyright-appeal.site within 24h to avoid permanent account deletion.',
    isScam: true,
    correctChoiceExplanation: 'Quishing & Instagram Scam! Meta/Instagram communicates copyright warnings in official app settings/email, never via direct message or suspicious .site links.',
    keyRedFlags: ['DM Copyright Threat', 'Suspicious .site TLD', 'Fear tactic']
  }
];

export const COMMUNITY_THREAT_ALERTS = [
  {
    id: 'alert_1',
    title: '⚠️ Wave of SMS Scam Targeting Postal Customers (.xyz Domains)',
    category: 'SMS Phishing',
    severity: 'HIGH',
    date: 'Updated 2 hours ago',
    details: 'Attractors sending fake package redelivery SMS messages pointing to .xyz and .click domains demanding small $1.99 card verification fees.',
    impactedServices: ['USPS', 'FedEx', 'DHL'],
    protectionTip: 'Never click parcel links in text messages. Track packages directly on the official postal carrier app or website.'
  },
  {
    id: 'alert_2',
    title: '🚨 Fake AI Voice & Family Emergency Impersonation Scams',
    category: 'Social Engineering',
    severity: 'CRITICAL',
    date: 'Updated 5 hours ago',
    details: 'Scammers using short audio clips from social media to clone voices of family members claiming they are in an emergency and need urgent wire transfers.',
    impactedServices: ['WhatsApp', 'Phone Calls', 'Telegram'],
    protectionTip: 'Establish a secret family passcode phrase that only close relatives know to verify identity before transferring funds.'
  },
  {
    id: 'alert_3',
    title: '⚠️ Fake IRS & State Tax Refund Phishing Emails',
    category: 'Financial Phishing',
    severity: 'MEDIUM',
    date: 'Updated 1 day ago',
    details: 'Emails promising unexpected tax rebates or claiming tax calculation errors, linking to fake IRS login portals.',
    impactedServices: ['IRS', 'State Tax Portals'],
    protectionTip: 'The IRS never initiates contact with taxpayers by email, text messages, or social media channels to request personal or financial information.'
  }
];

export const INITIAL_SCAN_HISTORY = [
  {
    id: 'scan_hist_1',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    formattedDate: 'Today, 10:15 AM',
    inputText: 'URGENT: Your Chase account is locked due to suspicious activity. Verify now at http://chase-bank-verify-identity.xyz',
    urlAnalyzed: 'http://chase-bank-verify-identity.xyz',
    score: 18,
    riskLevel: 'HIGH_RISK',
    riskBadge: 'High Risk / Phishing Threat',
    riskColor: '#EF4444',
    summaryHeading: 'Malicious Phishing Attempt Detected',
    triggersCount: 4,
    source: 'Email'
  },
  {
    id: 'scan_hist_2',
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    formattedDate: 'Yesterday, 4:30 PM',
    inputText: 'Security Alert: New sign-in detected on your Google Account from Chrome on Windows.',
    urlAnalyzed: 'https://myaccount.google.com/notifications',
    score: 95,
    riskLevel: 'SAFE',
    riskBadge: 'Safe / Low Risk',
    riskColor: '#10B981',
    summaryHeading: 'Content Appears Safe',
    triggersCount: 0,
    source: 'URL Scan'
  },
  {
    id: 'scan_hist_3',
    timestamp: new Date(Date.now() - 3600000 * 42).toISOString(),
    formattedDate: 'Oct 1, 2026',
    inputText: 'Your package is awaiting redelivery. Update your address at http://usps-redelivery-update.click',
    urlAnalyzed: 'http://usps-redelivery-update.click',
    score: 28,
    riskLevel: 'HIGH_RISK',
    riskBadge: 'High Risk / Phishing Threat',
    riskColor: '#EF4444',
    summaryHeading: 'Malicious Phishing Attempt Detected',
    triggersCount: 3,
    source: 'SMS'
  }
];
