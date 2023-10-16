import { createElysia } from "@utils/createElysia";

export const auth = createElysia({ prefix: "/auth" })
  .get("/", () => "This is the auth module!")
  .post("/login", () => "login")
  .post("/register", () => "register")
  .post("/logout", () => "logout");
