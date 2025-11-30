"use client"

import { useState, useRef, useEffect } from "react"
import "../css/custom.css"

export default function RoboticsLanding() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isDocsOpen, setIsDocsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [docsSearch, setDocsSearch] = useState("")
  const canvasRef = useRef(null)
  const infrastructureCanvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId
    const particles = []

 
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 30, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  useEffect(() => {
    const canvas = infrastructureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId
    const lines = []

    class DataLine {
      x: number
      y: number
      vx: number
      vy: number
      length: number
      angle: number
      opacity: number
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 3
        this.vy = (Math.random() - 0.5) * 3
        this.length = Math.random() * 100 + 50
        this.angle = Math.random() * Math.PI * 2
        this.opacity = Math.random() * 0.5 + 0.3
        this.speed = Math.random() * 2 + 1
      }

      update() {
        this.angle += this.speed * 0.01
        this.x += Math.cos(this.angle) * 2
        this.y += Math.sin(this.angle) * 2

        if (this.x > canvas.width + 100) this.x = -100
        if (this.x < -100) this.x = canvas.width + 100
        if (this.y > canvas.height + 100) this.y = -100
        if (this.y < -100) this.y = canvas.height + 100
      }

      draw() {
        ctx.strokeStyle = `rgba(0, 255, 255, ${this.opacity})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length)
        ctx.stroke()

        // Draw nodes
        ctx.fillStyle = `rgba(0, 255, 255, ${this.opacity * 0.8})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 12; i++) {
      lines.push(new DataLine())
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 30, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        line.update()
        line.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const docs = [
    {
      id: 1,
      title: "Getting Started",
      content:
        "Learn how to set up your first robotics project with our comprehensive guide. Includes installation, configuration, and basic concepts.",
    },
    {
      id: 2,
      title: "AI Integration",
      content:
        "Integrate advanced AI models to enhance your robot's decision-making capabilities. Supports TensorFlow, PyTorch, and custom models.",
    },
    {
      id: 3,
      title: "API Reference",
      content:
        "Complete API documentation with code examples for motion control, sensor integration, and real-time communication.",
    },
    {
      id: 4,
      title: "Hardware Setup",
      content:
        "Detailed guides for setting up robotics hardware, including motor controllers, sensors, and communication protocols.",
    },
    {
      id: 5,
      title: "Best Practices",
      content: "Industry best practices for robotics development, optimization techniques, and performance tuning.",
    },
    {
      id: 6,
      title: "Troubleshooting",
      content:
        "Common issues and solutions for debugging your robotics applications. Includes diagnostic tools and error handling.",
    },
  ]

  const filteredDocs = docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(docsSearch.toLowerCase()) ||
      doc.content.toLowerCase().includes(docsSearch.toLowerCase()),
  )

  return (
    <div className="robotics-container">
      {/* Animated Background */}
      <canvas ref={canvasRef} className="background-canvas"></canvas>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo-section">
            <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
              <path
                d="M20 10V30M10 20H30M15 15L25 25M25 15L15 25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="logo-text">rROBOTICS</span>
          </div>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={() => window.location.href = '/docs/intro'}>
              Docs
            </button>
            <button className="nav-btn login-btn" onClick={() => setIsLoginOpen(true)}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="glow-text-cyan">Advanced</span> Robotics &<span className="glow-text-purple"> AI</span>{" "}
              Integration
            </h1>
            <p className="hero-subtitle">Build next-generation robots with cutting-edge AI and precision automation.</p>
            <div className="hero-buttons">
              <button className="btn-primary">Explore Platform</button>
              <button className="btn-secondary" onClick={() => window.location.href = '/docs/intro'}>
                Read Documentation
              </button>
            </div>
        </div>

          <div className="hero-3d">
            <div className="rotating-cube">
              <div className="cube-face front">
                <svg viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="20" width="60" height="60" stroke="url(#grad1)" strokeWidth="2" />
                  <circle cx="50" cy="50" r="15" stroke="url(#grad1)" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="cube-face back">
                <svg viewBox="0 0 100 100" fill="none">
                  <path
                    d="M30 30 L70 30 L70 70 L30 70 Z"
                    stroke="url(#grad2)"
                    strokeWidth="2"
                    fill="rgba(0,255,255,0.1)"
                  />
                </svg>
              </div>
              <div className="cube-face right">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="25" stroke="url(#grad1)" strokeWidth="2" />
                  <line x1="25" y1="50" x2="75" y2="50" stroke="url(#grad1)" strokeWidth="1" />
                </svg>
              </div>
              <div className="cube-face left">
                <svg viewBox="0 0 100 100" fill="none">
                  <polygon
                    points="50,20 80,50 50,80 20,50"
                    stroke="url(#grad2)"
                    strokeWidth="2"
                    fill="rgba(147,51,234,0.1)"
                  />
                </svg>
              </div>
              <div className="cube-face top">
                <svg viewBox="0 0 100 100" fill="none">
                  <circle cx="30" cy="30" r="8" stroke="url(#grad1)" strokeWidth="1.5" fill="rgba(0,255,255,0.3)" />
                  <circle cx="70" cy="70" r="8" stroke="url(#grad2)" strokeWidth="1.5" fill="rgba(147,51,234,0.3)" />
                </svg>
                </div>
              <div className="cube-face bottom">
                <svg viewBox="0 0 100 100" fill="none">
                  <rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="url(#grad1)"
                    strokeWidth="2"
                    fill="rgba(0,255,255,0.05)"
                  />
                </svg>
              </div>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#00FFFF", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#0099FF", stopOpacity: 1 }} />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#9333EA", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#FF00FF", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Core Features</h2>
        <div className="features-grid">
          {/* AI Integration */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="url(#aiGradIcon)" strokeWidth="2" opacity="0.3" />
                <path d="M50 20L65 40L55 40L65 60L50 50L35 60L45 40L35 40Z" fill="url(#aiGradIcon)" />
                <circle cx="35" cy="35" r="2.5" fill="url(#aiGradIcon)" />
                <circle cx="65" cy="35" r="2.5" fill="url(#aiGradIcon)" />
                <circle cx="50" cy="65" r="2.5" fill="url(#aiGradIcon)" />
                <defs>
                  <linearGradient id="aiGradIcon">
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="100%" stopColor="#00FF88" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Intelligent AI</h3>
            <p>Advanced machine learning algorithms for autonomous decision-making and pattern recognition.</p>
          </div>

          {/* Precision Control */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="url(#precGradIcon)" strokeWidth="2" opacity="0.3" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="url(#precGradIcon)" strokeWidth="2" />
                <circle cx="50" cy="50" r="12" fill="none" stroke="url(#precGradIcon)" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="4" fill="url(#precGradIcon)" />
                <path
                  d="M50 30V18M50 70V82M30 50H18M70 50H82"
                  stroke="url(#precGradIcon)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="precGradIcon">
                    <stop offset="0%" stopColor="#9333EA" />
                    <stop offset="100%" stopColor="#FF00FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Precision Control</h3>
            <p>Microsecond-level motor control and real-time sensor feedback for perfect accuracy.</p>
          </div>

          {/* Real-time Monitoring */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="url(#monGradIcon)" strokeWidth="2" opacity="0.3" />
                <rect x="18" y="30" width="64" height="45" rx="4" stroke="url(#monGradIcon)" strokeWidth="2" />
                <rect x="20" y="32" width="60" height="35" fill="rgba(255,107,53,0.05)" rx="2" />
                <circle cx="32" cy="52" r="3" fill="url(#monGradIcon)" />
                <circle cx="50" cy="47" r="3" fill="url(#monGradIcon)" />
                <circle cx="68" cy="57" r="3" fill="url(#monGradIcon)" />
                <polyline points="32,52 50,47 68,57" fill="none" stroke="url(#monGradIcon)" strokeWidth="1.5" />
                <circle cx="50" cy="80" r="2" fill="url(#monGradIcon)" />
                <defs>
                  <linearGradient id="monGradIcon">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#FF00FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Live Monitoring</h3>
            <p>Real-time dashboards with comprehensive telemetry and performance analytics.</p>
          </div>

          {/* Modular Design */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="url(#modGradIcon)" strokeWidth="2" opacity="0.3" />
                <rect x="22" y="22" width="18" height="18" stroke="url(#modGradIcon)" strokeWidth="2" rx="2" />
                <rect x="48" y="22" width="18" height="18" stroke="url(#modGradIcon)" strokeWidth="2" rx="2" />
                <rect x="22" y="60" width="18" height="18" stroke="url(#modGradIcon)" strokeWidth="2" rx="2" />
                <rect x="48" y="60" width="18" height="18" stroke="url(#modGradIcon)" strokeWidth="2" rx="2" />
                <line x1="44" y1="31" x2="48" y2="31" stroke="url(#modGradIcon)" strokeWidth="1.5" />
                <line x1="31" y1="56" x2="31" y2="60" stroke="url(#modGradIcon)" strokeWidth="1.5" />
                <circle cx="57" cy="31" r="1.5" fill="url(#modGradIcon)" />
                <circle cx="31" cy="69" r="1.5" fill="url(#modGradIcon)" />
                <defs>
                  <linearGradient id="modGradIcon">
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="100%" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Modular System</h3>
            <p>Plug-and-play components for endless customization and scalability.</p>
          </div>

          {/* Cloud Sync */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="url(#cloudGradIcon)" strokeWidth="2" opacity="0.3" />
                <path
                  d="M38 62 Q30 62 30 54 Q30 46 38 46 Q42 33 50 33 Q62 33 67 46 Q75 46 75 54 Q75 62 67 62"
                  stroke="url(#cloudGradIcon)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M48 54L50 57L52 54M50 57V48"
                  stroke="url(#cloudGradIcon)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="cloudGradIcon">
                    <stop offset="0%" stopColor="#FF00FF" />
                    <stop offset="100%" stopColor="#00FFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Cloud Integration</h3>
            <p>Seamless synchronization and remote access from anywhere in the world.</p>
          </div>

          {/* Security */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <svg className="feature-icon" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="url(#secGradIcon)" strokeWidth="2" opacity="0.3" />
                <path
                  d="M50 28L68 38L68 58 Q50 72 50 72 Q32 72 32 58L32 38Z"
                  stroke="url(#secGradIcon)"
                  strokeWidth="2"
                  fill="rgba(0,255,136,0.05)"
                />
                <circle cx="50" cy="52" r="5" fill="none" stroke="url(#secGradIcon)" strokeWidth="1.5" />
                <path d="M50 50L50 46M50 58V54" stroke="url(#secGradIcon)" strokeWidth="1.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="secGradIcon">
                    <stop offset="0%" stopColor="#00FF88" />
                    <stop offset="100%" stopColor="#00FFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3>Enterprise Security</h3>
            <p>Military-grade encryption and multi-layer security protocols for maximum protection.</p>
        </div>
      </div>
    </section>

      {/* Capabilities Section */}
      <section className="capabilities">
        <h2 className="section-title">Performance Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-box">
            <div className="metric-value">99.99%</div>
            <div className="metric-label">Uptime</div>
          </div>
          <div className="metric-box">
            <div className="metric-value">1ms</div>
            <div className="metric-label">Latency</div>
          </div>
          <div className="metric-box">
            <div className="metric-value">10K+</div>
            <div className="metric-label">Active Robots</div>
          </div>
          <div className="metric-box">
            <div className="metric-value">50K+</div>
            <div className="metric-label">Data Points/sec</div>
          </div>
        </div>
      </section>

      {/* Infrastructure & Backend Section */}
      <section className="infrastructure">
        <h2 className="section-title">Infrastructure & Backend</h2>
        <canvas ref={infrastructureCanvasRef} className="infrastructure-canvas"></canvas>

        <div className="infrastructure-content">
          <div className="infrastructure-grid">
            {/* AI Chip Component */}
            <div className="chip-card">
              <div className="chip-visual">
                <svg className="ai-chip" viewBox="0 0 120 120" fill="none">
                  <defs>
                    <linearGradient id="chipGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00FFFF" />
                      <stop offset="100%" stopColor="#0099FF" />
                    </linearGradient>
                  </defs>
                  {/* Outer square */}
                  <rect
                    x="10"
                    y="10"
                    width="100"
                    height="100"
                    rx="4"
                    fill="none"
                    stroke="url(#chipGrad1)"
                    strokeWidth="2"
                  />
                  {/* Inner grid */}
                  <rect
                    x="20"
                    y="20"
                    width="80"
                    height="80"
                    rx="2"
                    fill="none"
                    stroke="url(#chipGrad1)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  {/* Cores */}
                  <circle cx="35" cy="35" r="4" fill="url(#chipGrad1)" />
                  <circle cx="60" cy="35" r="4" fill="url(#chipGrad1)" />
                  <circle cx="85" cy="35" r="4" fill="url(#chipGrad1)" />
                  <circle cx="35" cy="60" r="4" fill="url(#chipGrad1)" />
                  <circle cx="60" cy="60" r="5" fill="url(#chipGrad1)" opacity="0.9" />
                  <circle cx="85" cy="60" r="4" fill="url(#chipGrad1)" />
                  <circle cx="35" cy="85" r="4" fill="url(#chipGrad1)" />
                  <circle cx="60" cy="85" r="4" fill="url(#chipGrad1)" />
                  <circle cx="85" cy="85" r="4" fill="url(#chipGrad1)" />
                  {/* Connecting lines */}
                  <line x1="35" y1="35" x2="60" y2="60" stroke="url(#chipGrad1)" strokeWidth="1" opacity="0.4" />
                  <line x1="85" y1="35" x2="60" y2="60" stroke="url(#chipGrad1)" strokeWidth="1" opacity="0.4" />
                  <line x1="35" y1="85" x2="60" y2="60" stroke="url(#chipGrad1)" strokeWidth="1" opacity="0.4" />
                  <line x1="85" y1="85" x2="60" y2="60" stroke="url(#chipGrad1)" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
              <h3>AI Processing Unit</h3>
              <p>Distributed computing cores for real-time AI inference</p>
        </div>

            {/* Data Flow Component */}
            <div className="chip-card">
              <div className="chip-visual">
                <svg className="ai-chip" viewBox="0 0 120 120" fill="none">
                  <defs>
                    <linearGradient id="chipGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333EA" />
                      <stop offset="100%" stopColor="#FF00FF" />
                    </linearGradient>
                  </defs>
                  {/* Cylinders for storage */}
                  <rect
                    x="25"
                    y="25"
                    width="25"
                    height="70"
                    rx="3"
                    fill="none"
                    stroke="url(#chipGrad2)"
                    strokeWidth="2"
                  />
                  <ellipse cx="37.5" cy="25" rx="12.5" ry="6" fill="none" stroke="url(#chipGrad2)" strokeWidth="2" />
                  <rect
                    x="70"
                    y="25"
                    width="25"
                    height="70"
                    rx="3"
                    fill="none"
                    stroke="url(#chipGrad2)"
                    strokeWidth="2"
                  />
                  <ellipse cx="82.5" cy="25" rx="12.5" ry="6" fill="none" stroke="url(#chipGrad2)" strokeWidth="2" />
                  {/* Flow arrows */}
                  <path
                    d="M50 40 Q60 45 70 40"
                    fill="none"
                    stroke="url(#chipGrad2)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <path
                    d="M70 60 Q60 65 50 60"
                    fill="none"
                    stroke="url(#chipGrad2)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle cx="60" cy="52" r="3" fill="url(#chipGrad2)" />
                </svg>
              </div>
              <h3>Data Pipeline</h3>
              <p>High-throughput data streaming and processing</p>
            </div>

            {/* Network Component */}
            <div className="chip-card">
              <div className="chip-visual">
                <svg className="ai-chip" viewBox="0 0 120 120" fill="none">
                  <defs>
                    <linearGradient id="chipGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B35" />
                      <stop offset="100%" stopColor="#FF00FF" />
                    </linearGradient>
                  </defs>
                  {/* Central hub */}
                  <circle cx="60" cy="60" r="8" fill="url(#chipGrad3)" />
                  {/* Outer nodes */}
                  <circle cx="30" cy="30" r="6" fill="none" stroke="url(#chipGrad3)" strokeWidth="2" />
                  <circle cx="90" cy="30" r="6" fill="none" stroke="url(#chipGrad3)" strokeWidth="2" />
                  <circle cx="30" cy="90" r="6" fill="none" stroke="url(#chipGrad3)" strokeWidth="2" />
                  <circle cx="90" cy="90" r="6" fill="none" stroke="url(#chipGrad3)" strokeWidth="2" />
                  {/* Connection lines */}
                  <line x1="36" y1="36" x2="54" y2="54" stroke="url(#chipGrad3)" strokeWidth="1.5" />
                  <line x1="84" y1="36" x2="66" y2="54" stroke="url(#chipGrad3)" strokeWidth="1.5" />
                  <line x1="36" y1="84" x2="54" y2="66" stroke="url(#chipGrad3)" strokeWidth="1.5" />
                  <line x1="84" y1="84" x2="66" y2="66" stroke="url(#chipGrad3)" strokeWidth="1.5" />
                </svg>
              </div>
              <h3>Network Mesh</h3>
              <p>Distributed node connectivity for global access</p>
            </div>

            {/* Cache Component */}
            <div className="chip-card">
              <div className="chip-visual">
                <svg className="ai-chip" viewBox="0 0 120 120" fill="none">
                  <defs>
                    <linearGradient id="chipGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00FF88" />
                      <stop offset="100%" stopColor="#00FFFF" />
                    </linearGradient>
                  </defs>
                  {/* Stacked memory blocks */}
                  <rect
                    x="20"
                    y="30"
                    width="80"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="url(#chipGrad4)"
                    strokeWidth="2"
                  />
                  <rect
                    x="20"
                    y="50"
                    width="80"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="url(#chipGrad4)"
                    strokeWidth="2"
                  />
                  <rect
                    x="20"
                    y="70"
                    width="80"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="url(#chipGrad4)"
                    strokeWidth="2"
                  />
                  {/* Activity indicators */}
                  <circle cx="25" cy="36" r="2.5" fill="url(#chipGrad4)" />
                  <circle cx="35" cy="56" r="2.5" fill="url(#chipGrad4)" />
                  <circle cx="45" cy="76" r="2.5" fill="url(#chipGrad4)" />
                </svg>
              </div>
              <h3>Distributed Cache</h3>
              <p>Ultra-fast in-memory data retrieval</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="infra-stats">
            <div className="stat-item">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <div className="stat-value">10Gbps</div>
                <div className="stat-label">Throughput</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🔄</div>
              <div className="stat-content">
                <div className="stat-value">Sub-100ms</div>
                <div className="stat-label">Round Trip</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">99.99%</div>
                <div className="stat-label">SLA</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🌍</div>
              <div className="stat-content">
                <div className="stat-value">6 Regions</div>
                <div className="stat-label">Global</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsLoginOpen(false)}>
              ✕
            </button>
            <div className="login-container">
              <h2 className="modal-title">Welcome Back</h2>
              <p className="modal-subtitle">Access your robotics dashboard</p>

              <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-login">
                  Sign In
                </button>
              </form>

              <div className="divider">Or continue with</div>

              <div className="oauth-buttons">
                <button className="oauth-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  </svg>
                  Google
                </button>
                <button className="oauth-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
          </div>

              <p className="signup-link">
                Don't have an account? <a href="#">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Modal */}
      {isDocsOpen && (
        <div className="modal-overlay" onClick={() => setIsDocsOpen(false)}>
          <div className="modal-content docs-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsDocsOpen(false)}>
              ✕
            </button>
            <div className="docs-container">
              <h2 className="modal-title">Documentation</h2>
              <div className="docs-search">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={docsSearch}
                  onChange={(e) => setDocsSearch(e.target.value)}
                />
              </div>
              <div className="docs-list">
                <div className="doc-item" onClick={() => window.location.href = '/docs/intro'}>
                  <h3>📚 Start Reading</h3>
                  <p>Begin your journey with the book documentation</p>
                </div>
                {filteredDocs.map((doc) => (
                  <div key={doc.id} className="doc-item" onClick={() => window.location.href = '/docs/intro'}>
                    <h3>{doc.title}</h3>
                    <p>{doc.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>rROBOTICS</h4>
            <p>Building the future of robotics and AI.</p>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">API Reference</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 rROBOTICS. All rights reserved.</p>
        </div>
      </footer>
      </div>
  )
}
