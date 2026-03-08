import { useState } from "react";
import { Lightbulb, Sparkles, ArrowRight, BookmarkPlus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function TopicGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTopic, setGeneratedTopic] = useState<null | any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedTopic({
        topic: "Using Meta-Learning to Detect Early Osteoporosis",
        question: "Can meta-learning improve classification accuracy for bone density abnormalities in low-resolution X-rays compared to standard CNNs?",
        scores: {
          novelty: 8,
          feasibility: 7,
          impact: 9
        },
        tags: ["Machine Learning", "Medical Imaging", "PyTorch"]
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <div className="bg-blue-500/10 p-2 rounded-lg text-blue-600">
            <Lightbulb className="w-6 h-6" />
          </div>
          Topic Generator
        </h1>
        <p className="text-muted-foreground font-serif text-lg">
          Discover novel research questions tailored to your field of study.
        </p>
      </div>

      <Card className="glass-panel border-primary/20">
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
              <Select defaultValue="ai">
                <SelectTrigger>
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">Artificial Intelligence</SelectItem>
                  <SelectItem value="medicine">Medicine & Biology</SelectItem>
                  <SelectItem value="climate">Climate Science</SelectItem>
                  <SelectItem value="economics">Economics</SelectItem>
                  <SelectItem value="neuroscience">Neuroscience</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty Level</label>
              <Select defaultValue="undergrad">
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highschool">High School</SelectItem>
                  <SelectItem value="undergrad">Undergraduate</SelectItem>
                  <SelectItem value="grad">Graduate / Masters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Specific Interests or Keywords (Optional)</label>
            <Input placeholder="e.g., bone density, low-resolution imaging, neural networks..." />
          </div>

          <Button 
            className="w-full text-lg h-12 shadow-lg shadow-primary/20 rounded-xl"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate Novel Ideas
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedTopic && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Suggested Idea</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleGenerate}>
                Make it more unique
              </Button>
              <Button size="sm" className="gap-2">
                <BookmarkPlus className="w-4 h-4" /> Save to Notebook
              </Button>
            </div>
          </div>

          <Card className="border-l-4 border-l-primary shadow-md">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Topic</h3>
                <p className="text-2xl font-display font-semibold leading-tight">
                  {generatedTopic.topic}
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Research Question</h3>
                <p className="text-lg font-serif italic text-foreground/90">
                  "{generatedTopic.question}"
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {generatedTopic.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">{tag}</Badge>
                ))}
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-sm font-bold text-foreground mb-4">AI Research Idea Score</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-500/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{generatedTopic.scores.novelty}/10</div>
                    <div className="text-xs font-semibold text-blue-600/80 uppercase">Novelty</div>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">{generatedTopic.scores.feasibility}/10</div>
                    <div className="text-xs font-semibold text-emerald-600/80 uppercase">Feasibility</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">{generatedTopic.scores.impact}/10</div>
                    <div className="text-xs font-semibold text-purple-600/80 uppercase">Impact</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}