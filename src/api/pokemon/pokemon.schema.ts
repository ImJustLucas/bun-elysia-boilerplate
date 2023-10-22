import { IPokemon } from "@typesDef/pokemon";
import { Document, model, Schema } from "mongoose";

export type PokemonDocument = IPokemon & Document;

const schema = new Schema<PokemonDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      //      select: false, // will not appear in the response
    },
    level: {
      type: Number,
      required: true,
      max: 100,
      min: 1,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

schema.pre("save", function (next) {
  console.log("pre save", this.name);
  this.slug = this.name.toLowerCase().replace(/ /g, "-");
  next();
});

export default model<PokemonDocument>("pokemon", schema);
