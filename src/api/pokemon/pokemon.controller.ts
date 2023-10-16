import { t } from "elysia";

import { createElysia } from "@utils/createElysia";

import { IPokemonServices, PokemonServices } from "./pokemon.services";

const _pokemonServices: IPokemonServices = new PokemonServices();

export const PokemonController = createElysia({ prefix: "/pokemon" })
  .get("/", async () => _pokemonServices.getAll())

  .get("/:id", async ({ params: { id } }) => _pokemonServices.get(id))

  .post(
    "/",
    async ({ body }) => {
      const { name, type, description, level } = body;

      return await _pokemonServices.create({
        name,
        type,
        description,
        level,
      });
    },
    {
      body: t.Object({
        name: t.String(),
        type: t.String(),
        description: t.String(),
        level: t.Number(),
      }),
    }
  )

  .put(
    "/:id",
    ({ params: { id }, body }) => {
      if (!id) throw new Error("Id is required");

      return _pokemonServices.update(id, body);
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        type: t.Optional(t.String()),
        description: t.Optional(t.String()),
        level: t.Optional(t.Number()),
      }),
    }
  );
