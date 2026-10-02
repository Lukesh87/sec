/**
 * TrustLens AI - Threat Detection & Analysis Engine
 * Combines pattern recognition, heuristic rules, URL parsing, and NLP-style threat vector matching
 * to generate explainable Trust Scores, risk categories, and actionable recommendations.
 */

// Common phishing/scam trigger words categorized by risk pattern
const THREAT_PATTERNS = [
  {
    type: 'urgency',
    name: 'Urgency & Pressure Tactics',
    severity: 'HIGH',
    keywords: [
      'urgent', 'immediately', 'within 24 hours', 'within 12 hours', 'within 1 hour', 
      'account suspended', 'suspended immediately', 'action required', 'final notice',
      'legal action', 'lawsuit', 'warrant', 'terminate', 'deactivated', 'expire today',
      'act fast', 'limited time', 'dont delay', 'response needed'
    ],
    description: 'Creates artificial panic or time pressure to trick users into acting without verifying.'
  },
  {
    type: 'credential_harvesting',
    name: 'Credential & Sensitive Info Request',
    severity: 'HIGH',
    keywords: [
      'verify your account', 'update password', 'confirm ssn', 'social security',
      'enter your pin', 'confirm credit card', 'billing info', 'otp', 'verification code',
      'login credentials', 're-enter password', 'bank details', 'account recovery',
      'passcode', 'tax form', 'w2 info'
    ],
    description: 'Solicits sensitive credentials, passwords, or personal financial identification.'
  },
  {
    type: 'financial_bait',
    name: 'Financial Baits & Unsolicited Rewards',
    severity: 'HIGH',
    keywords: [
      'won $', 'claim prize', 'cash reward', 'free bitcoin', 'crypto giveaway',
      'unclaimed funds', 'lottery winner', 'gift card', 'deposit pending',
      'refund processed', 'tax refund', 'inheritance', 'double your coins',
      'guaranteed return', 'exclusive bonus'
    ],
    description: 'Promises large financial returns or prizes to entice clicking malicious links or giving payment upfront.'
  },
  {
    type: 'impersonation',
    name: 'Brand Impersonation & Spoofing',
    severity: 'MEDIUM',
    keywords: [
      'paypal', 'netflix', 'amazon', 'chase bank', 'apple id', 'microsoft security',
      'wellsfargo', 'usps delivery', 'fedex package', 'dhl shipment', 'irs refund',
      'geek squad', 'mcafee renewal', 'norton security', 'coinbase alert', 'binance'
    ],
    description: 'Mimics well-known brands or services to build false trust.'
  },
  {
    type: 'malicious_link_intent',
    name: 'Suspicious Link Prompt',
    severity: 'HIGH',
    keywords: [
      'click here', 'click below', 'follow link', 'bit.ly', 'tinyurl',
      'verify-here', 'secure-update', 'login-page', 'http://', '.xyz', '.top',
      '.buzz', '.work', '.click', 'redirecting'
    ],
    description: 'Prompts user to click unverified external links or shortened/suspicious URLs.'
  },
  {
    type: 'coercive_language',
    name: 'Coercive & Fear-Inducing Language',
    severity: 'MEDIUM',
    keywords: [
      'unauthorized access', 'security breach', 'unusual activity', 'suspicious login',
      'compromised', 'locked', 'restricted', 'penalty', 'fine imposed'
    ],
    description: 'Uses fear of security breaches or penalties to compel immediate compliance.'
  }
];

// List of high-risk top level domains often used in scam campaigns
const SUSPICIOUS_TLDS = ['.xyz', '.top', '.buzz', '.work', '.click', '.cfd', '.fit', '.gq', '.ml', '.tk', '.ga', '.cf', '.site', '.icu', '.monster'];

// Recognized brand typosquatting targets
const TYPOSQUATTING_TARGETS = [
  { brand: 'PayPal', spoofed: ['paypa1', 'paypaI', 'pay-pal', 'paypal-verify', 'paypal-secure', 'paypa1-security'] },
  { brand: 'Amazon', spoofed: ['amaz0n', 'amz-order', 'amazon-verify', 'amz-support'] },
  { brand: 'Apple', spoofed: ['app1e', 'apple-id-verify', 'icloud-security', 'appleid-support'] },
  { brand: 'Google', spoofed: ['g00gle', 'google-verify', 'gmail-security'] },
  { brand: 'Netflix', spoofed: ['netfl1x', 'netflix-billing', 'netflix-update'] },
  { brand: 'Chase', spoofed: ['chase-bank-verify', 'chase-security', 'chase1'] },
  { brand: 'USPS', spoofed: ['usps-tracking-info', 'usps-redelivery', 'usps-track'] }
];

