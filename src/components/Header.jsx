import React from 'react';
import { Shield, ShieldAlert, History, Award, Radio, Wrench, Search, Zap } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalScansCount, threatsBlockedCount }) {
  const navTabs = [
    { id: 'analyzer', label: 'Threat Analyzer', icon: Search },
    { id: 'history', label: 'Scan History', icon: History, badge: totalScansCount > 0 ? totalScansCount : null },
    { id: 'threat_lab', label: 'Cyber Threat Lab', icon: Award, highlight: 'Quiz' },
    { id: 'live_radar', label: 'Threat Radar', icon: Radio },
    { id: 'toolkit', label: 'Safety Toolkit', icon: Wrench },
  ];

  return (
    <header style={{ borderBottom: '1px solid var(--border-glass)', background: 'rgba(9, 13, 22, 0.9)', sticky: 'top', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px' }}>
        
        {/* Top Row: Brand & Status Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(124, 58, 237, 0.2) 100%)',
              border: '1px solid var(--primary-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.3)'
            }}>
              <Shield size={26} color="#00F2FE" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }} className="gradient-text">
                  TrustLens AI
                </h1>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                  v2.4 Core AI
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', margin: 0 }}>
                Explainable Digital Safety & Threat Detection Platform
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(255, 255, 255, 0.03)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Engine: <strong style={{ color: '#F8FAFC' }}>Active</strong></span>
            </div>

            <div style={{ width: '1px', height: '16px', background: 'var(--border-glass)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} color="#00F2FE" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Scans Run: <strong style={{ color: '#00F2FE' }}>{totalScansCount}</strong></span>
            </div>

            <div style={{ width: '1px', height: '16px', background: 'var(--border-glass)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={14} color="#EF4444" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Threats Flagged: <strong style={{ color: '#EF4444' }}>{threatsBlockedCount}</strong></span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {navTabs.map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(0, 168, 255, 0.1) 100%)' : 'rgba(255, 255, 255, 0.03)',
                  border: isActive ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
                  color: isActive ? '#00F2FE' : 'var(--text-sub)',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 16px rgba(0, 242, 254, 0.2)' : 'none'
                }}
              >
                <IconComponent size={16} color={isActive ? '#00F2FE' : 'var(--text-sub)'} />
                <span>{tab.label}</span>
                
                {tab.badge !== null && tab.badge !== undefined && (
                  <span style={{
                    background: 'rgba(0, 242, 254, 0.2)',
                    color: '#00F2FE',
                    borderRadius: '999px',
                    padding: '2px 7px',
                    fontSize: '0.72rem',
                    fontWeight: '700'
                  }}>
                    {tab.badge}
                  </span>
                )}

                {tab.highlight && (
                  <span style={{
                    background: 'rgba(124, 58, 237, 0.3)',
                    color: '#C084FC',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    fontSize: '0.68rem',
                    fontWeight: '700'
                  }}>
                    {tab.highlight}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
