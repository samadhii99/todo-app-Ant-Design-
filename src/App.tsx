import React, { useState } from "react";
import { Todo } from "./types/todo";
import TodoItem from "./components/TodoItem";
import { Button } from "@/components/ui/button";
import "./styles/tailwind.css"; // Ensure this is properly linked

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTodo = () => {
    if (!newTodoTitle.trim()) {
      setErrorMessage("Title cannot be empty.");
      return;
    }
    setErrorMessage("");

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      description: newTodoDescription,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodoTitle("");
    setNewTodoDescription("");
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (
    id: string,
    title: string,
    description: string,
    completed: boolean
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description, completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10">
      {/* Updated Main Container */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl md:max-w-7xl lg:max-w-8xl p-8 md:p-16 flex flex-col space-y-8">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-center text-gray-800">
          Todo List
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center text-lg md:text-xl">
            {errorMessage}
          </p>
        )}

        {/* Input Fields */}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="p-4 md:p-6 border-2 border-gray-300 rounded-lg w-full text-lg md:text-2xl focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            className="p-4 md:p-6 border-2 border-gray-300 rounded-lg w-full text-lg md:text-2xl focus:ring-2 focus:ring-indigo-500"
          />
          <Button
            onClick={addTodo}
            className="w-full py-3 md:py-4 px-6 md:px-8 text-lg md:text-2xl bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add Todo
          </Button>
        </div>

        {/* Todo List (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center text-xl">
              No todos yet! Add some.
            </p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
