import { Document } from "mongoose";

export interface IPokemon extends Document {
  name: string;
  type: string;
  description: string;
  level: number;
  slug: string;
}

export interface PokemonDTO {
  name: string;
  type: string;
  description: string;
  level: number;
}
