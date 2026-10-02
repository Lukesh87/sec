import React, { useState } from 'react';
import { Radio, AlertCircle, ShieldAlert, Send, CheckCircle2, Sparkles, Globe, Filter } from 'lucide-react';
import { COMMUNITY_THREAT_ALERTS } from '../utils/sampleData';

export default function LiveThreatRadar() {
  const [threatList, setThreatList] = useState(COMMUNITY_THREAT_ALERTS);
  const [reportUrl, setReportUrl] = useState('');
  const [reportCategory, setReportCategory] = useState('SMS Phishing');
  const [reportNotes, setReportNotes] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportUrl.trim()) return;

    const newAlert = {
      id: `rep_${Date.now()}`,
      title: `⚠️ User Reported Threat: ${reportUrl.slice(0, 35)}...`,
      category: reportCategory,
      severity: 'HIGH',
      date: 'Just now (Community Submission)',
      details: reportNotes || 'Reported suspicious activity submitted by user community for AI review.',
      impactedServices: ['Community Network'],
      protectionTip: 'Exercise caution if interacting with links from this sender or domain.'
    };

    setThreatList([newAlert, ...threatList]);
    setReportUrl('');
    setReportNotes('');
    setReportSubmitted(true);
    setTimeout(() => setReportSubmitted(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Radio size={22} color="#00F2FE" style={{ animation: 'cyberPulse 2s infinite' }} />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Live Threat Radar & Community Feed</h2>
            </div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>
              Real-time threat intelligence advisories tracking active phishing waves, scam trends, and community reports.
            </p>
          </div>

          <span className="badge badge-cyan" style={{ fontSize: '0.75rem' }}>
            ● Radar Active • 24/7 Threat Monitoring
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Column 1: Live Threat Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Active Threat Advisories</h3>

          {threatList.map(alert => (
            <div 
              key={alert.id} 
              className="glass-panel" 
              style={{ padding: '20px', borderLeft: alert.severity === 'CRITICAL' ? '4px solid #EF4444' : '4px solid #F59E0B' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className={alert.severity === 'CRITICAL' ? 'badge badge-danger' : 'badge badge-warning'} style={{ fontSize: '0.65rem' }}>
                  {alert.severity} • {alert.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>{alert.date}</span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '6px', color: '#F8FAFC' }}>
                {alert.title}
              </h4>

              <p style={{ fontSize: '0.86rem', color: 'var(--text-sub)', lineHeight: '1.4', marginBottom: '12px' }}>
                {alert.details}
              </p>

              {alert.protectionTip && (
                <div style={{ background: 'rgba(0, 242, 254, 0.08)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.2)', fontSize: '0.82rem', color: '#38BDF8' }}>
                  <strong>Safety Tip:</strong> {alert.protectionTip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Column 2: Community Submission Form & Threat Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Submit Threat Form */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Send size={18} color="#00F2FE" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Report New Threat Link</h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', marginBottom: '16px' }}>
              Found a suspicious URL or scam text? Submit it to help update the TrustLens AI community intelligence model.
            </p>

            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '4px', display: 'block' }}>
                  Suspicious Link / Sender Phone:
                </label>
                <input
                  className="input-area"
                  type="text"
                  placeholder="e.g. http://fake-bank-login.top or +1800..."
                  value={reportUrl}
                  onChange={(e) => setReportUrl(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '4px', display: 'block' }}>
                  Scam Category:
                </label>
                <select
                  className="input-area"
                  value={reportCategory}
                  onChange={(e) => setReportCategory(e.target.value)}
                  style={{ background: '#090D16' }}
                >
                  <option value="SMS Phishing">SMS Phishing (Smishing)</option>
                  <option value="Email Scam">Email Phishing</option>
                  <option value="Social Media Fraud">Social Media Fraud</option>
                  <option value="Crypto Scam">Crypto / Prize Scam</option>
                  <option value="Impersonation">Brand / Executive Impersonation</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '4px', display: 'block' }}>
                  Additional Notes (Optional):
                </label>
                <textarea
                  className="input-area"
                  rows={3}
                  placeholder="Describe where you encountered this or what it claimed to be..."
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                />
              </div>

              <button className="btn-primary" type="submit" style={{ justifyContent: 'center' }}>
                <Send size={14} /> Submit Threat to Radar
              </button>

              {reportSubmitted && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34D399', fontSize: '0.85rem', marginTop: '6px' }}>
                  <CheckCircle2 size={16} color="#34D399" /> Threat report logged! Thank you for protecting the community.
                </div>
              )}
            </form>
          </div>

          {/* Threat Distribution Stats */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '14px' }}>
              Top Attack Vectors (This Week)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: 'SMS Package & Bank Smishing', pct: 45, color: '#EF4444' },
                { label: 'Email Credential Harvesting', pct: 30, color: '#F59E0B' },
                { label: 'QR Code (Quishing) Scams', pct: 15, color: '#00F2FE' },
                { label: 'Crypto & Prize Giveaways', pct: 10, color: '#A855F7' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-sub)' }}>{item.label}</span>
                    <strong style={{ color: '#F8FAFC' }}>{item.pct}%</strong>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${item.pct}%`, height: '100%', background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
