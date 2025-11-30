"use client"

import React from 'react'
import '../../css/custom.css'

const HeroSection: React.FC<{ onChatOpen: () => void; onDocsOpen: () => void }> = ({ onChatOpen, onDocsOpen }) => {
  return (
    <section className="hero">
      {/* Enhanced AI Background Animation */}
      <div className="ai-animation-bg">
        {/* Floating AI Elements */}
        <div className="ai-element ai-1">🧠</div>
        <div className="ai-element ai-2">⚡</div>
        <div className="ai-element ai-3">🤖</div>
        <div className="ai-element ai-4">🧬</div>
        <div className="ai-element ai-5">🔮</div>
        <div className="ai-element ai-6">🎯</div>
        <div className="ai-element ai-7">🌐</div>
        <div className="ai-element ai-8">💭</div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="glow-text-cyan">Advanced</span> Robotics &<span className="glow-text-purple"> AI</span>{" "}
            Integration
          </h1>
          <p className="hero-subtitle">Build next-generation robots with cutting-edge AI and precision automation.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onChatOpen}>
              🤖 Ask AI Assistant
            </button>
            <button className="btn-secondary" onClick={onDocsOpen}>
              📚 Read Documentation
            </button>
          </div>
        </div>

        {/* Enhanced 3D Visualization */}
        <div className="hero-3d">
          <div className="rotating-cube">
            <div className="cube-face front">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="30" cy="30" r="15" stroke="#00FFFF" strokeWidth="1.5" fill="rgba(0,255,255,0.3)" />
                <circle cx="60" cy="30" r="8" stroke="#9333EA" strokeWidth="1" fill="rgba(147,51,234,0.3)" />
                <circle cx="30" cy="60" r="8" stroke="#00FFFF" strokeWidth="1" />
              </svg>
            </div>
            <div className="cube-face back">
              <svg viewBox="0 0 100 100" fill="none">
                <rect x="20" y="20" width="60" height="60" stroke="#9333EA" strokeWidth="2" fill="rgba(147,51,234,0.1)" />
                <text x="50" y="55" text="AI" fill="#00FFFF" fontSize="24" textAnchor="middle" />
              </svg>
            </div>
            <div className="cube-face right">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="30" cy="30" r="20" stroke="#00FFFF" strokeWidth="2" fill="none" />
                <circle cx="60" cy="30" r="15" stroke="#9333EA" strokeWidth="1.5" />
                <path d="M30 30L50 20M50 40L30 30" stroke="#00FFFF" strokeWidth="2" />
              </svg>
            </div>
            <div className="cube-face left">
              <svg viewBox="0 0 100 100" fill="none">
                <polygon points="30,20 70,20 70,80 30,50" stroke="#00FFFF" strokeWidth="2" fill="rgba(0,255,255,0.1)" />
                <circle cx="50" cy="50" r="12" stroke="#9333EA" strokeWidth="2" fill="#00FFFF" />
              </svg>
            </div>
            <div className="cube-face top">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="20" cy="30" r="8" stroke="#00FFFF" strokeWidth="1.5" />
                <circle cx="70" cy="30" r="8" stroke="#9333EA" strokeWidth="1.5" />
                <circle cx="30" cy="70" r="8" stroke="#00FFFF" strokeWidth="1.5" />
                <circle cx="70" cy="70" r="8" stroke="#9333EA" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="cube-face bottom">
              <svg viewBox="0 0 100 100" fill="none">
                <rect x="20" y="20" width="60" height="60" stroke="#00FFFF" strokeWidth="2" fill="rgba(0,255,255,0.1)" />
                <rect x="40" y="30" width="20" height="40" stroke="#9333EA" strokeWidth="2" fill="rgba(147,51,234,0.2)" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection