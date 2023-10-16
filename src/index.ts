import { Elysia } from "elysia";

import "@config/database/mongodb.config";
import { auth } from "./auth/auth.controller";
import { PokemonController } from "@api/pokemon/pokemon.controller";

const api = new Elysia().listen(process.env.PORT || 8080);

api.use(auth);
api.use(PokemonController);

console.log(
  `🦊 Elysia is running at ${api.server?.hostname}:${process.env.PORT || 8080}`
);
