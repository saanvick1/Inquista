import { useState } from "react";
import { Search, Upload, Target, BrainCircuit, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function GapFinder() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResults({
        gaps: [
          {
            title: "Limited datasets for knee X-rays in diverse populations",
            impact: "High",
            difficulty: "Medium",
            description: "Current models are primarily trained on Caucasian data, leading to bias in inference across other demographics."
          },
          {
            title: "Lack of meta-learning approaches for few-shot anomaly detection",
            impact: "High",
            difficulty: "Hard",
            description: "Most papers rely on massive datasets. Applying meta-learning could solve the data-scarcity problem in rare bone diseases."
          },
          {
            title: "Absence of real-time clinical deployment frameworks",
            impact: "Medium",
            difficulty: "Medium",
            description: "Models show high accuracy in labs but lack lightweight architectures suitable for mobile or edge devices in clinics."
          }
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
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
                />
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-sm text-muted-foreground uppercase font-bold tracking-wider">OR</span>
                <div className="h-px bg-border flex-1"></div>
              </div>

              <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer group">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium">Upload Literature (PDFs)</p>
                <p className="text-xs text-muted-foreground mt-1">AI will read and find gaps across your specific papers.</p>
              </div>

              <Button 
                className="w-full text-lg h-12 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 animate-pulse" /> Analyzing Literature...
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
              <p>A strong research paper doesn't just replicate past work—it fills a void.</p>
              <p>Our AI cross-references thousands of abstracts to identify contradictions, limitations, and "future work" suggestions left by other researchers.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {results && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-purple-500 w-6 h-6" /> 
            Discovered Opportunities
          </h2>
          
          <div className="space-y-4">
            {results.gaps.map((gap: any, index: number) => (
              <Card key={index} className="overflow-hidden group hover:shadow-md transition-shadow">
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
                    <Button variant="ghost" size="sm" className="mt-auto w-full group-hover:bg-purple-100 group-hover:text-purple-700">
                      Use as Topic <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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