import { createElysia } from "@utils/createElysia";
import { LoginController } from "./login/login.controller";

export const auth = createElysia({ prefix: "/auth" })
  .get("/", () => "This is the auth module!")
  .use(LoginController);
