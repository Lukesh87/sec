import React from 'react';
import { Shield, Heart, Lock, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ marginTop: '60px', borderTop: '1px solid var(--border-glass)', background: 'rgba(6, 9, 17, 0.95)', padding: '40px 24px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Left Brand */}
          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Shield size={22} color="#00F2FE" />
              <span style={{ fontSize: '1.2rem', fontWeight: '800' }} className="gradient-text">
                TrustLens AI
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: '1.5' }}>
              Empowering students, individuals, and non-technical users to identify digital threats, phishing, and scam links with explainable AI insights.
            </p>
          </div>

          {/* Center Links */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            <div>
              <h5 style={{ color: '#F8FAFC', marginBottom: '8px', fontSize: '0.9rem' }}>Core Modules</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-sub)' }}>
                <span>Threat Analyzer</span>
                <span>Audit & Scan History</span>
                <span>Cyber Threat Lab</span>
                <span>Live Threat Radar</span>
              </div>
            </div>

            <div>
              <h5 style={{ color: '#F8FAFC', marginBottom: '8px', fontSize: '0.9rem' }}>Digital Safety</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-sub)' }}>
                <span>Phishing Prevention</span>
                <span>Domain Inspection</span>
                <span>2FA Best Practices</span>
                <span>Quishing Defense</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div style={{ 
          paddingTop: '20px', 
          borderTop: '1px solid var(--border-glass)', 
          display: 'flex', 
          justify: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '12px',
          fontSize: '0.78rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © 2026 TrustLens AI Platform. All scans run client-side in sandbox environment for data privacy.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built for Hackathon • Promoting Cyber Safety Awareness
          </div>
        </div>

      </div>
    </footer>
  );
}
