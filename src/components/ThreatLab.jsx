import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, ArrowRight, RefreshCw, Sparkles, HelpCircle, Trophy } from 'lucide-react';
import { CYBER_QUIZ_SCENARIOS } from '../utils/sampleData';

export default function ThreatLab({ onTestInAnalyzer }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null); // true for Scam, false for Safe
  const [score, setScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentScenario = CYBER_QUIZ_SCENARIOS[currentIndex];

  const handleChoice = (isScamChoice) => {
    if (selectedChoice !== null) return; // Prevent double answer

    setSelectedChoice(isScamChoice);
    setShowExplanation(true);
    setCompletedCount(prev => prev + 1);

    const isCorrect = isScamChoice === currentScenario.isScam;
    if (isCorrect) {
      setScore(prev => prev + 250);
    }
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setShowExplanation(false);
    if (currentIndex < CYBER_QUIZ_SCENARIOS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Restart or loop
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(17, 23, 38, 0.9) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Award size={22} color="#C084FC" />
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Cyber Threat Training Simulator</h2>
            </div>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.9rem', maxWidth: '650px' }}>
              Test your instinct against realistic smishing, spear phishing, and digital scam scenarios. Learn how to spot hidden red flags before clicking!
            </p>
          </div>

          {/* User Score Card */}
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.4)', 
            border: '1px solid rgba(192, 132, 252, 0.3)', 
            padding: '12px 20px', 
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <Trophy size={28} color="#FBBF24" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', textTransform: 'uppercase' }}>Guardian Score</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FBBF24' }}>
                {score} XP
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span className="badge badge-cyan">
            Scenario [{currentIndex + 1} of {CYBER_QUIZ_SCENARIOS.length}]: {currentScenario.category}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>
            Sender: <code style={{ fontFamily: 'var(--font-mono)', color: '#00F2FE' }}>{currentScenario.sender}</code>
          </span>
        </div>

        {/* Message Preview Box */}
        <div style={{
          background: 'rgba(9, 13, 22, 0.95)',
          border: '1px solid var(--border-glass)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          position: 'relative'
        }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-sub)', marginBottom: '8px', fontWeight: '600' }}>
            Subject / Headline: <span style={{ color: '#F8FAFC' }}>{currentScenario.headline}</span>
          </div>

          <div style={{ fontSize: '1rem', color: '#F8FAFC', lineHeight: '1.6', fontFamily: 'var(--font-body)', whiteSpace: 'pre-wrap' }}>
            "{currentScenario.content}"
          </div>
        </div>

        {/* Interactive Choice Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <button
            onClick={() => handleChoice(true)}
            disabled={selectedChoice !== null}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: selectedChoice === true 
                ? (currentScenario.isScam ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                : 'rgba(239, 68, 68, 0.1)',
              border: selectedChoice === true 
                ? (currentScenario.isScam ? '2px solid #10B981' : '2px solid #EF4444')
                : '1px solid rgba(239, 68, 68, 0.3)',
              color: '#F87171',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: selectedChoice === null ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            <AlertTriangle size={20} color="#F87171" />
            This is a Phishing / Scam Threat!
          </button>

          <button
            onClick={() => handleChoice(false)}
            disabled={selectedChoice !== null}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '16px 20px',
              borderRadius: '12px',
              background: selectedChoice === false 
                ? (!currentScenario.isScam ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                : 'rgba(16, 185, 129, 0.1)',
              border: selectedChoice === false 
                ? (!currentScenario.isScam ? '2px solid #10B981' : '2px solid #EF4444')
                : '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontWeight: '700',
              fontSize: '1rem',
              cursor: selectedChoice === null ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={20} color="#34D399" />
            This is Legitimate & Safe
          </button>
        </div>

        {/* Explanation & Feedback Card */}
        {showExplanation && (
          <div style={{
            background: selectedChoice === currentScenario.isScam ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: selectedChoice === currentScenario.isScam ? '1px solid #10B981' : '1px solid #EF4444',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              {selectedChoice === currentScenario.isScam ? (
                <>
                  <CheckCircle2 size={24} color="#10B981" />
                  <h4 style={{ fontSize: '1.2rem', color: '#34D399' }}>Spot On! (+250 XP)</h4>
                </>
              ) : (
                <>
                  <XCircle size={24} color="#EF4444" />
                  <h4 style={{ fontSize: '1.2rem', color: '#F87171' }}>Incorrect Assessment</h4>
                </>
              )}
            </div>

            <p style={{ color: '#F8FAFC', fontSize: '0.94rem', lineHeight: '1.5', marginBottom: '14px' }}>
              {currentScenario.correctChoiceExplanation}
            </p>

            {currentScenario.keyRedFlags.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)', fontWeight: '600' }}>Key Red Flags Identified:</span>
                {currentScenario.keyRedFlags.map((flag, i) => (
                  <span key={i} className="badge badge-danger" style={{ fontSize: '0.72rem' }}>
                    {flag}
                  </span>
                ))}
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <button
                className="btn-secondary"
                onClick={() => onTestInAnalyzer(currentScenario.content)}
                style={{ fontSize: '0.85rem' }}
              >
                <Sparkles size={14} color="#00F2FE" /> Send to Live AI Analyzer
              </button>

              <button
                className="btn-primary"
                onClick={handleNext}
                style={{ fontSize: '0.88rem' }}
              >
                Next Scenario <ArrowRight size={16} />
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
