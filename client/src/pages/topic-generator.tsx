import { useState } from "react";
import { Lightbulb, Sparkles, BookmarkPlus, SlidersHorizontal, Trophy, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { generateTopics, saveTopic } from "@/lib/api";

interface TopicIdea {
  topic: string;
  question: string;
  tags: string[];
  scores: { novelty: number; feasibility: number; impact: number };
}

export default function TopicGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTopics, setGeneratedTopics] = useState<TopicIdea[] | null>(null);
  const [field, setField] = useState("multidisciplinary");
  const [tier, setTier] = useState("isef");
  const [keywords, setKeywords] = useState("");
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await generateTopics({ field, tier, keywords });
      setGeneratedTopics(result.topics || []);
    } catch (error) {
      toast({ title: "Generation failed", description: "Could not generate topics. Please try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (topic: TopicIdea, index: number) => {
    setSavingIndex(index);
    try {
      await saveTopic({
        topic: topic.topic,
        question: topic.question,
        tags: topic.tags,
        noveltyScore: topic.scores.novelty,
        feasibilityScore: topic.scores.feasibility,
        impactScore: topic.scores.impact,
      });
      toast({ title: "Saved", description: `"${topic.topic}" saved to your collection.` });
    } catch (error) {
      toast({ title: "Save failed", description: "Could not save topic.", variant: "destructive" });
    } finally {
      setSavingIndex(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-amber-500/10 p-2 rounded-lg text-amber-600">
            <Trophy className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">
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
              <Select value={field} onValueChange={setField}>
                <SelectTrigger data-testid="select-field">
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
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger data-testid="select-tier">
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
            <Input 
              placeholder="e.g., quantum computing, sustainable materials, neuromorphic..."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              data-testid="input-keywords"
            />
          </div>

          <Button 
            className="w-full text-lg h-14 shadow-lg shadow-amber-500/20 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
            onClick={handleGenerate}
            disabled={isGenerating}
            data-testid="button-generate"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Generating Novel Ideas...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate 3 Novel Ideas
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedTopics && generatedTopics.length > 0 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              Breakthrough Candidates
            </h2>
            <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
              <Sparkles className="w-4 h-4 mr-2" /> Generate Different Ideas
            </Button>
          </div>

          <div className="grid gap-6">
            {generatedTopics.map((topic, index) => (
              <Card key={index} className="border-l-4 border-l-amber-500 shadow-md hover:shadow-lg transition-shadow" data-testid={`card-topic-${index}`}>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Topic {index + 1}</h3>
                        <p className="text-2xl font-display font-semibold leading-tight" data-testid={`text-topic-title-${index}`}>
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
                      <Button 
                        size="sm" 
                        className="w-full mt-2 gap-2 bg-foreground text-background hover:bg-foreground/90"
                        onClick={() => handleSave(topic, index)}
                        disabled={savingIndex === index}
                        data-testid={`button-save-${index}`}
                      >
                        {savingIndex === index ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <BookmarkPlus className="w-4 h-4" />
                        )}
                        Save
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
