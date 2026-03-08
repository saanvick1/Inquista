import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSavedTopicSchema, insertNotebookEntrySchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // --- AI Topic Generation ---
  app.post("/api/generate-topics", async (req, res) => {
    try {
      const { field = "multidisciplinary", tier = "isef", keywords = "" } = req.body;

      const prompt = `You are an elite research advisor who identifies genuinely novel, high-impact research topics that could win ISEF or be published at top conferences like NeurIPS, Nature, or Science.

Generate exactly 3 completely unique, never-done-before research ideas. Each must be interdisciplinary, combining at least 2 distinct fields in a surprising way.

Parameters:
- Field focus: ${field}
- Target tier: ${tier}
- User interests: ${keywords || "open to anything"}

For each idea, provide:
1. A concise topic title
2. A specific, testable research question
3. 3-4 relevant tags (fields/technologies involved)
4. Scores from 1-10 for:
   - Novelty (how unprecedented is this idea?)
   - Feasibility (can a motivated student actually do this?)
   - Impact (how significant could the results be?)

CRITICAL RULES:
- These must NOT be standard/common research topics
- Combine unexpected fields (e.g., acoustics + environmental science, game theory + epidemiology)
- The research question must be specific and testable
- Each idea must be completely different from the others

Respond in this exact JSON format:
{
  "topics": [
    {
      "topic": "title here",
      "question": "specific research question here",
      "tags": ["tag1", "tag2", "tag3"],
      "scores": { "novelty": 8, "feasibility": 7, "impact": 9 }
    }
  ]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 1.0,
      });

      const content = response.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);
      res.json(parsed);
    } catch (error) {
      console.error("Error generating topics:", error);
      res.status(500).json({ error: "Failed to generate topics" });
    }
  });

  // --- AI Gap Finder ---
  app.post("/api/find-gaps", async (req, res) => {
    try {
      const { topic } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Topic description is required" });
      }

      const seed = Math.floor(Math.random() * 1000000);

      const prompt = `You are a senior research analyst who identifies unexplored research gaps in academic literature.

Analyze the following research area and identify the single MOST IMPACTFUL and underexplored research gap that has not been adequately addressed in existing literature:

Topic: "${topic}"

Randomization seed (use this to vary your perspective): ${seed}

Provide:
1. A clear, specific title for the gap
2. A thorough explanation of why this gap exists, what has been overlooked, and why it matters (3-5 sentences)
3. The potential impact if this gap were filled (High/Medium/Low)
4. The difficulty of addressing this gap (Easy/Medium/Hard)
5. A concrete suggestion for how a researcher could begin addressing this gap

Focus on a gap that:
- Is genuinely underexplored (not just "more data needed")
- Could lead to a publishable paper or conference presentation
- Combines insights from multiple subfields
- Has real-world implications
- Is scientifically accurate and grounded in reality

IMPORTANT: Only return ONE gap — the single best opportunity you can identify. Make sure it is factually correct and defensible.

Respond in this exact JSON format:
{
  "gaps": [
    {
      "title": "gap title",
      "description": "detailed description of why this gap exists and what is missing",
      "impact": "High",
      "difficulty": "Medium",
      "suggestion": "concrete next step for a researcher"
    }
  ]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.9,
      });

      const content = response.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);
      res.json(parsed);
    } catch (error) {
      console.error("Error finding gaps:", error);
      res.status(500).json({ error: "Failed to find research gaps" });
    }
  });

  // --- AI Experiment Designer ---
  app.post("/api/design-experiment", async (req, res) => {
    try {
      const { topic } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Research idea is required" });
      }

      const seed = Math.floor(Math.random() * 1000000);

      const prompt = `You are a methodologist who designs rigorous experimental frameworks for academic research.

Design a complete experimental methodology for the following research idea:

Research Idea: "${topic}"

Randomization seed (use this to explore a COMPLETELY DIFFERENT experimental angle each time): ${seed}

CRITICAL INSTRUCTION: You MUST design a fundamentally different experimental approach every time this prompt is called, even for the same topic. Vary these dimensions:
- Use a different core methodology paradigm (e.g., comparative study vs ablation study vs longitudinal study vs case-control vs simulation-based vs survey-based vs mixed-methods)
- Frame a different hypothesis angle (e.g., effectiveness vs efficiency vs fairness vs scalability vs generalization)
- Propose different evaluation strategies and metrics
- Suggest different data sources or collection methods

Provide:
1. A formal, testable hypothesis (specific and measurable)
2. Variables:
   - Independent variable(s)
   - Dependent variable(s)
   - Control variable(s)
3. A step-by-step methodology (4-5 clear phases with detailed descriptions)
4. Evaluation metrics (4-5 specific, relevant metrics)

The design MUST be:
- Scientifically correct, reliable, and defensible
- Rigorous enough for a top-tier conference submission
- Specific to the actual topic (absolutely no generic filler)
- Practically executable by a motivated student researcher

Respond in this exact JSON format:
{
  "hypothesis": "formal hypothesis here",
  "variables": {
    "independent": "description",
    "dependent": "description",
    "control": "description"
  },
  "methodology": [
    "Phase 1 - Name: Detailed description of what to do",
    "Phase 2 - Name: Detailed description",
    "Phase 3 - Name: Detailed description",
    "Phase 4 - Name: Detailed description"
  ],
  "metrics": ["Metric 1", "Metric 2", "Metric 3", "Metric 4"]
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 1.0,
      });

      const content = response.choices[0]?.message?.content || "{}";
      const parsed = JSON.parse(content);
      res.json(parsed);
    } catch (error) {
      console.error("Error designing experiment:", error);
      res.status(500).json({ error: "Failed to design experiment" });
    }
  });

  // --- Saved Topics CRUD ---
  app.get("/api/saved-topics", async (_req, res) => {
    try {
      const topics = await storage.getSavedTopics();
      res.json(topics);
    } catch (error) {
      console.error("Error fetching saved topics:", error);
      res.status(500).json({ error: "Failed to fetch saved topics" });
    }
  });

  app.post("/api/saved-topics", async (req, res) => {
    try {
      const parsed = insertSavedTopicSchema.parse(req.body);
      const topic = await storage.createSavedTopic(parsed);
      res.status(201).json(topic);
    } catch (error) {
      console.error("Error saving topic:", error);
      res.status(400).json({ error: "Failed to save topic" });
    }
  });

  app.delete("/api/saved-topics/:id", async (req, res) => {
    try {
      await storage.deleteSavedTopic(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting topic:", error);
      res.status(500).json({ error: "Failed to delete topic" });
    }
  });

  // --- Notebook CRUD ---
  app.get("/api/notebook", async (_req, res) => {
    try {
      const entries = await storage.getNotebookEntries();
      res.json(entries);
    } catch (error) {
      console.error("Error fetching notebook:", error);
      res.status(500).json({ error: "Failed to fetch notebook entries" });
    }
  });

  app.get("/api/notebook/:id", async (req, res) => {
    try {
      const entry = await storage.getNotebookEntry(parseInt(req.params.id));
      if (!entry) return res.status(404).json({ error: "Entry not found" });
      res.json(entry);
    } catch (error) {
      console.error("Error fetching entry:", error);
      res.status(500).json({ error: "Failed to fetch entry" });
    }
  });

  app.post("/api/notebook", async (req, res) => {
    try {
      const parsed = insertNotebookEntrySchema.parse(req.body);
      const entry = await storage.createNotebookEntry(parsed);
      res.status(201).json(entry);
    } catch (error) {
      console.error("Error creating entry:", error);
      res.status(400).json({ error: "Failed to create entry" });
    }
  });

  app.patch("/api/notebook/:id", async (req, res) => {
    try {
      const entry = await storage.updateNotebookEntry(parseInt(req.params.id), req.body);
      if (!entry) return res.status(404).json({ error: "Entry not found" });
      res.json(entry);
    } catch (error) {
      console.error("Error updating entry:", error);
      res.status(500).json({ error: "Failed to update entry" });
    }
  });

  app.delete("/api/notebook/:id", async (req, res) => {
    try {
      await storage.deleteNotebookEntry(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting entry:", error);
      res.status(500).json({ error: "Failed to delete entry" });
    }
  });

  return httpServer;
}
