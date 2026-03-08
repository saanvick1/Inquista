# Inquista — AI-Powered Academic Research Assistant

**Inquista** is a full-stack web application that guides students through every stage of the academic research workflow — from discovering novel, conference-grade research topics to identifying literature gaps, designing rigorous experiments, and maintaining a persistent digital research notebook.

Built for students targeting **ISEF**, **NeurIPS**, **Nature**, **Science**, and other top-tier venues, Inquista leverages large language models to accelerate the ideation and methodology phases of research while maintaining scientific rigor.

---

## Key Features

### 1. AI Topic Generator
- Generates **3 unique, interdisciplinary research ideas** per request, combining unexpected fields (e.g., acoustics + environmental science, game theory + epidemiology)
- Each topic includes a **specific, testable research question** and relevant tags
- Scored across three dimensions: **Novelty** (how unprecedented), **Feasibility** (student-executable), and **Impact** (significance of potential results)
- Topics can be **saved** to a persistent collection for later reference
- High-temperature generation ensures every set of ideas is genuinely different

### 2. Literature Gap Finder
- Analyzes any research area to surface the **single most impactful, underexplored gap** in existing literature
- Provides a thorough explanation of why the gap exists, its potential impact, difficulty level, and a **concrete "Where to Start" suggestion**
- Each analysis returns a different perspective — run it multiple times to explore various angles
- Focused on gaps that lead to publishable, real-world research

### 3. Experiment Designer
- Takes any research idea and generates a **complete experimental methodology** including:
  - Formal, testable hypothesis
  - Independent, dependent, and control variables
  - Step-by-step methodology (4–5 phases)
  - Specific evaluation metrics
- **Every generation produces a fundamentally different experimental approach**, even for the same topic — varying methodology paradigms (comparative, ablation, longitudinal, simulation-based, mixed-methods), hypothesis angles, and evaluation strategies
- All designs are scientifically correct, rigorous, and practically executable

### 4. Research Notebook
- Full **CRUD (Create, Read, Update, Delete)** digital research notebook with persistent storage
- Organize entries by folder and type (notes, observations, hypotheses)
- Styled with a lined-paper aesthetic for a familiar research journal feel
- All entries saved to a PostgreSQL database — nothing is lost between sessions

### 5. Dashboard
- Central hub displaying saved research topics and quick-access navigation
- At-a-glance view of your research portfolio with novelty/feasibility/impact scores

---

## Technical Architecture

### Stack
| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, TypeScript, Vite, TanStack Query, Wouter |
| **UI** | Tailwind CSS, shadcn/ui, Lucide Icons, glassmorphic design system |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL with Drizzle ORM |
| **AI** | OpenAI GPT API with structured JSON output |
| **Typography** | Space Grotesk (display), Inter (UI), Libre Baskerville (reading) |

### Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components (sidebar, layout)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # API client, utilities
│   │   ├── pages/            # Route-level page components
│   │   │   ├── home.tsx              # Dashboard
│   │   │   ├── topic-generator.tsx   # AI topic generation
│   │   │   ├── gap-finder.tsx        # Literature gap analysis
│   │   │   ├── experiment-designer.tsx # Experiment methodology
│   │   │   └── notebook.tsx          # Research notebook
│   │   └── App.tsx           # Router configuration
│   └── index.html            # Entry point with meta tags
├── server/
│   ├── index.ts              # Express server entry
│   ├── routes.ts             # API routes + AI integration
│   ├── storage.ts            # Database storage interface (Drizzle)
│   └── db.ts                 # PostgreSQL connection
├── shared/
│   └── schema.ts             # Database schema + Zod validation
└── drizzle.config.ts         # Drizzle ORM configuration
```

### Database Schema
- **`saved_topics`** — Persists generated research topics with scores (novelty, feasibility, impact), tags, and research questions
- **`notebook_entries`** — Stores research notes organized by folder and type, with timestamps
- **`conversations`** / **`messages`** — Conversation history infrastructure for future AI chat features
- **`users`** — User accounts with UUID-based primary keys

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/generate-topics` | Generate 3 novel research topics with scores |
| `POST` | `/api/find-gaps` | Identify the most impactful literature gap |
| `POST` | `/api/design-experiment` | Design a complete experimental methodology |
| `GET` | `/api/saved-topics` | Retrieve all saved topics |
| `POST` | `/api/saved-topics` | Save a generated topic |
| `DELETE` | `/api/saved-topics/:id` | Remove a saved topic |
| `GET` | `/api/notebook` | List all notebook entries |
| `GET` | `/api/notebook/:id` | Get a specific notebook entry |
| `POST` | `/api/notebook` | Create a new notebook entry |
| `PATCH` | `/api/notebook/:id` | Update a notebook entry |
| `DELETE` | `/api/notebook/:id` | Delete a notebook entry |

---

## Design Philosophy

- **Purple primary palette** with amber/orange accent gradients — conveying academic sophistication and creative energy
- **Glassmorphic cards** (`.glass-panel`) with subtle transparency and blur effects
- **Responsive layout** with collapsible sidebar navigation
- All interactive elements include `data-testid` attributes for automated testing
- Error states are explicit — no silent fallbacks

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- OpenAI API key (or compatible endpoint)

### Installation
```bash
git clone https://github.com/saanvick1/Inquista.git
cd Inquista
npm install
```

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@host:port/database
AI_INTEGRATIONS_OPENAI_API_KEY=your_openai_api_key
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
```

### Database Setup
```bash
npm run db:push
```

### Run
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

---

## AI Prompt Engineering

Each AI feature uses carefully crafted prompts with:
- **Structured JSON output** (`response_format: { type: "json_object" }`) for reliable parsing
- **Randomization seeds** to ensure unique results across repeated calls
- **High temperature settings** (0.9–1.0) for maximum creativity while maintaining accuracy
- **Domain-specific instructions** that enforce scientific rigor, interdisciplinary thinking, and practical feasibility
- **Negative constraints** (e.g., "must NOT be standard/common topics") to push beyond obvious answers

---

## License

MIT

---

*Built with purpose — for the next generation of student researchers.*
