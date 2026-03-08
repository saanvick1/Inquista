import { useState } from "react";
import { Microscope, Beaker, CheckCircle2, ChevronRight, Share2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function ExperimentDesigner() {
  const [isDesigning, setIsDesigning] = useState(false);
  const [design, setDesign] = useState<null | any>(null);

  const handleDesign = () => {
    setIsDesigning(true);
    setTimeout(() => {
      setDesign({
        hypothesis: "Implementing meta-learning techniques (MAML) on low-resolution bone X-ray datasets will improve classification accuracy of early osteoporosis by at least 10% compared to standard ResNet-50 architectures.",
        variables: {
          independent: "Training methodology (Standard CNN vs Meta-Learning)",
          dependent: "Classification accuracy, False Negative Rate, Inference Time",
          control: "Dataset size, Resolution limits, Hardware, Epochs"
        },
        methodology: [
          "Data Preprocessing: Downsample high-res public datasets to simulate clinical low-res environments.",
          "Model Setup: Initialize ResNet-50 as baseline and a MAML framework.",
          "Training Phase: Train standard model on 80% split. Train MAML model on diverse but sparse tasks.",
          "Evaluation: Compare models on a held-out test set focusing on minority demographic samples."
        ],
        metrics: ["Accuracy", "Precision", "Recall", "F1-Score", "AUC-ROC"]
      });
      setIsDesigning(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-600">
            <Microscope className="w-6 h-6" />
          </div>
          Experiment Designer
        </h1>
        <p className="text-muted-foreground font-serif text-lg">
          Structure your methodology, define variables, and establish robust evaluation metrics.
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
            />
          </div>
          <Button 
            className="w-full text-lg h-12 bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleDesign}
            disabled={isDesigning}
          >
            {isDesigning ? (
              <span className="flex items-center gap-2">
                <Beaker className="w-5 h-5 animate-bounce" /> Formulating Experiment...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Beaker className="w-5 h-5" /> Generate Experimental Design
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
                <p className="text-lg font-serif italic text-foreground/90 border-l-4 border-emerald-500 pl-4 py-1">
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

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" /> Share
              </Button>
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" /> Save Draft
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}