import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ThreatAnalyzer from './components/ThreatAnalyzer';
import ScanHistory from './components/ScanHistory';
import ThreatLab from './components/ThreatLab';
import LiveThreatRadar from './components/LiveThreatRadar';
import SecurityToolkit from './components/SecurityToolkit';
import Footer from './components/Footer';
import { INITIAL_SCAN_HISTORY } from './utils/sampleData';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [scanHistory, setScanHistory] = useState(() => {
    const saved = localStorage.getItem('trustlens_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SCAN_HISTORY;
      }
    }
    return INITIAL_SCAN_HISTORY;
  });

  const [analyzerInput, setAnalyzerInput] = useState('');

  // Persist history to localStorage
  useEffect(() => {
    localStorage.setItem('trustlens_history', JSON.stringify(scanHistory));
  }, [scanHistory]);

  const handleSaveScan = (newScan) => {
    setScanHistory(prev => [newScan, ...prev]);
  };

  const handleDeleteScan = (scanId) => {
    setScanHistory(prev => prev.filter(item => item.id !== scanId));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your scan audit history?')) {
      setScanHistory([]);
    }
  };

  const handleReAnalyze = (contentToScan) => {
    setAnalyzerInput(contentToScan);
    setActiveTab('analyzer');
  };

  // Metrics
  const totalScansCount = scanHistory.length;
  const threatsBlockedCount = scanHistory.filter(s => s.riskLevel === 'HIGH_RISK').length;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        totalScansCount={totalScansCount}
        threatsBlockedCount={threatsBlockedCount}
      />

      {/* Main Content Viewport */}
      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '32px 24px 0' }}>
        
        {activeTab === 'analyzer' && (
          <ThreatAnalyzer 
            onSaveScan={handleSaveScan}
            initialInput={analyzerInput}
          />
        )}

        {activeTab === 'history' && (
          <ScanHistory 
            scanHistory={scanHistory}
            onDeleteScan={handleDeleteScan}
            onClearHistory={handleClearHistory}
            onReAnalyze={handleReAnalyze}
          />
        )}

        {activeTab === 'threat_lab' && (
          <ThreatLab 
            onTestInAnalyzer={handleReAnalyze}
          />
        )}

        {activeTab === 'live_radar' && (
          <LiveThreatRadar />
        )}

        {activeTab === 'toolkit' && (
          <SecurityToolkit />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
