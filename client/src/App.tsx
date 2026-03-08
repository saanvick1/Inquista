import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "./components/layout/AppLayout";

import Home from "@/pages/home";
import TopicGenerator from "@/pages/topic-generator";
import GapFinder from "@/pages/gap-finder";
import ExperimentDesigner from "@/pages/experiment-designer";
import Notebook from "@/pages/notebook";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/topic-generator" component={TopicGenerator} />
        <Route path="/gap-finder" component={GapFinder} />
        <Route path="/experiment-designer" component={ExperimentDesigner} />
        <Route path="/notebook" component={Notebook} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;