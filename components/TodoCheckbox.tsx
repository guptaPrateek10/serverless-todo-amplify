"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTodo } from "@/lib/hooks/useTodos";

interface TodoCheckboxProps {
  id: string;
  isDone: boolean;
}

export function TodoCheckbox({ id, isDone }: TodoCheckboxProps) {
  const { mutate: updateTodo } = useUpdateTodo();

  return (
    <Checkbox
      checked={isDone}
      onCheckedChange={(checked) =>
        updateTodo({ id, isDone: checked as boolean })
      }
    />
  );
}
