import { Elysia } from "elysia";

import "@config/database/mongodb.config";
import { auth } from "./auth/auth.controller";
import { apiRoutes } from "@api/index";

const api = new Elysia().listen(process.env.PORT || 8080);

api.use(auth);

api.use(apiRoutes);

console.log(
  `🦊 Elysia is running at ${api.server?.hostname}:${process.env.PORT || 8080}`
);