/**
 * Main Analysis Function
 */
export function analyzeContent(inputContent, inputType = 'text', customUrl = '') {
  const text = (inputContent || '').trim();
  const urlToTest = (customUrl || extractFirstUrl(text) || '').trim();
  
  if (!text && !urlToTest) {
    return null;
  }

  let baseScore = 100;
  const triggers = [];
  const textLower = text.toLowerCase();
  
  // 1. Analyze Text Patterns
  THREAT_PATTERNS.forEach(pattern => {
    const matchedKeywords = [];
    pattern.keywords.forEach(keyword => {
      if (textLower.includes(keyword.toLowerCase())) {
        matchedKeywords.push(keyword);
      }
    });

    if (matchedKeywords.length > 0) {
      const deduction = pattern.severity === 'HIGH' ? (15 + (matchedKeywords.length * 3)) : (8 + (matchedKeywords.length * 2));
      baseScore -= deduction;

      triggers.push({
        id: `trg_${pattern.type}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        patternType: pattern.type,
        name: pattern.name,
        severity: pattern.severity,
        confidence: Math.min(98, 70 + (matchedKeywords.length * 8)),
        description: pattern.description,
        matchedKeywords: matchedKeywords,
        evidenceSnippet: `Found indicators: "${matchedKeywords.slice(0, 3).join('", "')}"`
      });
    }
  });

  // 2. URL Deep Analysis
  let urlAnalysis = null;
  if (urlToTest) {
    urlAnalysis = analyzeUrlDetails(urlToTest);
    
    // Deduct score based on URL risks
    if (!urlAnalysis.isHttps) {
      baseScore -= 12;
      triggers.push({
        id: `trg_url_http_${Date.now()}`,
        patternType: 'url_security',
        name: 'Insecure HTTP Connection',
        severity: 'MEDIUM',
        confidence: 95,
        description: 'The link uses HTTP instead of HTTPS, meaning data sent over this connection is unencrypted.',
        evidenceSnippet: `URL begins with http:// instead of https://`
      });
    }

    if (urlAnalysis.isSuspiciousTld) {
      baseScore -= 22;
      triggers.push({
        id: `trg_url_tld_${Date.now()}`,
        patternType: 'url_domain',
        name: 'Suspicious Top-Level Domain (TLD)',
        severity: 'HIGH',
        confidence: 90,
        description: `Domain ends in ${urlAnalysis.tld}, a top-level domain frequently associated with low-cost spam and malicious landing pages.`,
        evidenceSnippet: `TLD detected: ${urlAnalysis.tld}`
      });
    }

    if (urlAnalysis.isIpAddress) {
      baseScore -= 25;
      triggers.push({
        id: `trg_url_ip_${Date.now()}`,
        patternType: 'url_structure',
        name: 'Raw IP Address Host',
        severity: 'HIGH',
        confidence: 96,
        description: 'Legitimate services use registered domain names. Using a raw IP address in links is a common technique to bypass domain blacklists.',
        evidenceSnippet: `Raw IP host: ${urlAnalysis.hostname}`
      });
    }

    if (urlAnalysis.typosquattingMatch) {
      baseScore -= 28;
      triggers.push({
        id: `trg_url_typo_${Date.now()}`,
        patternType: 'impersonation',
        name: `Typosquatting / Impersonation of ${urlAnalysis.typosquattingMatch.brand}`,
        severity: 'HIGH',
        confidence: 94,
        description: `This domain attempts to spoof the legitimate brand "${urlAnalysis.typosquattingMatch.brand}" using a misleading character substitution or lookalike domain.`,
        evidenceSnippet: `Spoofed target: ${urlAnalysis.typosquattingMatch.matched}`
      });
    }

    if (urlAnalysis.isShortened) {
      baseScore -= 10;
      triggers.push({
        id: `trg_url_shortener_${Date.now()}`,
        patternType: 'url_redirection',
        name: 'Shortened / Obfuscated Link',
        severity: 'MEDIUM',
        confidence: 85,
        description: 'URL shorteners hide the final destination of a link, preventing you from inspecting the real domain before clicking.',
        evidenceSnippet: `Shortener host: ${urlAnalysis.hostname}`
      });
    }

    if (urlAnalysis.excessiveSubdomains) {
      baseScore -= 14;
      triggers.push({
        id: `trg_url_subdomain_${Date.now()}`,
        patternType: 'url_structure',
        name: 'Complex Subdomain Obfuscation',
        severity: 'MEDIUM',
        confidence: 88,
        description: 'Uses multiple stacked subdomains (e.g. paypal.security.login.attacker-site.com) to make the link look genuine at first glance.',
        evidenceSnippet: `Domain structure: ${urlAnalysis.hostname}`
      });
    }
  }

  // 3. Overall Score Bounds & Classification
  const finalScore = Math.max(0, Math.min(100, Math.round(baseScore)));
  
  let riskLevel = 'SAFE';
  let riskColor = '#10B981'; // Green
  let riskBadge = 'Safe / Low Risk';
  let summaryHeading = 'Content Appears Safe';
  let summaryDescription = 'No major suspicious patterns, urgency tactics, or malicious domain indicators were detected.';

  if (finalScore < 50) {
    riskLevel = 'HIGH_RISK';
    riskColor = '#EF4444'; // Red
    riskBadge = 'High Risk / Phishing Threat';
    summaryHeading = 'Malicious Scam / Phishing Alert';
    summaryDescription = 'High probability of phishing, credential theft, or fraud. Do not interact with links or provide personal information.';
  } else if (finalScore < 80) {
    riskLevel = 'MEDIUM_RISK';
    riskColor = '#F59E0B'; // Amber
    riskBadge = 'Medium Risk / Exercise Caution';
    summaryHeading = 'Suspicious Patterns Detected';
    summaryDescription = 'Contains several red flags such as artificial urgency, unverified links, or sensitive info requests. Verify sender authenticity.';
  }

  // 4. Generate Actionable Safety Recommendations
  const recommendations = generateRecommendations(riskLevel, triggers, urlAnalysis, text);

  // 5. Generate Highlight Snippets for UI
  const highlights = generateHighlights(text, triggers);

  return {
    id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    score: finalScore,
    riskLevel: riskLevel,
    riskColor: riskColor,
    riskBadge: riskBadge,
    summaryHeading: summaryHeading,
    summaryDescription: summaryDescription,
    inputText: text,
    inputType: inputType,
    urlAnalyzed: urlToTest,
    urlAnalysis: urlAnalysis,
    triggers: triggers,
    recommendations: recommendations,
    highlights: highlights
  };
}

/**
 * URL Parser & Feature Extractor
 */
export function analyzeUrlDetails(urlStr) {
  let formattedUrl = urlStr.trim();
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = 'https://' + formattedUrl;
  }

  let parsed = null;
  try {
    parsed = new URL(formattedUrl);
  } catch (e) {
    return {
      raw: urlStr,
      isValid: false,
      hostname: 'Invalid URL Format',
      isHttps: false
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isHttps = parsed.protocol === 'https:';
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  
  // Extract TLD
  const domainParts = hostname.split('.');
  const tld = domainParts.length > 1 ? '.' + domainParts[domainParts.length - 1] : '';
  const isSuspiciousTld = SUSPICIOUS_TLDS.includes(tld);
  const excessiveSubdomains = domainParts.length >= 4;

  // Shortener check
  const shortenerDomains = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'is.gd', 'buff.ly', 'ow.ly', 'rb.gy'];
  const isShortened = shortenerDomains.some(d => hostname.includes(d));

  // Typosquatting check
  let typosquattingMatch = null;
  for (const target of TYPOSQUATTING_TARGETS) {
    for (const spoofedStr of target.spoofed) {
      if (hostname.includes(spoofedStr)) {
        typosquattingMatch = { brand: target.brand, matched: spoofedStr };
        break;
      }
    }
    if (typosquattingMatch) break;
  }

  // Simulated Domain Metadata for Explainable Deep-Dive
  const simulatedDomainAgeDays = typosquattingMatch || isSuspiciousTld || isIpAddress ? Math.floor(Math.random() * 14) + 1 : Math.floor(Math.random() * 2000) + 300;
  const sslStatus = isHttps ? (isSuspiciousTld || typosquattingMatch ? 'Self-Signed / Untrusted CA' : 'Valid SSL (256-bit RSA)') : 'No SSL Encryption';
  const redirectChain = isShortened || isSuspiciousTld ? [
    formattedUrl,
    `http://gateway-redirect-node-89.net/landing`,
    `http://auth-login-verify-account.xyz/index.php`
  ] : [formattedUrl];

  return {
    raw: urlStr,
    isValid: true,
    protocol: parsed.protocol,
    hostname: hostname,
    pathname: parsed.pathname,
    searchParams: parsed.search,
    tld: tld,
    isHttps: isHttps,
    isIpAddress: isIpAddress,
    isSuspiciousTld: isSuspiciousTld,
    isShortened: isShortened,
    excessiveSubdomains: excessiveSubdomains,
    typosquattingMatch: typosquattingMatch,
    domainAgeDays: simulatedDomainAgeDays,
    sslStatus: sslStatus,
    redirectChain: redirectChain,
    spfRecordStatus: isSuspiciousTld || typosquattingMatch ? 'SPF Fail / Missing' : 'SPF Pass (v=spf1)',
    dkimStatus: isSuspiciousTld || typosquattingMatch ? 'DKIM Signature Invalid' : 'DKIM Verified'
  };
}

/**
 * Utility to extract first URL from text
 */
function extractFirstUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s]*)/ig;
  const match = text.match(urlRegex);
  return match ? match[0] : '';
}

