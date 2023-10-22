import Elysia, { t } from "elysia";
import { isAuthenticated } from "@auth/guards/authenticated.guard";
import { APIResponse } from "@typesDef/api";
import { IPokemon } from "@typesDef/pokemon";

import { PokemonDocumentServices, PokemonServices } from "./pokemon.services";

const _pokemonServices: PokemonDocumentServices = new PokemonServices();

export const PokemonController = new Elysia({ prefix: "/pokemon" }).guard(
  {
    beforeHandle: isAuthenticated,
  },
  (app) =>
    app
      .get("/", async (): Promise<APIResponse<IPokemon[]>> => {
        console.log("@GET /pokemon");
        const pokemons = await _pokemonServices.getAll();

        return {
          success: true,
          data: pokemons,
        };
      })

      .post(
        "/",
        async ({ body }): Promise<APIResponse<IPokemon>> => {
          const { name, type, description, level } = body;

          const newPokemon = await _pokemonServices.create({
            name,
            type,
            description,
            level,
          });

          return {
            success: true,
            data: newPokemon,
          };
        },
        {
          body: t.Object({
            name: t.String(),
            type: t.String(),
            description: t.String(),
            level: t.Number(),
          }),
        },
      )

      .put(
        "/:id",
        async ({ params: { id }, body }): Promise<APIResponse<IPokemon>> => {
          if (!id) throw new Error("Id is required");

          const updatedPokemon = await _pokemonServices.update(id, body);

          return {
            success: true,
            data: updatedPokemon,
          };
        },
        {
          body: t.Object({
            name: t.Optional(t.String()),
            type: t.Optional(t.String()),
            description: t.Optional(t.String()),
            level: t.Optional(t.Number()),
          }),
        },
      )

      .delete(
        "/:id",
        async ({ params: { id } }): Promise<APIResponse<IPokemon>> => {
          const deletedPokemon = await _pokemonServices.delete(id);

          return {
            success: true,
            data: deletedPokemon,
          };
        },
      ),
);
