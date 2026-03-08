import { useState } from "react";
import { BookOpen, FolderOpen, FileText, Plus, MoreVertical, Database, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const FOLDERS = [
  { id: 1, name: "Osteoporosis Project", count: 12, color: "text-blue-500" },
  { id: 2, name: "Climate AI Models", count: 4, color: "text-emerald-500" },
  { id: 3, name: "Literature Reviews", count: 8, color: "text-purple-500" },
];

const RECENT_ITEMS = [
  { id: 1, title: "Meta-Learning Baseline Draft", type: "Note", date: "Today", icon: FileText },
  { id: 2, title: "Dataset Analysis Results", type: "Data", date: "Yesterday", icon: Database },
  { id: 3, title: "PyTorch CNN Setup", type: "Code", date: "Oct 24", icon: Code2 },
  { id: 4, title: "Smith et al. (2023) Summary", type: "Paper", date: "Oct 22", icon: BookOpen },
];

export default function Notebook() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Notebook
          </h1>
          <Button className="w-full justify-start gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> New Entry
          </Button>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
            Workspaces
          </h3>
          {FOLDERS.map((folder) => (
            <button
              key={folder.id}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className={`w-4 h-4 ${folder.color}`} />
                <span className="text-sm font-medium">{folder.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{folder.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="flex-1 glass-panel overflow-hidden border-border/50 shadow-sm flex flex-col">
        <div className="p-4 border-b bg-muted/10 flex justify-between items-center">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Osteoporosis Project</span>
            <span>/</span>
            <span className="text-foreground font-medium">Meta-Learning Baseline Draft</span>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="flex-1 p-6 md:p-10">
          <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold font-display leading-tight">
              Meta-Learning Baseline Draft
            </h1>
            
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Draft</span>
              <span className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">Last edited 2h ago</span>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none notebook-page pt-4">
              <h2>Introduction</h2>
              <p>
                This draft outlines the initial approach to applying Model-Agnostic Meta-Learning (MAML) for early detection of osteoporosis in low-resolution diagnostic imagery. Current methodologies heavily rely on expansive datasets that are not uniformly available across diverse clinical settings.
              </p>
              
              <h3>Key Objectives</h3>
              <ul>
                <li>Establish a ResNet-50 baseline.</li>
                <li>Implement MAML framework over the baseline architecture.</li>
                <li>Evaluate performance across simulated data scarcity.</li>
              </ul>

              <div className="bg-muted/50 p-4 rounded-xl border border-border mt-6">
                <div className="flex items-center gap-2 mb-2 font-semibold text-sm">
                  <Code2 className="w-4 h-4" /> Generated Snippet
                </div>
                <pre className="text-xs bg-card p-3 rounded-lg overflow-x-auto">
{`def configure_maml(model, lr_inner=0.01, lr_outer=0.001):
    maml = l2l.algorithms.MAML(model, lr=lr_inner, first_order=False)
    opt = torch.optim.Adam(maml.parameters(), lr=lr_outer)
    return maml, opt`}
                </pre>
              </div>

              <h2>Literature Context</h2>
              <p>
                As noted in the <a href="#" className="text-primary hover:underline">Gap Analysis</a> conducted earlier this week, there is a distinct lack of meta-learning approaches tailored to few-shot anomaly detection in this specific domain.
              </p>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}