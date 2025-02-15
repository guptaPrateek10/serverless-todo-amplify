import { defineAuth } from "@aws-amplify/backend";

// define api key

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
