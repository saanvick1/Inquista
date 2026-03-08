import { useState } from "react";
import { Microscope, Beaker, CheckCircle2, Share2, Save, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { designExperiment } from "@/lib/api";

interface ExperimentDesign {
  hypothesis: string;
  variables: { independent: string; dependent: string; control: string };
  methodology: string[];
  metrics: string[];
}

export default function ExperimentDesigner() {
  const [isDesigning, setIsDesigning] = useState(false);
  const [design, setDesign] = useState<ExperimentDesign | null>(null);
  const [topicInput, setTopicInput] = useState("");
  const { toast } = useToast();

  const handleDesign = async () => {
    if (!topicInput.trim()) {
      toast({ title: "Input required", description: "Please enter a research idea before generating an experimental design.", variant: "destructive" });
      return;
    }

    setIsDesigning(true);
    try {
      const result = await designExperiment(topicInput);
      setDesign(result);
    } catch (error) {
      toast({ title: "Design failed", description: "Could not generate experiment design. Please try again.", variant: "destructive" });
    } finally {
      setIsDesigning(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3" data-testid="text-page-title">
          <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-600">
            <Microscope className="w-6 h-6" />
          </div>
          Experiment Designer
        </h1>
        <p className="text-muted-foreground font-serif text-lg">
          Structure your methodology, define variables, and establish robust evaluation metrics based on your unique topic.
        </p>
      </div>

      <Card className="glass-panel border-emerald-500/20">
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              What is your research idea?
            </label>
            <Textarea 
              placeholder="e.g., Using meta-learning to detect early osteoporosis in low-resolution X-rays..."
              className="min-h-[100px] text-lg resize-none"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              data-testid="input-topic"
            />
          </div>
          <Button 
            className="w-full text-lg h-12 bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleDesign}
            disabled={isDesigning}
            data-testid="button-design"
          >
            {isDesigning ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Designing Experiment...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate Experimental Design
              </span>
            )}
          </Button>
        </CardContent>
      </Card>

      {design && (
        <div className="grid md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-700">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="border-b bg-muted/30 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Formal Hypothesis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg font-serif italic text-foreground/90 border-l-4 border-emerald-500 pl-4 py-1" data-testid="text-hypothesis">
                  "{design.hypothesis}"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b bg-muted/30 pb-4">
                <CardTitle className="text-lg">Step-by-Step Methodology</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {design.methodology.map((step: string, i: number) => (
                    <div key={i} className="p-4 flex gap-4 hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                        {i + 1}
                      </div>
                      <p className="pt-1 text-foreground/80">{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="border-b bg-muted/30 pb-4">
                <CardTitle className="text-lg">Variables</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Independent</h4>
                  <p className="text-sm font-medium">{design.variables.independent}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Dependent</h4>
                  <p className="text-sm font-medium">{design.variables.dependent}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">Control</h4>
                  <p className="text-sm font-medium text-muted-foreground">{design.variables.control}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b bg-muted/30 pb-4">
                <CardTitle className="text-lg">Evaluation Metrics</CardTitle>
              </CardHeader>
              <CardContent className="p-5 flex flex-wrap gap-2">
                {design.metrics.map((metric: string) => (
                  <span key={metric} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-md text-sm font-medium">
                    {metric}
                  </span>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
