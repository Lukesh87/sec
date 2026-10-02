import React, { useState } from 'react';
import { 
  History, Search, Filter, ShieldAlert, ShieldCheck, AlertTriangle, 
  Trash2, ExternalLink, Download, FileText, ChevronRight, RefreshCw, X
} from 'lucide-react';

export default function ScanHistory({ scanHistory, onDeleteScan, onClearHistory, onReAnalyze }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL'); // 'ALL' | 'HIGH_RISK' | 'MEDIUM_RISK' | 'SAFE'
  const [selectedScanDetail, setSelectedScanDetail] = useState(null);

  // Filter history logic
  const filteredHistory = scanHistory.filter(item => {
    const matchesSearch = (item.inputText || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.urlAnalyzed || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.summaryHeading || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = riskFilter === 'ALL' || item.riskLevel === riskFilter;

    return matchesSearch && matchesFilter;
  });

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(scanHistory, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TrustLens_Scan_Audit_Log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <History size={20} color="#00F2FE" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Scan Audit & Threat Log</h2>
            </div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem' }}>
              Track previously scanned messages, URLs, and risk assessments. Audit past threats or re-run evaluations anytime.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn-secondary"
              onClick={handleExportJSON}
              disabled={scanHistory.length === 0}
              style={{ fontSize: '0.85rem' }}
            >
              <Download size={14} /> Export Audit (JSON)
            </button>

            <button 
              className="btn-secondary"
              onClick={onClearHistory}
              disabled={scanHistory.length === 0}
              style={{ fontSize: '0.85rem', color: '#F87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <Trash2 size={14} /> Clear Log
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
            <Search size={16} color="var(--text-sub)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              className="input-area"
              type="text"
              placeholder="Search history by text, URL, or risk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'ALL', label: `All (${scanHistory.length})` },
              { id: 'HIGH_RISK', label: 'High Risk' },
              { id: 'MEDIUM_RISK', label: 'Medium Risk' },
              { id: 'SAFE', label: 'Safe' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setRiskFilter(f.id)}
                style={{
                  background: riskFilter === f.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: riskFilter === f.id ? '1px solid var(--primary-cyan)' : '1px solid var(--border-glass)',
                  color: riskFilter === f.id ? '#00F2FE' : 'var(--text-sub)',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* History Items Grid */}
      {filteredHistory.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <History size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-sub)' }}>No Scans Found</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {searchTerm ? 'Try changing your search query or filter settings.' : 'Scan a suspicious email or URL in the Threat Analyzer tab to start building your safety audit log.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredHistory.map((item) => {
            const isHigh = item.riskLevel === 'HIGH_RISK';
            const isMed = item.riskLevel === 'MEDIUM_RISK';

            return (
              <div 
                key={item.id}
                className="glass-panel glass-panel-hover"
                style={{ padding: '18px 24px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  
                  {/* Left: Score Badge & Summary */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, minWidth: '280px' }}>
                    
                    {/* Score Ring / Pill */}
                    <div style={{ 
                      width: '52px', 
                      height: '52px', 
                      borderRadius: '50%',
                      background: isHigh ? 'rgba(239, 68, 68, 0.15)' : isMed ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                      border: `2px solid ${item.riskColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '800', color: item.riskColor, lineHeight: 1 }}>
                        {item.score}
                      </span>
                      <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Score</span>
                    </div>

                    {/* Content Preview */}
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span className={isHigh ? 'badge badge-danger' : isMed ? 'badge badge-warning' : 'badge badge-safe'} style={{ fontSize: '0.65rem' }}>
                          {item.riskBadge}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {item.formattedDate}
                        </span>
                      </div>

                      <div style={{ 
                        fontSize: '0.92rem', 
                        color: '#F8FAFC', 
                        fontWeight: '600',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '550px'
                      }}>
                        {item.inputText || item.urlAnalyzed}
                      </div>

                      {item.urlAnalyzed && (
                        <div style={{ fontSize: '0.78rem', color: '#00F2FE', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                          Link: {item.urlAnalyzed}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      className="btn-secondary"
                      onClick={() => setSelectedScanDetail(item)}
                      style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                    >
                      <FileText size={14} /> Full Audit
                    </button>

                    <button 
                      className="btn-secondary"
                      onClick={() => onReAnalyze(item.inputText || item.urlAnalyzed)}
                      style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                    >
                      <RefreshCw size={14} /> Re-Scan
                    </button>

                    <button 
                      onClick={() => onDeleteScan(item.id)}
                      style={{ 
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '6px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      title="Delete Record"
                    >
                      <Trash2 size={16} hoverColor="#F87171" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedScanDetail && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={22} color="#00F2FE" />
                <h3 style={{ fontSize: '1.3rem' }}>Scan Record Detail</h3>
              </div>

              <button 
                onClick={() => setSelectedScanDetail(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-sub)', marginBottom: '4px' }}>Scanned Content:</div>
                <div style={{ fontSize: '0.95rem', color: '#F8FAFC', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                  {selectedScanDetail.inputText || selectedScanDetail.urlAnalyzed}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Trust Score</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: selectedScanDetail.riskColor }}>
                    {selectedScanDetail.score}/100
                  </div>
                </div>

                <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Risk Level</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: selectedScanDetail.riskColor, marginTop: '4px' }}>
                    {selectedScanDetail.riskBadge}
                  </div>
                </div>

                <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-sub)' }}>Timestamp</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#F8FAFC', marginTop: '6px' }}>
                    {selectedScanDetail.formattedDate}
                  </div>
                </div>
              </div>

              {selectedScanDetail.triggers && selectedScanDetail.triggers.length > 0 && (
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: '#00F2FE' }}>Triggered Risk Vector Highlights:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedScanDetail.triggers.map((trig, idx) => (
                      <div key={idx} style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <strong style={{ color: '#F87171' }}>{trig.name}:</strong> {trig.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-primary" onClick={() => setSelectedScanDetail(null)}>
                  Close Audit View
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
