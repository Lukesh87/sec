import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Search, Sparkles, 
  ExternalLink, ArrowRight, CheckCircle2, Copy, Check, Lock, 
  Globe, AlertCircle, RefreshCw, Eye, FileText, ChevronDown, ChevronUp, Download
} from 'lucide-react';
import { analyzeContent } from '../utils/aiAnalysisEngine';
import { PRESET_EXAMPLES } from '../utils/sampleData';

export default function ThreatAnalyzer({ onSaveScan, initialInput = '' }) {
  const [inputText, setInputText] = useState(initialInput);
  const [customUrl, setCustomUrl] = useState('');
  const [inputType, setInputType] = useState('text'); // 'text' | 'url'
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [copiedAdvice, setCopiedAdvice] = useState(false);
  const [showDomainDetails, setShowDomainDetails] = useState(true);
  const [selectedPresetId, setSelectedPresetId] = useState('');

  // Scanning steps animation labels
  const SCAN_STEPS = [
    'Parsing message semantics & urgency markers...',
    'Evaluating domain trust, TLD risk, and typosquatting...',
    'Checking credential harvesting & financial bait vectors...',
    'Computing explainable Trust Score & recommendations...'
  ];

  // Run initial scan if initialInput provided
  useEffect(() => {
    if (initialInput) {
      handleRunScan(initialInput);
    }
  }, [initialInput]);

  const handleRunScan = (textToScan = inputText, urlToScan = customUrl) => {
    const textVal = (textToScan || '').trim();
    if (!textVal && !urlToScan) return;

    setIsScanning(true);
    setScanStep(0);
    setScanResult(null);

    // Step animation sequence
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep < SCAN_STEPS.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        const result = analyzeContent(textVal, inputType, urlToScan);
        setScanResult(result);
        setIsScanning(false);
        if (onSaveScan && result) {
          onSaveScan(result);
        }
      }
    }, 450);
  };

  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    setInputText(preset.content);
    setCustomUrl(preset.url || '');
    handleRunScan(preset.content, preset.url);
  };

  const handleClear = () => {
    setInputText('');
    setCustomUrl('');
    setScanResult(null);
    setSelectedPresetId('');
  };

  const handleCopyReport = () => {
    if (!scanResult) return;
    const summaryText = `TrustLens AI Scan Report
Trust Score: ${scanResult.score}/100 (${scanResult.riskBadge})
Verdict: ${scanResult.summaryHeading}
Analyzed: ${scanResult.inputText || scanResult.urlAnalyzed}

Key Threat Indicators:
${scanResult.triggers.map(t => `- [${t.severity}] ${t.name}: ${t.description}`).join('\n')}

Actionable Safety Steps:
${scanResult.recommendations.map(r => `- ${r.title}: ${r.detail}`).join('\n')}`;

    navigator.clipboard.writeText(summaryText);
    setCopiedAdvice(true);
    setTimeout(() => setCopiedAdvice(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero Header */}
      <div className="glass-panel" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(17, 23, 38, 0.9) 0%, rgba(9, 13, 22, 0.95) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-cyan">
                <Sparkles size={12} color="#00F2FE" /> AI Cyber Guardian
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Real-time Explainable Risk Engine</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>
              Analyze Messages, Emails & URLs for Online Threats
            </h2>
            <p style={{ color: 'var(--text-sub)', maxWidth: '700px', marginTop: '6px', fontSize: '0.95rem' }}>
              Paste suspicious SMS text messages, emails, or links below. TrustLens AI breaks down urgency tactics, impersonation flags, typosquatting domains, and credential traps to provide a transparent <strong style={{ color: '#00F2FE' }}>Trust Score</strong> and actionable advice.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn-secondary"
              onClick={handleClear}
              style={{ fontSize: '0.85rem' }}
            >
              <RefreshCw size={14} /> Clear Input
            </button>
          </div>
        </div>

        {/* Preset Selector Bar */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={14} color="#00F2FE" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-sub)' }}>
              Quick Presets (Click to instant test real-world cases):
            </span>
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
            {PRESET_EXAMPLES.map(preset => {
              const isSelected = selectedPresetId === preset.id;
              const isHigh = preset.expectedRisk === 'HIGH';

              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  style={{
                    background: isSelected 
                      ? (isHigh ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)')
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected 
                      ? (isHigh ? '1px solid #EF4444' : '1px solid #10B981')
                      : '1px solid var(--border-glass)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    color: isSelected ? '#FFFFFF' : 'var(--text-sub)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{preset.title}</span>
                  <span className={isHigh ? 'badge badge-danger' : 'badge badge-safe'} style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                    {preset.expectedRisk}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Input Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        
        {/* Input Type Switcher */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={() => setInputType('text')}
            style={{
              background: inputType === 'text' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              border: inputType === 'text' ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
              color: inputType === 'text' ? '#00F2FE' : 'var(--text-sub)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={14} /> Email / Text / SMS Content
          </button>

          <button
            onClick={() => setInputType('url')}
            style={{
              background: inputType === 'url' ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
              border: inputType === 'url' ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
              color: inputType === 'url' ? '#00F2FE' : 'var(--text-sub)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Globe size={14} /> Specific Web URL Inspector
          </button>
        </div>

        {/* Text Input Area */}
        {inputType === 'text' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <textarea
              className="input-area"
              rows={5}
              placeholder="Paste suspicious message text, email content, SMS, or DM here... (e.g., 'URGENT: Your account access will be terminated in 24h. Re-verify password at http://chase-bank-verify.xyz')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                className="input-area"
                type="text"
                placeholder="Optional: Target link or website URL contained in message (e.g. http://login-secure.xyz)"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.88rem' }}
              />
            </div>
          </div>
        ) : (
          /* Direct URL Input Area */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              className="input-area"
              type="text"
              placeholder="Enter complete website URL to inspect (e.g. http://chase-bank-verify-identity.xyz/login?id=891)"
              value={customUrl || inputText}
              onChange={(e) => {
                setCustomUrl(e.target.value);
                setInputText(e.target.value);
              }}
            />
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            🔒 Privacy Assured: Content is evaluated client-side for sandbox security.
          </span>

          <button
            className="btn-primary"
            onClick={() => handleRunScan()}
            disabled={isScanning || (!inputText.trim() && !customUrl.trim())}
          >
            {isScanning ? (
              <>
                <RefreshCw size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Scanning AI Threat Vectors...
              </>
            ) : (
              <>
                <Search size={16} /> Run TrustLens AI Scan
              </>
            )}
          </button>
        </div>

      </div>

      {/* Scanning Indicator Bar */}
      {isScanning && (
        <div className="glass-panel scanning-bar" style={{ padding: '24px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <Shield size={48} color="#00F2FE" style={{ animation: 'cyberPulse 1.5s infinite' }} />
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', color: '#00F2FE', marginBottom: '4px' }}>
                Analyzing Digital Content & Vector Indicators
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>
                Step [{scanStep + 1}/4]: {SCAN_STEPS[scanStep]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scan Results View */}
      {scanResult && !isScanning && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Verdict & Score Card */}
          <div className="glass-panel" style={{ 
            padding: '28px', 
            borderColor: scanResult.riskColor,
            boxShadow: `0 0 30px ${scanResult.riskColor}22`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
              
              {/* Radial Gauge Meter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div className="gauge-container">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    <circle className="gauge-circle-bg" cx="90" cy="90" r="72" />
                    <circle 
                      className="gauge-circle-val" 
                      cx="90" 
                      cy="90" 
                      r="72" 
                      stroke={scanResult.riskColor}
                      strokeDasharray={452}
                      strokeDashoffset={452 - (452 * scanResult.score) / 100}
                    />
                  </svg>
                  <div style={{ position: 'absolute', textAlign: 'center' }}>
                    <div className="gauge-number" style={{ color: scanResult.riskColor }}>
                      {scanResult.score}
                    </div>
                    <div className="gauge-label">Trust Score</div>
                  </div>
                </div>

                {/* Verdict Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span 
                      className="badge" 
                      style={{ 
                        background: `${scanResult.riskColor}20`, 
                        color: scanResult.riskColor, 
                        borderColor: `${scanResult.riskColor}60` 
                      }}
                    >
                      {scanResult.riskLevel === 'HIGH_RISK' ? <ShieldAlert size={14} /> : scanResult.riskLevel === 'MEDIUM_RISK' ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
                      {scanResult.riskBadge}
                    </span>

                    {scanResult.isLegitimateOfficialDomain && (
                      <span className="badge badge-safe" style={{ background: 'rgba(16, 185, 129, 0.25)', borderColor: '#10B981', color: '#34D399' }}>
                        <CheckCircle2 size={13} color="#34D399" /> Official {scanResult.officialBrandMatched} Verified Domain
                      </span>
                    )}
                    
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                      Evaluated {scanResult.formattedDate}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '6px' }}>
                    {scanResult.summaryHeading}
                  </h3>

                  <p style={{ color: 'var(--text-sub)', maxWidth: '580px', fontSize: '0.94rem' }}>
                    {scanResult.summaryDescription}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  className="btn-secondary"
                  onClick={handleCopyReport}
                  style={{ fontSize: '0.85rem' }}
                >
                  {copiedAdvice ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                  {copiedAdvice ? 'Report Copied!' : 'Copy Audit Summary'}
                </button>
              </div>

            </div>
          </div>

          {/* Grid Layout: Explainable Threat Indicators & Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            
            {/* Column 1: Explainable Risk Indicators */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={18} color="#00F2FE" />
                  <h4 style={{ fontSize: '1.15rem' }}>Explainable Threat Triggers</h4>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                  {scanResult.triggers.length} Found
                </span>
              </div>

              {scanResult.triggers.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <CheckCircle2 size={32} color="#10B981" style={{ margin: '0 auto 8px' }} />
                  <p style={{ color: '#34D399', fontWeight: '600', fontSize: '0.9rem' }}>No Malicious Triggers Detected</p>
                  <p style={{ color: 'var(--text-sub)', fontSize: '0.82rem', marginTop: '4px' }}>
                    No urgency tactics, credential harvesting patterns, or unverified link anomalies were triggered.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {scanResult.triggers.map((trigger) => {
                    const isHigh = trigger.severity === 'HIGH';
                    return (
                      <div
                        key={trigger.id}
                        style={{
                          background: isHigh ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                          border: isHigh ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '12px',
                          padding: '14px 16px'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.92rem', color: isHigh ? '#F87171' : '#FBBF24' }}>
                            {trigger.name}
                          </span>
                          <span className={isHigh ? 'badge badge-danger' : 'badge badge-warning'} style={{ fontSize: '0.65rem' }}>
                            {trigger.severity} • {trigger.confidence}% CONFIDENCE
                          </span>
                        </div>

                        <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                          {trigger.description}
                        </p>

                        {trigger.evidenceSnippet && (
                          <div style={{
                            marginTop: '8px',
                            padding: '6px 10px',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono)',
                            color: '#CBD5E1'
                          }}>
                            Snippet: {trigger.evidenceSnippet}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Column 2: Actionable Safety Recommendations */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#10B981" />
                <h4 style={{ fontSize: '1.15rem' }}>Actionable Safety Steps</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {scanResult.recommendations.map((rec, index) => {
                  const isCrit = rec.priority === 'CRITICAL';
                  const isHigh = rec.priority === 'HIGH';

                  return (
                    <div
                      key={index}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        display: 'flex',
                        gap: '12px'
                      }}
                    >
                      <div style={{ marginTop: '2px' }}>
                        <CheckCircle2 size={18} color={isCrit ? '#EF4444' : isHigh ? '#F59E0B' : '#10B981'} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '0.92rem', color: '#F8FAFC' }}>{rec.title}</strong>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            padding: '1px 6px', 
                            borderRadius: '4px',
                            background: isCrit ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            color: isCrit ? '#F87171' : 'var(--text-sub)'
                          }}>
                            {rec.priority}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-sub)', lineHeight: '1.4' }}>
                          {rec.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Deep Domain & URL Breakdown Card (If URL scanned) */}
          {scanResult.urlAnalysis && scanResult.urlAnalysis.isValid && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setShowDomainDetails(!showDomainDetails)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Globe size={20} color="#00F2FE" />
                  <div>
                    <h4 style={{ fontSize: '1.15rem', margin: 0 }}>Deep Domain & Infrastructure Analysis</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-sub)', margin: 0 }}>
                      Host: <code style={{ color: '#00F2FE', fontFamily: 'var(--font-mono)' }}>{scanResult.urlAnalysis.hostname}</code>
                    </p>
                  </div>
                </div>

                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  {showDomainDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showDomainDetails ? 'Collapse Details' : 'View Infrastructure Details'}
                </button>
              </div>

              {showDomainDetails && (
                <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-glass)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  
                  {/* Item 1: Protocol & SSL */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SSL Security</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: scanResult.urlAnalysis.isHttps ? '#34D399' : '#F87171' }}>
                      {scanResult.urlAnalysis.sslStatus}
                    </div>
                  </div>

                  {/* Item 2: Domain Age */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated Domain Age</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: scanResult.urlAnalysis.domainAgeDays < 30 ? '#F87171' : '#38BDF8' }}>
                      {scanResult.urlAnalysis.domainAgeDays} Days ({scanResult.urlAnalysis.domainAgeDays < 30 ? 'Newly Created Domain Risk' : 'Established Domain'})
                    </div>
                  </div>

                  {/* Item 3: SPF Email Sanity */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SPF Authentication</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: scanResult.urlAnalysis.spfRecordStatus.includes('Pass') ? '#34D399' : '#F87171' }}>
                      {scanResult.urlAnalysis.spfRecordStatus}
                    </div>
                  </div>

                  {/* Item 4: Top Level Domain */}
                  <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top-Level Domain (TLD)</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', marginTop: '4px', color: scanResult.urlAnalysis.isSuspiciousTld ? '#F87171' : '#38BDF8' }}>
                      {scanResult.urlAnalysis.tld || '.com'} {scanResult.urlAnalysis.isSuspiciousTld ? '(High Risk TLD)' : '(Standard TLD)'}
                    </div>
                  </div>

                  {/* Redirect Chain Visualizer */}
                  {scanResult.urlAnalysis.redirectChain && (
                    <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '8px', fontWeight: '600' }}>
                        Simulated Link Hop & Redirection Chain:
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {scanResult.urlAnalysis.redirectChain.map((hop, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                            <span style={{ color: 'var(--text-muted)' }}>[{index + 1}]</span>
                            <code style={{ color: index === scanResult.urlAnalysis.redirectChain.length - 1 ? '#F87171' : '#CBD5E1' }}>
                              {hop}
                            </code>
                            {index < scanResult.urlAnalysis.redirectChain.length - 1 && (
                              <ArrowRight size={12} color="#00F2FE" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
