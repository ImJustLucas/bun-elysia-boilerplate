import { Elysia } from "elysia";

import { jwtAccessSetup, jwtRefreshSetup } from "@auth/guards/setup.jwt";

export const createElysia = (
  config?: ConstructorParameters<typeof Elysia>[0],
) =>
  new Elysia({ ...config, aot: process.env.RUNTIME === "bun" })
    .use(jwtAccessSetup)
    .use(jwtRefreshSetup);
