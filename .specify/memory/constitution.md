<!--
Sync Impact Report:
Version change: 1.0.0 → 2.0.0 (MAJOR - hackathon-specific governance and scoring system)
List of modified principles: All principles - aligned to Physical AI & Humanoid Robotics textbook project
Added sections: Hackathon Scoring System, Technical Stack Requirements, Bonus Point Opportunities
Templates requiring updates: ✅ All templates support hackathon workflow
Follow-up TODOs: None
-->

# Physical AI & Humanoid Robotics Textbook Hackathon Constitution

## Project Overview

**Hackathon I**: Create a comprehensive textbook for teaching Physical AI & Humanoid Robotics courses. The future of work will be a partnership between people, intelligent agents (AI Software), and robots. This shift creates massive demand for new skills that our textbook will address through Spec-Driven Development methodology.

## Core Principles

### I. Spec-Driven Book Development
All textbook content MUST begin with a specification in `/specs/[chapter-name]/spec.md`. Each chapter requires clear learning objectives, measurable outcomes, and acceptance criteria. No content creation without prior specification approval.

### II. Test-First Content Creation (NON-NEGOTIABLE)
TDD applies to content: Learning tests written → Tests fail → Content created → Tests pass → Content refined. Each chapter must include knowledge assessments, practical exercises, and integration tests where applicable. Red-Green-Refactor cycle strictly enforced.

### III. Independent Chapter Delivery
Each chapter must be independently readable, deployable, and demonstrable. Chapters must deliver educational value independently - no partial implementations that require other chapters to be useful.

### IV. Docusaurus-First Publishing
All content MUST be created using Docusaurus framework and deployed to GitHub Pages. Content must be accessible via web interface, CLI tools, and API. Support both markdown and interactive content formats.

### V. Integrated RAG Chatbot
Every chapter must support the integrated RAG chatbot using OpenAI Agents/ChatKit SDKs, FastAPI, Neon Serverless Postgres, and Qdrant Cloud. The chatbot must answer questions based on user-selected text and provide contextual learning support.

### VI. Hackathon Incremental Delivery
Start with core textbook functionality and add features incrementally. Base functionality (100 points) MUST include book creation and deployment. Bonus features (up to 200 additional points) include personalization, authentication, and advanced AI features.

## Technical Stack Requirements

### Core Technology (Mandatory - 100 points)
- **Frontend**: Docusaurus for textbook creation and deployment
- **Backend**: FastAPI for chatbot and API services
- **Database**: Neon Serverless Postgres for user data and content
- **Vector DB**: Qdrant Cloud Free Tier for RAG functionality
- **AI/ML**: OpenAI Agents/ChatKit SDKs for intelligent interactions
- **Deployment**: GitHub Pages for textbook hosting
- **Development**: SpecKit Plus and Claude Code for writing and management

### Quality Requirements
- Unit tests: 90%+ coverage for chatbot and API functionality
- Integration tests: All chatbot responses and content delivery flows
- Contract tests: API boundaries between frontend and backend
- Performance tests: Chatbot response times under 2 seconds

## Hackathon Scoring System

### Base Functionality (100 points)
- [ ] **Spec-Driven Book Creation** (30 points): Complete textbook written using Docusaurus and SpecKit Plus, deployed to GitHub Pages
- [ ] **Integrated RAG Chatbot** (40 points): Functional chatbot using OpenAI Agents, FastAPI, Neon, and Qdrant that answers questions about book content
- [ ] **Content Quality** (30 points): Complete educational content with proper structure, examples, and exercises

### Bonus Opportunities (up to 200 additional points)

#### Advanced AI & Automation (50 points)
- [ ] **Claude Code Subagents** (25 points): Create and use reusable Claude Code Subagents for content creation and review
- [ ] **Agent Skills** (25 points): Develop and utilize custom Agent Skills for textbook project automation

#### Personalization & Authentication (50 points)
- [ ] **Better-Auth Integration** (30 points): Implement sign up/sign in using Better-Auth.com
- [ ] **Background Assessment** (20 points): Collect user software/hardware background during signup for content personalization

#### Content Personalization (50 points)
- [ ] **Dynamic Content Adaptation** (30 points): Logged users can personalize chapter content based on their background
- [ ] **Adaptive Learning Paths** (20 points): Content automatically adjusts based on user skill level and background

#### Multi-language Support (50 points)
- [ ] **Urdu Translation** (30 points): Logged users can translate content to Urdu via chapter buttons
- [ ] **Multi-language Infrastructure** (20 points): Robust translation system supporting future language additions

## Development Workflow

### Code Review Process
- All code changes require peer review using spec-driven approach
- Reviewers must verify compliance with hackathon scoring criteria
- Automated tests must pass before merge
- Chatbot responses must be validated for accuracy and safety

### Release Management
- Semantic versioning: MAJOR.MINOR.PATCH
- New features must be demo-ready for hackathon judging
- GitHub Pages deployment must be automatic and reliable
- Chatbot responses must be logged for quality assurance

### Quality Gates
- All textbook content must pass educational quality review
- Chatbot must not hallucinate or provide incorrect information
- User data must be handled securely and privately
- Performance must meet educational platform standards

## Educational Quality Standards

### Content Requirements
- Each chapter MUST have clear learning objectives and outcomes
- All technical concepts must include practical examples and exercises
- Content must be accessible to learners with varying technical backgrounds
- Real-world applications must be integrated throughout

### Assessment Standards
- Knowledge checks must validate chapter-specific learning objectives
- Practical exercises must be completable with provided tools and resources
- Integration projects must demonstrate understanding across multiple concepts
- Chatbot assistance must enhance, not replace, critical thinking

## Governance

This hackathon constitution supersedes all other practices and guidelines. All project decisions must align with creating educational value and meeting hackathon scoring criteria.

**Amendment Process**:
1. Changes must support hackathon scoring objectives
2. Review and approval from hackathon organizers
3. Impact assessment on point totals and timeline
4. Documentation of technical and educational rationale
5. Communication to all team members

All pull requests and code reviews must verify compliance with this constitution and hackathon requirements. Technical complexity must be justified by educational value and scoring potential.

**Version**: 2.0.0 | **Ratified**: 2025-11-29 | **Last Amended**: 2025-11-29
