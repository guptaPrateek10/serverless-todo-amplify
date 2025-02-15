import { type Schema } from "@/amplify/data/resource";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import outputs from "@/amplify_outputs.json";
import { cookies } from "next/headers";

export const serverClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
});
