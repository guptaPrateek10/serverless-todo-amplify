import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a
    .conversation({
      aiModel: a.ai.model("Claude 3.5 Haiku"),
      systemPrompt: "You are a helpful assistant",
    })
    .authorization((allow) => allow.owner()),
  Todo: a
    .model({
      content: a.string(),
      isDone: a.boolean(),
    })
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      description: "TEST",
      expiresInDays: 90,
    },
  },
});
