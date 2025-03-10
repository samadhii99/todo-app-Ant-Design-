import { Todo } from "../types/todo";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import React from "react";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    title: string,
    description: string,
    completed: boolean
  ) => void; // Fixed function signature
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
  updateTodo,
}) => {
  const handleCompleteToggle = () => {
    toggleComplete(todo.id);
  };

  const handleEdit = () => {
    const newTitle = prompt("Edit Title", todo.title) || todo.title || "";
    const newDescription =
      prompt("Edit Description", todo.description || "") ||
      todo.description ||
      "";

    updateTodo(todo.id, newTitle, newDescription, todo.completed); // ✅ Now passing the completed status
  };

  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleCompleteToggle}
        />
        <div>
          <h3 className={`text-lg ${todo.completed ? "line-through" : ""}`}>
            {todo.title}
          </h3>
          <p className="text-sm text-gray-500">{todo.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {!todo.completed && (
          <Button variant="default" onClick={handleCompleteToggle}>
            Mark as Completed
          </Button>
        )}
        <Button variant="default" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default TodoItem;
