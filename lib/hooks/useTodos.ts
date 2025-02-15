"use client";

import { client } from "@/app/providers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const TODO_QUERY_KEY = "todos";

export function useTodos({ initialTodos }: { initialTodos: any[] }) {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: async () => {
      const response = await client.models.Todo.list();
      return response.data;
    },
    initialData: initialTodos,
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const response = await client.models.Todo.create({
        content,
        isDone: false,
      });
      return response.data;
    },
    onMutate: async (newContent) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([TODO_QUERY_KEY]);

      // Optimistically update to the new value
      queryClient.setQueryData([TODO_QUERY_KEY], (old: any[] = []) => [
        ...old,
        {
          id: "temp-id-" + Date.now(),
          content: newContent,
          isDone: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onError: (err, newContent, context) => {
      queryClient.setQueryData([TODO_QUERY_KEY], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      const response = await client.models.Todo.update({
        id,
        isDone,
      });
      return response.data;
    },
    onMutate: async ({ id, isDone }) => {
      await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] });

      const previousTodos = queryClient.getQueryData([TODO_QUERY_KEY]);

      queryClient.setQueryData([TODO_QUERY_KEY], (old: any[] = []) =>
        old.map((todo) =>
          todo.id === id
            ? { ...todo, isDone, updatedAt: new Date().toISOString() }
            : todo
        )
      );

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([TODO_QUERY_KEY], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });
}
