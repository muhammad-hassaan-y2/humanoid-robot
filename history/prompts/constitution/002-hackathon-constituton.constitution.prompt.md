---
id: 002
title: Hackathon Constitution Update
stage: constitution
date: 2025-11-29
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Hassaan
command: /sp.constitution
labels: ["hackathon", "education", "ai", "robotics", "scoring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - No tests required for constitution update
---

## Prompt

Let's build a constitution rules for our hackathon project **Hackathon I: Create a textbook for teaching Physical AI & Humanoid Robotics Course   The future of work will be partenership between people, intelligent agents (AI Software), and robots. This shift won't necessarily eliminate jobs but will change what humans do, leading to a massive demands for new skills. We have already written a book on AI agents. Therefore, we want you to write a textbook to teach a course in Physical AI & Humanoid Robotics. 1- AI/Spec-Driven Book Creation: Write a book using Docasurus and deploy it to Github Pages. You will use Speckit Plus and Calude code to write the book. 2- Integrated RAG Cgatbot Development: Build and embed a Retrieval-Augmented Generation(RAG_ Chatbot with in teh published book. The chatbot, utilizing the openAI Agents/Chatkit SDKs, FASTAPI, Neon Serverless Postgres database and Qdrant Cloud Free Tier, must be able to answer user questions about the book's content, including answering quetions based only on text selected by the user. 3. Paticipabnts will recive points out of 100, for base functionality defined above. 4. Participants can earn up to 50 extra bonus points by creating and using reusable intelligence cia claude code Subagents and Agent Skills in the book project. 5. Paticipants can receive up to 50 extra bonus points if they implement sign and signin using Better-Auth.com at teh signup you will ask questions from teh user about their software and hardware background. Knowing teh background of teh user we will be able to personalize teh content. 6. Participants can receive up to 50 extra bonus points if teh logged user can personalise teh content in teh chapters by pressing a button at teh start of east chapter. 7. Participants can receive up to 50 extra bonus points if teh logged user can translate teh content in Urdu in teh chapters by pressing a button at teh start of each chapter.

## Response snapshot

Updated constitution to version 2.0.0 with comprehensive hackathon-specific governance:

**Major changes implemented:**
- Project renamed to "Physical AI & Humanoid Robotics Textbook Hackathon Constitution"
- All 6 core principles rewritten for educational content creation and hackathon context
- Added Technical Stack Requirements section with specific tech requirements
- Implemented comprehensive Hackathon Scoring System with:
  - Base functionality (100 points): Book creation, RAG chatbot, content quality
  - Bonus opportunities (up to 200 points across 4 categories)
    - Advanced AI & Automation (50 points)
    - Personalization & Authentication (50 points)
    - Content Personalization (50 points)
    - Multi-language Support (50 points)
- Added Educational Quality Standards for content requirements and assessments
- Updated governance to align with hackathon scoring and educational objectives

## Outcome

- ✅ Impact: Established comprehensive hackathon governance framework supporting both educational quality and competitive scoring
- 🧪 Tests: No tests required for constitution document
- 📁 Files: Updated .specify/memory/constitution.md with hackathon-specific principles, scoring system, and technical requirements
- 🔁 Next prompts: Ready for /sp.spec commands to begin chapter specifications and feature planning
- 🧠 Reflection: Constitution now provides clear competitive framework while maintaining educational quality standards and technical consistency

## Evaluation notes (flywheel)

- Failure modes observed: None - constitution successfully updated with all hackathon requirements incorporated
- Graders run and results (PASS/FAIL): N/A - constitution document
- Prompt variant (if applicable): Hackathon-specific constitution update with scoring system
- Next experiment: Begin chapter specification using /sp.spec to test constitution compliance and educational framework