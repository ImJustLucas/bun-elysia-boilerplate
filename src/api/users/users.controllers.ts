import { createElysia } from "@utils/createElysia";

export const UsersController = createElysia({ prefix: "/users" })
  .get("/", () => "@ADMIN: get all users")
  .get("/me", () => "@Logged: get current user")
  .get("/:id", () => "@ADMIN: get user by id")
  .put("/:id", () => "@Logged: update user by id")
  .put("/deactivate/:id", () => "@ADMIN: deactivate user by id")
  .put("suspend/:id", () => "@ADMIN: suspend user by id")
  .delete("/:id", () => "@ADMIN: delete user by id");
