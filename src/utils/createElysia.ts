import { Elysia } from "elysia";

export const createElysia = (
  config?: ConstructorParameters<typeof Elysia>[0]
) => new Elysia({ ...config, aot: process.env.RUNTIME === "bun" });
