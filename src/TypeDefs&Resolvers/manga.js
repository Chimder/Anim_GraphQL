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
  genres:[String]
}
extend type Query {
  getManga(name: String!): Manga
  getMangas: [Manga!]!
  getMangasByGenres(input: [String]!): [Manga!]!
  getMangasByInput(input: String!): [Manga!]!
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
    getMangas: async () => {
      return await MankaModel.find();
    },
    getMangasByGenres: async (_, { input }) => {
      return await MankaModel.find().all("genres", input);
    },
    getMangasByInput: async (_, { input }) => {
      return await MankaModel.aggregate([
        { $match: { name: { $regex: input, $options: "i" } } },
      ]);
    },
  },
};
