import { useState } from "react";
import { Search, Upload, Target, BrainCircuit, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { findGaps } from "@/lib/api";

interface Gap {
  title: string;
  description: string;
  impact: string;
  difficulty: string;
}

export default function GapFinder() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Gap[] | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!topicInput.trim()) {
      toast({ title: "Input required", description: "Please describe your research area.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    try {
      const data = await findGaps(topicInput);
      setResults(data.gaps || []);
    } catch (error) {
      toast({ title: "Analysis failed", description: "Could not analyze the topic. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3" data-testid="text-page-title">
          <div className="bg-purple-500/10 p-2 rounded-lg text-purple-600">
            <Search className="w-6 h-6" />
          </div>
          Research Gap Finder
        </h1>
        <p className="text-muted-foreground font-serif text-lg">
          Analyze existing literature to uncover unexplored niches and high-impact research opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="glass-panel">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Describe your broad topic</label>
                <Textarea 
                  placeholder="e.g., Deep learning applications in medical imaging for bone disease detection..."
                  className="min-h-[120px] text-lg resize-none"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  data-testid="input-topic"
                />
              </div>

              <Button 
                className="w-full text-lg h-12 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                data-testid="button-analyze"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Literature...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5" /> Find Research Gaps
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Why find gaps?</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3 font-serif">
              <p>A strong research paper doesn't just replicate past work — it fills a void.</p>
              <p>Our AI cross-references existing knowledge to identify contradictions, limitations, and overlooked opportunities.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {results && results.length > 0 && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl font-bold flex items-center gap-2" data-testid="text-results-heading">
            <Sparkles className="text-purple-500 w-6 h-6" /> 
            Discovered Opportunities
          </h2>
          
          <div className="space-y-4">
            {results.map((gap, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-md transition-shadow" data-testid={`card-gap-${index}`}>
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold font-display leading-tight">{gap.title}</h3>
                    </div>
                    <p className="text-muted-foreground font-serif">{gap.description}</p>
                  </div>
                  <div className="bg-muted/30 p-6 md:w-48 flex flex-row md:flex-col justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l">
                    <div>
                      <div className="text-xs uppercase font-bold text-muted-foreground mb-1">Impact Potential</div>
                      <div className={`font-bold ${gap.impact === 'High' ? 'text-emerald-600' : 'text-blue-600'}`}>
                        {gap.impact}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase font-bold text-muted-foreground mb-1">Difficulty</div>
                      <div className={`font-bold ${gap.difficulty === 'Hard' ? 'text-orange-600' : 'text-blue-600'}`}>
                        {gap.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
