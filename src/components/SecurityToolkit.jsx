import React, { useState } from 'react';
import { Wrench, Shield, Globe, Lock, Key, CheckSquare, Sparkles, HelpCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { analyzeUrlDetails } from '../utils/aiAnalysisEngine';

export default function SecurityToolkit() {
  const [testDomain, setTestDomain] = useState('paypa1-security-check.xyz');
  const [domainResult, setDomainResult] = useState(null);
  
  // Password entropy test
  const [testPassword, setTestPassword] = useState('');

  const handleInspectDomain = () => {
    if (!testDomain.trim()) return;
    const res = analyzeUrlDetails(testDomain);
    setDomainResult(res);
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: '#64748B' };
    let score = 0;
    if (pass.length >= 8) score += 20;
    if (pass.length >= 12) score += 25;
    if (/[A-Z]/.test(pass)) score += 15;
    if (/[0-9]/.test(pass)) score += 20;
    if (/[^A-Za-z0-9]/.test(pass)) score += 20;

    if (score >= 80) return { score, label: 'Strong & Leak Resistant', color: '#10B981' };
    if (score >= 50) return { score, label: 'Moderate', color: '#F59E0B' };
    return { score, label: 'Weak / Highly Vulnerable', color: '#EF4444' };
  };

  const passStrength = getPasswordStrength(testPassword);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Wrench size={22} color="#00F2FE" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Digital Safety & Cyber Toolkit</h2>
            </div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>
              Essential utilities designed for students, non-technical users, and security enthusiasts to inspect domains, evaluate passwords, and learn cybersecurity hygiene.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Tool 1: Instant Domain & TLD Inspector */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe size={20} color="#00F2FE" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Instant Domain Inspector</h3>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
            Enter any web domain name to check top-level domain risk, SSL validity, and typosquatting flags.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              className="input-area"
              type="text"
              placeholder="e.g. paypa1-security.xyz"
              value={testDomain}
              onChange={(e) => setTestDomain(e.target.value)}
              style={{ fontSize: '0.88rem' }}
            />

            <button className="btn-primary" onClick={handleInspectDomain} style={{ padding: '10px 16px' }}>
              Inspect
            </button>
          </div>

          {domainResult && (
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-glass)', marginTop: '8px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '8px' }}>Domain Inspection Results:</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Hostname:</span>
                  <code style={{ fontFamily: 'var(--font-mono)', color: '#00F2FE' }}>{domainResult.hostname}</code>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>TLD Risk:</span>
                  <span style={{ color: domainResult.isSuspiciousTld ? '#F87171' : '#34D399', fontWeight: '700' }}>
                    {domainResult.tld} {domainResult.isSuspiciousTld ? '(High Risk TLD)' : '(Standard)'}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>SSL Certificate:</span>
                  <span style={{ color: domainResult.isHttps ? '#34D399' : '#F87171', fontWeight: '600' }}>
                    {domainResult.sslStatus}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-sub)' }}>Est. Domain Age:</span>
                  <span style={{ color: domainResult.domainAgeDays < 30 ? '#F87171' : '#38BDF8', fontWeight: '600' }}>
                    {domainResult.domainAgeDays} Days
                  </span>
                </div>

                {domainResult.typosquattingMatch && (
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '8px 12px', borderRadius: '6px', color: '#F87171', marginTop: '4px' }}>
                    ⚠️ Typosquatting Trigger: Spoofing {domainResult.typosquattingMatch.brand}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tool 2: Password Entropy & Breach Safety Advisor */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={20} color="#FBBF24" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Password Strength Advisor</h3>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>
            Test password complexity offline. TrustLens AI checks entropy without saving or sending data anywhere.
          </p>

          <input
            className="input-area"
            type="password"
            placeholder="Type sample password to test strength..."
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
          />

          {testPassword && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-sub)' }}>Strength Rating:</span>
                <strong style={{ color: passStrength.color }}>{passStrength.label}</strong>
              </div>

              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${passStrength.score}%`, height: '100%', background: passStrength.color, transition: 'all 0.3s ease' }} />
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', marginTop: '4px' }}>
                💡 Tip: Use a passphrase of 4 random words (e.g. <code>ocean-battery-purple-cabin</code>) for maximum security and ease of memory.
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Digital Safety Checklist */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <CheckSquare size={20} color="#10B981" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Personal Digital Safety Checklist</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Enable 2FA Everywhere', desc: 'Use an authenticator app (e.g. Google Authenticator or Aegis) rather than SMS where possible.' },
            { title: 'Verify Link Destinations', desc: 'Hover over hyperlinks to confirm the true web address matches the official company domain.' },
            { title: 'Never Share 2FA OTP Codes', desc: 'No customer support representative or automated service will ever ask for your 6-digit login pin.' },
            { title: 'Beware of High Urgency', desc: 'If a message claims your account will be deleted in 24 hours, take a breath and navigate directly to the app or official site.' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#00F2FE', marginBottom: '4px' }}>
                {idx + 1}. {item.title}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
