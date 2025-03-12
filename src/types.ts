export type TodoCategory =
  | "work"
  | "personal"
  | "shopping"
  | "health"
  | "other";
export type TodoPriority = "high" | "medium" | "low";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  category?: TodoCategory;
  priority?: TodoPriority;
  dueDate?: string; // ISO date string
}
