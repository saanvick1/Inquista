import { useState } from "react";
import { Lightbulb, Sparkles, BookmarkPlus, SlidersHorizontal, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Hardcoded array of highly novel ideas to simulate diverse, impressive AI generation
const MOCK_NOVEL_IDEAS = [
  [
    {
      topic: "Quantum-Inspired Algorithms for Protein Folding Prediction",
      question: "Can tensor network approximations of quantum states accelerate the folding path prediction of intrinsically disordered proteins compared to AlphaFold2?",
      scores: { novelty: 10, feasibility: 6, impact: 9 },
      tags: ["Quantum Computing", "Bioinformatics", "Structural Biology"]
    },
    {
      topic: "Acoustic Metamaterials for Passive Air Purification",
      question: "How do 3D-printed labyrinthine acoustic metamaterials mitigate ambient VOCs (Volatile Organic Compounds) through resonant airflow manipulation?",
      scores: { novelty: 9, feasibility: 8, impact: 8 },
      tags: ["Materials Science", "Environmental Engineering", "Acoustics"]
    },
    {
      topic: "Neuromorphic Vision Sensors for Early Wildfire Detection",
      question: "Can event-based cameras out-perform traditional thermal imaging in detecting ignition-stage wildfires under thick canopy cover with microsecond latency?",
      scores: { novelty: 8, feasibility: 7, impact: 10 },
      tags: ["Neuromorphic Engineering", "Climate Tech", "Computer Vision"]
    }
  ],
  [
    {
      topic: "Bacterial Cellulose as a Bio-degradable Battery Separator",
      question: "Does the nano-porous structure of Komagataeibacter xylinus cellulose improve ion transport efficiency in solid-state lithium-ion batteries?",
      scores: { novelty: 9, feasibility: 7, impact: 9 },
      tags: ["Energy Storage", "Biomaterials", "Electrochemistry"]
    },
    {
      topic: "LLMs as Autonomous Agents in Cryptographic Vulnerability Discovery",
      question: "To what extent can multi-agent LLM systems autonomously detect zero-day logic flaws in newly deployed DeFi smart contracts without pre-trained patterns?",
      scores: { novelty: 9, feasibility: 8, impact: 10 },
      tags: ["Cybersecurity", "Blockchain", "Artificial Intelligence"]
    },
    {
      topic: "Microplastic Degradation via Engineered Nematode Gut Microbiome",
      question: "Can the introduction of modified Ideonella sakaiensis into C. elegans enhance the biodegradation rate of PET microplastics in soil environments?",
      scores: { novelty: 10, feasibility: 5, impact: 10 },
      tags: ["Bioremediation", "Microbiology", "Ecology"]
    }
  ],
  [
    {
      topic: "Predicting Solar Flare Trajectories using Graph Neural Networks",
      question: "Can spatiotemporal graph neural networks modeling solar magnetic flux topology predict the exact Earth-impact coordinates of Coronal Mass Ejections (CMEs)?",
      scores: { novelty: 8, feasibility: 7, impact: 9 },
      tags: ["Astrophysics", "Deep Learning", "Space Weather"]
    },
    {
      topic: "Sonogenetic Control of Targeted Drug Delivery Nanoparticles",
      question: "How efficiently can focused low-frequency ultrasound trigger the release of chemotherapeutics from lipid-polymer hybrid nanoparticles in deep tissue?",
      scores: { novelty: 9, feasibility: 6, impact: 10 },
      tags: ["Nanomedicine", "Oncology", "Biophysics"]
    },
    {
      topic: "Decentralized Federated Learning for Privacy-Preserving Epidemic Forecasting",
      question: "Does peer-to-peer federated learning using homomorphic encryption maintain high predictive accuracy for localized infectious disease outbreaks while ensuring zero patient data leakage?",
      scores: { novelty: 8, feasibility: 9, impact: 9 },
      tags: ["Epidemiology", "Cryptography", "Machine Learning"]
    }
  ]
];

export default function TopicGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTopics, setGeneratedTopics] = useState<any[] | null>(null);
  const [generationCount, setGenerationCount] = useState(0);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Cycle through our mock idea sets
    const nextIndex = generationCount % MOCK_NOVEL_IDEAS.length;
    
    setTimeout(() => {
      setGeneratedTopics(MOCK_NOVEL_IDEAS[nextIndex]);
      setGenerationCount(prev => prev + 1);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600">
            <Trophy className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            High-Impact Topic Generator
          </h1>
        </div>
        <p className="text-muted-foreground font-serif text-lg">
          Discover highly novel, competition-grade research ideas capable of standing out at ISEF or top-tier conferences.
        </p>
      </div>

      <Card className="glass-panel border-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Generation Parameters
          </CardTitle>
          <CardDescription>Configure the AI to find the perfect research direction for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Field of Study</label>
              <Select defaultValue="multidisciplinary">
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multidisciplinary">Multidisciplinary (Highly Recommended)</SelectItem>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                  <SelectItem value="medicine">Bioengineering & Medicine</SelectItem>
                  <SelectItem value="climate">Environmental Science</SelectItem>
                  <SelectItem value="physics">Physics & Astronomy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Tier</label>
              <Select defaultValue="isef">
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="isef">ISEF / Top Science Fair</SelectItem>
                  <SelectItem value="undergrad">Undergrad Journal Publication</SelectItem>
                  <SelectItem value="conference">Top-tier Conference (e.g., NeurIPS, Nature)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Specific Interests or Keywords (Optional)</label>
            <Input placeholder="e.g., quantum computing, sustainable materials, neuromorphic..." />
          </div>

          <Button 
            className="w-full text-lg h-14 shadow-lg shadow-amber-500/20 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Mining Global Literature...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate 3 Novel Ideas
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedTopics && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Breakthrough Candidates
            </h2>
            <Button variant="outline" onClick={handleGenerate}>
              <Sparkles className="w-4 h-4 mr-2" /> Generate Different Ideas
            </Button>
          </div>

          <div className="grid gap-6">
            {generatedTopics.map((topic, index) => (
              <Card key={index} className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Topic {index + 1}</h3>
                        <p className="text-2xl font-display font-semibold leading-tight">
                          {topic.topic}
                        </p>
                      </div>

                      <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-500/20">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Primary Research Question</h3>
                        <p className="text-lg font-serif italic text-foreground/90">
                          "{topic.question}"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {topic.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-muted/50">{tag}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Score Panel */}
                    <div className="bg-muted/30 p-4 rounded-xl border shrink-0 md:w-48 flex flex-col justify-center space-y-3">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-muted-foreground uppercase mb-1">Novelty</div>
                        <div className="text-2xl font-bold text-amber-600">{topic.scores.novelty}/10</div>
                      </div>
                      <div className="h-px bg-border w-full"></div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-muted-foreground uppercase mb-1">Impact</div>
                        <div className="text-2xl font-bold text-emerald-600">{topic.scores.impact}/10</div>
                      </div>
                      <div className="h-px bg-border w-full"></div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-muted-foreground uppercase mb-1">Feasibility</div>
                        <div className="text-2xl font-bold text-blue-600">{topic.scores.feasibility}/10</div>
                      </div>
                      <Button size="sm" className="w-full mt-2 gap-2 bg-foreground text-background hover:bg-foreground/90">
                        <BookmarkPlus className="w-4 h-4" /> Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}