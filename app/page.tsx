import { Schema } from "@/amplify/data/resource";
import { CreateTodo } from "@/components/CreateTodo";
import Header from "@/components/Header";
import { TodoList } from "@/components/TodoList";
import { serverClient } from "@/lib/amplify-client";
import Chat from "@/components/Chat";
export default async function Home() {
  const { data: todos } = await serverClient.models.Todo.list();
  return (
    <main className="container mx-auto p-4">
      <Header />
      <CreateTodo />
      <TodoList initialTodos={todos as any} />
      <Chat />
    </main>
  );
}
