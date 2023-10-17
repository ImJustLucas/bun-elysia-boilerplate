import { Model } from "mongoose";
import Pokemon, { PokemonDocument } from "./pokemon.schema";

import { PokemonDTO } from "@typesDef/pokemon";

export class PokemonServices {
  private readonly _pokemonSchema: Model<PokemonDocument>;

  constructor() {
    this._pokemonSchema = Pokemon;
  }

  async get(id: string): Promise<PokemonDocument> {
    const pokemon = await this._pokemonSchema.findById(id);
    if (!pokemon) throw new Error(`Pokemon not found with id ${id}`);

    return pokemon;
  }

  async getAll(): Promise<PokemonDocument[]> {
    const pokemons = await this._pokemonSchema.find();

    return pokemons;
  }

  async create(data: PokemonDTO): Promise<PokemonDocument> {
    console.log("@POST: /pokemon", data);

    const newPokemon = new this._pokemonSchema(data);
    newPokemon.name = data.name;
    newPokemon.type = data.type;
    newPokemon.description = data.description;
    newPokemon.level = data.level;

    const returnedPokemon = await newPokemon.save();

    return returnedPokemon;
  }

  async update(
    id: string,
    data: Partial<PokemonDTO>
  ): Promise<PokemonDocument> {
    console.log("@PUT: /pokemon");

    const updatePokemon = await this._pokemonSchema.findById(id);

    if (!updatePokemon) throw new Error(`Pokemon not found with id ${id}`);

    console.log("updatePokemon", updatePokemon);

    !!data.name ? (updatePokemon.name = data.name) : null;
    !!data.type ? (updatePokemon.type = data.type) : null;
    !!data.description ? (updatePokemon.description = data.description) : null;
    !!data.level ? (updatePokemon.level = data.level) : null;

    const returnedPokemon = await updatePokemon.save();

    return returnedPokemon;
  }

  async delete(id: string): Promise<PokemonDocument> {
    console.log("@DELETE: /pokemon");

    const deletedPokemon = await this._pokemonSchema.findByIdAndDelete(id);

    if (!deletedPokemon) throw new Error(`Pokemon not found with id ${id}`);

    return deletedPokemon;
  }
}

export type PokemonDocumentServices = PokemonServices;
