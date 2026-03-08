import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookOpen, FolderOpen, FileText, Plus, MoreVertical, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getNotebookEntries, createNotebookEntry, updateNotebookEntry, deleteNotebookEntry } from "@/lib/api";

export default function Notebook() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["notebook"],
    queryFn: getNotebookEntries,
  });

  const createMutation = useMutation({
    mutationFn: createNotebookEntry,
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
      setSelectedEntry(entry.id);
      setEditContent(entry.content);
      setIsCreating(false);
      setNewTitle("");
      toast({ title: "Created", description: "New entry added." });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number; content?: string; title?: string }) => updateNotebookEntry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotebookEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notebook"] });
      setSelectedEntry(null);
      toast({ title: "Deleted", description: "Entry removed." });
    },
  });

  const currentEntry = entries.find((e: any) => e.id === selectedEntry);

  const handleCreate = () => {
    if (!newTitle.trim()) return;
    createMutation.mutate({ title: newTitle, content: "", folder: "General", type: "note" });
  };

  const handleSaveContent = () => {
    if (selectedEntry) {
      updateMutation.mutate({ id: selectedEntry, content: editContent });
      toast({ title: "Saved", description: "Changes saved." });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
      <div className="w-full md:w-64 flex flex-col gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-2" data-testid="text-page-title">
            <BookOpen className="w-6 h-6 text-primary" />
            Notebook
          </h1>
          
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button className="w-full justify-start gap-2 shadow-sm" data-testid="button-new-entry">
                <Plus className="w-4 h-4" /> New Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Entry</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input 
                  placeholder="Entry title..." 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)}
                  data-testid="input-entry-title"
                />
                <Button onClick={handleCreate} disabled={createMutation.isPending} className="w-full" data-testid="button-create-entry">
                  {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
            ) : entries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No entries yet. Create one to get started.</p>
            ) : (
              entries.map((entry: any) => (
                <button
                  key={entry.id}
                  onClick={() => { setSelectedEntry(entry.id); setEditContent(entry.content); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors text-left group ${selectedEntry === entry.id ? "bg-primary/10 text-primary" : ""}`}
                  data-testid={`button-entry-${entry.id}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-medium truncate">{entry.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 shrink-0"
                    onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(entry.id); }}
                    data-testid={`button-delete-entry-${entry.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <Card className="flex-1 glass-panel overflow-hidden border-border/50 shadow-sm flex flex-col">
        {currentEntry ? (
          <>
            <div className="p-4 border-b bg-muted/10 flex justify-between items-center">
              <h2 className="font-semibold text-lg" data-testid="text-entry-title">{currentEntry.title}</h2>
              <Button size="sm" onClick={handleSaveContent} disabled={updateMutation.isPending} data-testid="button-save-content">
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save
              </Button>
            </div>
            <div className="flex-1 p-6">
              <Textarea
                className="w-full h-full min-h-[400px] resize-none text-base leading-relaxed border-0 shadow-none focus-visible:ring-0 p-0"
                placeholder="Start writing your research notes, ideas, or experiment results here..."
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                data-testid="textarea-content"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2">
              <BookOpen className="w-12 h-12 mx-auto opacity-30" />
              <p className="text-lg font-medium">Select an entry or create a new one</p>
              <p className="text-sm">Your research workspace is ready.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
