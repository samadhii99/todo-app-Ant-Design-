import { useState } from "react"; // Only keep this one import
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import { Todo } from "../types/todo";
import React from "react";

interface TodoFormProps {
  addTodo: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return; // Prevent empty todos

    addTodo({
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSubmit}>Add Todo</Button>
    </div>
  );
};

export default TodoForm;
