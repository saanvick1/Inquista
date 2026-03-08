import { Link, useLocation } from "wouter";
import { 
  BookOpen, 
  Lightbulb, 
  Microscope, 
  Search, 
  Settings, 
  PenTool,
  LayoutDashboard,
  Menu,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/topic-generator", label: "Topic Generator", icon: Lightbulb },
  { href: "/gap-finder", label: "Gap Finder", icon: Search },
  { href: "/experiment-designer", label: "Experiment Designer", icon: Microscope },
  { href: "/notebook", label: "Research Notebook", icon: BookOpen },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.href;
        
        return (
          <Link key={item.href} href={item.href}>
            <span
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Icon size={20} />
              {item.label}
            </span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r bg-card/50 backdrop-blur-xl z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <BookOpen className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Inquista
          </h1>
        </div>
        
        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Research Workflow
        </div>
        
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <NavLinks />
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <Settings size={20} />
            Settings
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary w-5 h-5" />
            <h1 className="text-xl font-bold font-display">Inquista</h1>
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="p-6 flex items-center gap-3 border-b">
                <BookOpen className="text-primary w-6 h-6" />
                <h1 className="text-2xl font-bold font-display">Inquista</h1>
              </div>
              <nav className="p-3 space-y-1">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
