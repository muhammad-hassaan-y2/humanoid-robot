import React from 'react'
import '../css/custom.css'

const DocumentationHome: React.FC = () => {
  const categories = [
    {
      icon: '📘',
      title: 'Getting Started',
      description: 'Learn the basics and get up to speed',
      items: [
        { title: 'Introduction', path: '/docs/intro' },
        { title: 'Chapter 1: Getting Started', path: '/docs/chapter-1' },
        { title: 'Environment Setup', path: '/docs/tutorial-basics' }
      ]
    },
    {
      icon: '🚀',
      title: 'Advanced Features',
      description: 'Explore powerful capabilities and integrations',
      items: [
        { title: 'Advanced Markdown', path: '/docs/tutorial-basics/markdown-features' },
        { title: 'Deploy Your Site', path: '/docs/tutorial-basics/deploy-your-site' },
        { title: 'Version Management', path: '/docs/tutorial-extras/manage-docs-versions' }
      ]
    },
    {
      icon: '🎨',
      title: 'Customization',
      description: 'Make it your own with themes and components',
      items: [
        { title: 'Styling Your Site', path: '/docs/tutorial-extras/translate-your-site' },
        { title: 'Create Pages', path: '/docs/tutorial-basics/create-a-page' },
        { title: 'Custom Components', path: '/docs/tutorial-extras/faq' }
      ]
    },
    {
      icon: '🔧',
      title: 'Development',
      description: 'Build and extend your documentation',
      items: [
        { title: 'API Reference', path: '/docs/api-docs' },
        { title: 'Markdown Cheatsheet', path: '/docs/tutorial-basics/markdown-features' },
        { title: 'Plugin Development', path: '/docs/tutorial-extras' }
      ]
    }
  ]

  return (
    <div className="docs-home">
      <div className="docs-hero">
        <div className="hero-pattern">
          <div className="floating-icon docs-icon-1">📘</div>
          <div className="floating-icon docs-icon-2">🚀</div>
          <div className="floating-icon docs-icon-3">🎨</div>
          <div className="floating-icon docs-icon-4">🔧</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="glow-cyan">📚 Book</span> Documentation
          </h1>
          <p className="hero-subtitle">
            Comprehensive guides and tutorials for building amazing documentation
          </p>
          <div className="hero-buttons">
            <a href="/docs/intro" className="hero-btn primary">
              🚀 Get Started
            </a>
            <a href="/docs/chapter-1" className="hero-btn secondary">
              📖 Read Book
            </a>
          </div>
        </div>
      </div>

      <div className="docs-grid">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="docs-category">
            <div className="category-header">
              <div className="category-icon">{category.icon}</div>
              <div className="category-text">
                <h2 className="category-title">{category.title}</h2>
                <p className="category-description">{category.description}</p>
              </div>
            </div>
            <div className="category-items">
              {category.items.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.path}
                  className="docs-item-link"
                >
                  <div className="docs-item">
                    <h3 className="docs-item-title">{item.title}</h3>
                    <p className="docs-item-description">
                      Explore this topic and enhance your documentation skills
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="docs-features">
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Smart Search</h3>
          <p>Quickly find what you're looking for with intelligent search and AI-powered recommendations.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Assistant</h3>
          <p>Ask questions about your book content and get instant, context-aware answers.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Real-time Updates</h3>
          <p>Live synchronization and instant updates across all your documentation.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Ready</h3>
          <p>Perfect reading experience on all devices with responsive design.</p>
        </div>
      </div>
    </div>
  )
}

export default DocumentationHome