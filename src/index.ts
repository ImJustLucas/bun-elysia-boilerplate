import { Elysia } from "elysia";

import "@config/database/mongodb.config";
import { auth } from "@auth/auth.controller";
import { apiRoutes } from "@api/index";

const api = new Elysia();

api.use(auth);

api.use(apiRoutes);

api.get("/", () => "Welcome to Elysia!");

api.listen(process.env.PORT || 8080);

console.log(
  `🦊 Elysia is running at ${api.server?.hostname}:${process.env.PORT || 8080}`
);
