import { createElysia } from "@utils/createElysia";

import { PokemonController } from "./pokemon/pokemon.controller";

export const apiRoutes = createElysia();

apiRoutes.use(PokemonController);
