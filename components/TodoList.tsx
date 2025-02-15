"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoCheckbox } from "./TodoCheckbox";
import { useTodos } from "@/lib/hooks/useTodos";
import { Schema } from "@/amplify/data/resource";

type Todo = Partial<Schema["Todo"]>;

export function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const { data: todos = [], isLoading } = useTodos({ initialTodos });

  if (isLoading) {
    return <div className="text-center">Loading todos...</div>;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <Card key={todo.id}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-4">
              <TodoCheckbox id={todo.id} isDone={!!todo.isDone} />
              <span className={todo.isDone ? "line-through text-gray-500" : ""}>
                {todo.content}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
      {todos.length === 0 && (
        <p className="text-center text-gray-500">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}
