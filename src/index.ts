import { Elysia } from "elysia";

import "@api/config/database/mongodb.config";
import { api } from "@api/index";

const app = new Elysia().use(api).listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
