# Inquista - AI Research Assistant

## Overview
An AI-powered research co-pilot that guides students through the entire research workflow. Built with React + Express + PostgreSQL.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS v4, shadcn/ui, wouter, TanStack Query
- **Backend**: Express 5, Node.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI via Replit AI Integrations (gpt-5.2) - no API key needed

## Architecture
- `client/src/pages/` - React pages (home, topic-generator, gap-finder, experiment-designer, notebook)
- `client/src/components/layout/` - AppLayout with sidebar navigation
- `client/src/lib/api.ts` - Frontend API client functions
- `server/routes.ts` - Express API routes (AI generation + CRUD)
- `server/storage.ts` - Database storage interface using Drizzle
- `server/db.ts` - Database connection
- `shared/schema.ts` - Drizzle schema definitions

## Key Features
1. **Topic Generator** - AI generates 3 novel, ISEF-grade research ideas with novelty/feasibility/impact scores
2. **Gap Finder** - AI analyzes a research area and identifies unexplored opportunities
3. **Experiment Designer** - AI generates complete experimental methodology from a user-provided topic
4. **Research Notebook** - Persistent workspace for notes, ideas, and results (stored in PostgreSQL)
5. **Saved Topics** - Users can save generated topics to their collection

## Database Tables
- `users` - User accounts
- `saved_topics` - Saved research topic ideas with scores
- `notebook_entries` - Research notebook entries with folders
- `conversations` / `messages` - Chat infrastructure (from integration)

## API Routes
- `POST /api/generate-topics` - AI topic generation
- `POST /api/find-gaps` - AI research gap analysis
- `POST /api/design-experiment` - AI experiment design
- `GET/POST/DELETE /api/saved-topics` - Saved topics CRUD
- `GET/POST/PATCH/DELETE /api/notebook` - Notebook CRUD

## Design
- Font pairing: Space Grotesk (display) + Inter (UI) + Libre Baskerville (serif/reading)
- Color: Purple primary with amber accents for topic generator
- Style: Clean academic feel with glassmorphic cards
