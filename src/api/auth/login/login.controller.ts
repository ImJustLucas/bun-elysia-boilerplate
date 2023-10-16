import { createElysia } from "@utils/createElysia";

export const LoginController = createElysia({ prefix: "/login" })
  .get("/", () => "This is the login module!")
  .get("/:id", ({ params: { id } }) => console.log(id));
