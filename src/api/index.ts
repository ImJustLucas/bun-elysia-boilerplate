import { createElysia } from "@utils/createElysia";

import { auth } from "./auth";
import { PokemonController } from "./pokemon/pokemon.controller";

export const api = createElysia();

api.group("", (api) => api.use(auth));

api.group("", (api) => api.use(PokemonController));
