import { createElysia } from "@utils/createElysia";

import { auth } from "../auth/auth.controller";
import { PokemonController } from "./pokemon/pokemon.controller";

export const api = createElysia();

api.use(auth);
api.use(PokemonController);
