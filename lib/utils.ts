import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import { createAIHooks } from "@aws-amplify/ui-react-ai";

Amplify.configure(outputs);
export const client = generateClient<Schema>({
  authMode: "userPool",
});

export const { useAIConversation } = createAIHooks(client);
