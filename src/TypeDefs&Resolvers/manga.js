import { isArray } from "lodash-es";
import MankaModel from "../models/manga.model.js";

export const typeDef = `#graphql
type Manga {
  _id:String
  name: String!
  img:String!
  imgHeader: String!
  author: String!
  status: String!
  genres: [String!]!
  describe: String!
}

input MangaInput {
  input: String
  genres:String
}
extend type Query {
  getManga(name: String!): Manga
  getMangasByAll(input:String, genres:[String]): [Manga!]!
  getTest(input:String, genres:[String]): [Manga!]!
}
# extend type Mutation {
#   createManka(mangaInput: MangaInput): String!
#   updateManka(ID:ID!, mangaInput: MangaInput): String!
#   deleteManka(ID:ID!): String!
# }
`;

export const mankaResolver = {
  Query: {
    getManga: async (_, { name }) => {
      return await MankaModel.findOne({ name: name });
    },
    getTest: async (_, { input, genres }) => {
      return await MankaModel.find({
        name: { $regex: input, $options: "i" },
      }).all("genres", genres);
    },

    getMangasByAll: async (_, { input, genres }) => {
      if (input && genres) {
        return await MankaModel.find({
          name: { $regex: input, $options: "i" },
        }).all("genres", genres);
      }
      if (genres) {
        return await MankaModel.find().all("genres", genres);
      } else if (input) {
        return await MankaModel.aggregate([
          { $match: { name: { $regex: input, $options: "i" } } },
        ]);
      } else {
        return await MankaModel.find();
      }
    },
  },
};
