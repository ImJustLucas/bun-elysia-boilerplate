import Pokemon from "./pokemon.schema";

import { PokemonDTO } from "@typesDef/pokemon";

export class PokemonServices {
  async get(id: string) {
    console.log(`@GET /pokemon/${id}`);

    const pokemon = await Pokemon.findById(id);

    if (!pokemon) throw new Error(`Pokemon not found with id ${id}`);

    return pokemon;
  }

  async getAll() {
    console.log("@GET /pokemon");

    const pokemons = await Pokemon.find();

    return pokemons;
  }

  async create(data: PokemonDTO) {
    console.log("@POST: /pokemon", data);

    const newPokemon = new Pokemon(data);
    newPokemon.name = data.name;
    newPokemon.type = data.type;
    newPokemon.description = data.description;
    newPokemon.level = data.level;

    const returnedPokemon = await newPokemon.save();

    return returnedPokemon;
  }

  async update(id: string, data: Partial<PokemonDTO>) {
    console.log("@PUT: /pokemon");

    const updatePokemon = await Pokemon.findById(id);

    if (!updatePokemon) throw new Error(`Pokemon not found with id ${id}`);

    console.log("updatePokemon", updatePokemon);

    !!data.name ? (updatePokemon.name = data.name) : null;
    !!data.type ? (updatePokemon.type = data.type) : null;
    !!data.description ? (updatePokemon.description = data.description) : null;
    !!data.level ? (updatePokemon.level = data.level) : null;

    const returnedPokemon = await updatePokemon.save();

    return returnedPokemon;
  }

  async delete(id: string) {
    console.log("@DELETE: /pokemon");

    const deletedPokemon = await Pokemon.findByIdAndDelete(id);

    if (!deletedPokemon) throw new Error(`Pokemon not found with id ${id}`);

    return deletedPokemon;
  }
}

export type IPokemonServices = PokemonServices;