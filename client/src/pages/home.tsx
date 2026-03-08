import { Link } from "wouter";
import { ArrowRight, Lightbulb, Search, Microscope, Sparkles, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-primary/10 to-background border p-8 md:p-12">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-primary/5">
          <Sparkles className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Activity className="w-4 h-4" />
            <span>AI-Powered Research Co-pilot</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Accelerate your <span className="text-primary">academic research</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 font-serif leading-relaxed">
            Inquista guides you through the entire research workflow—from discovering novel topics and identifying literature gaps, to designing rigorous experiments.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/topic-generator">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 gap-2">
                Generate a Topic <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/notebook">
              <Button size="lg" variant="outline" className="rounded-full gap-2 bg-background/50 backdrop-blur-sm">
                Open Notebook
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Core Tools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6" />
              </div>
              <CardTitle>Topic Generator</CardTitle>
              <CardDescription>Discover novel, feasible research questions tailored to your field and difficulty level.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/topic-generator">
                <Button variant="ghost" className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  Try it <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <CardTitle>Gap Finder</CardTitle>
              <CardDescription>Analyze existing literature to find unexplored niches and high-impact research gaps.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/gap-finder">
                <Button variant="ghost" className="w-full justify-between text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                  Try it <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-md transition-all duration-300 border-primary/10 hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-600 group-hover:scale-110 transition-transform">
                <Microscope className="w-6 h-6" />
              </div>
              <CardTitle>Experiment Designer</CardTitle>
              <CardDescription>Structure your methodology, define variables, and establish robust evaluation metrics.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/experiment-designer">
                <Button variant="ghost" className="w-full justify-between text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                  Try it <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { title: "Meta-Learning in Radiology", type: "Topic Saved", date: "2 hours ago" },
                { title: "Analysis of 5 recent CNN papers", type: "Gap Analysis", date: "Yesterday" },
                { title: "Osteoporosis Detection Methodology", type: "Experiment Design", date: "3 days ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div>
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}