export async function generateTopics(params: {
  field: string;
  tier: string;
  keywords: string;
}) {
  const res = await fetch("/api/generate-topics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to generate topics");
  return res.json();
}

export async function findGaps(topic: string) {
  const res = await fetch("/api/find-gaps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to find gaps");
  return res.json();
}

export async function designExperiment(topic: string) {
  const res = await fetch("/api/design-experiment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
  if (!res.ok) throw new Error("Failed to design experiment");
  return res.json();
}

export async function saveTopic(topic: {
  topic: string;
  question: string;
  tags: string[];
  noveltyScore: number;
  feasibilityScore: number;
  impactScore: number;
}) {
  const res = await fetch("/api/saved-topics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(topic),
  });
  if (!res.ok) throw new Error("Failed to save topic");
  return res.json();
}

export async function getSavedTopics() {
  const res = await fetch("/api/saved-topics");
  if (!res.ok) throw new Error("Failed to fetch saved topics");
  return res.json();
}

export async function deleteSavedTopic(id: number) {
  const res = await fetch(`/api/saved-topics/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete topic");
}

export async function getNotebookEntries() {
  const res = await fetch("/api/notebook");
  if (!res.ok) throw new Error("Failed to fetch notebook");
  return res.json();
}

export async function createNotebookEntry(entry: {
  title: string;
  content: string;
  folder?: string;
  type?: string;
}) {
  const res = await fetch("/api/notebook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error("Failed to create entry");
  return res.json();
}

export async function updateNotebookEntry(id: number, entry: Partial<{
  title: string;
  content: string;
  folder: string;
  type: string;
}>) {
  const res = await fetch(`/api/notebook/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error("Failed to update entry");
  return res.json();
}

export async function deleteNotebookEntry(id: number) {
  const res = await fetch(`/api/notebook/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete entry");
}
