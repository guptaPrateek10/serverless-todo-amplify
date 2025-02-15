"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateTodo } from "@/lib/hooks/useTodos";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const { mutate: createTodo, isPending } = useCreateTodo();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    createTodo(title, {
      onSuccess: () => {
        setTitle("");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new todo..."
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add Todo"}
      </Button>
    </form>
  );
}
