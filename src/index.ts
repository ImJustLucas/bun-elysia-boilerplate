import { Elysia } from "elysia";

import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";

import "@config/database/mongodb.config";

import { auth } from "@auth/auth.controller";
import { apiRoutes } from "@api/index";

const api = new Elysia();

api
  .use(
    jwt({
      name: "jwt",
      secret: process.env.JWT_TOKEN || "DO NOTE USE THIS SECRET IN PRODUCTION",
    })
  )
  .use(cookie());

api.use(auth);

api.use(apiRoutes);

api.get("/", () => "Welcome to Elysia!");

api.listen(process.env.PORT || 8080);

console.log(
  `🦊 Elysia is running at ${api.server?.hostname}:${process.env.PORT || 8080}`
);
