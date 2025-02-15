import { defineBackend } from "@aws-amplify/backend";
import { auth } from "@/amplify/auth/resource";
import { data } from "@/amplify/data/resource";

defineBackend({
  auth,
  data,
});