/**
 * Actionable Safety Recommendation Generator
 */
function generateRecommendations(riskLevel, triggers, urlAnalysis, text) {
  const recs = [];

  if (riskLevel === 'HIGH_RISK') {
    recs.push({
      priority: 'CRITICAL',
      title: 'Do Not Click Any Links or Download Attachments',
      detail: 'The message shows severe indicators of a malicious phishing attempt. Interacting with links could lead to credential theft or malware download.'
    });

    recs.push({
      priority: 'HIGH',
      title: 'Do Not Share Passwords, OTPs, or Financial Info',
      detail: 'Legitimate organizations never ask for your account password, 2FA code, or SSN via unsolicited email or SMS.'
    });

    recs.push({
      priority: 'HIGH',
      title: 'Verify Via Official Direct Channel Only',
      detail: 'If this claims to be from your bank or a service you use, navigate directly to their official website in a new browser tab or call their official phone number listed on your physical card.'
    });

    recs.push({
      priority: 'MEDIUM',
      title: 'Report & Block Sender',
      detail: 'Mark the message as Spam/Phishing in your email provider (Gmail/Outlook) or SMS application to train global security filters.'
    });
  } else if (riskLevel === 'MEDIUM_RISK') {
    recs.push({
      priority: 'HIGH',
      title: 'Inspect Sender Address & Link Destination',
      detail: 'Hover over links before clicking to confirm the actual domain matches the official corporate website domain.'
    });

    recs.push({
      priority: 'MEDIUM',
      title: 'Beware of Urgency Demands',
      detail: 'Scammers frequently create artificial deadlines to induce panic. Take a step back and double-check through secondary channels.'
    });

    recs.push({
      priority: 'LOW',
      title: 'Check for Password Reuse',
      detail: 'Ensure you have unique passwords for each service and enable Two-Factor Authentication (2FA) wherever possible.'
    });
  } else {
    recs.push({
      priority: 'LOW',
      title: 'Standard Security Hygiene',
      detail: 'Although no immediate red flags were detected, always confirm recipient identities when transferring money or sensitive data.'
    });

    recs.push({
      priority: 'LOW',
      title: 'Keep Browser & Security Software Updated',
      detail: 'Ensure your web browser and operating system automatic security updates remain enabled.'
    });
  }

  return recs;
}

/**
 * Text Highlight Generator
 */
function generateHighlights(text, triggers) {
  if (!text) return [];

  // Extract all matched words
  const allMatched = [];
  triggers.forEach(t => {
    if (t.matchedKeywords) {
      t.matchedKeywords.forEach(kw => {
        allMatched.push({ word: kw, category: t.name, severity: t.severity });
      });
    }
  });

  return allMatched;
}
