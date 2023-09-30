import UserModel from "../models/user.model.js";

export const typeDef = `#graphql
type User {
  _id:String
  name: String!
  email:String!
}

input UserInput {
  name: String!
  email:String!
}
extend type Query {
  getUser(id: ID!): User
  getUsers: [User!]!
}
extend type Mutation {
  createUser(input: UserInput!): String!
  updateUser(ID:ID!, userInput: UserInput): String!
  deleteUser(ID:ID!): String!
}
`;

export const userResolver = {
  Query: {
    getUser: async (_, { id }) => {
      return await UserModel.findById(id);
    },
    // getMangas: async () => {
    //   return await UserModel.find();
    // },
    // getMangasByGenres: async (_, { input }) => {
    //   return await UserModel.find().all("genres", input);
    // },
    // getMangasByInput: async (_, { input }) => {
    //   return await UserModel.aggregate([
    //     { $match: { name: { $regex: input, $options: "i" } } },
    //   ]);
    // },
  },
  Mutation: {
    createUser: async (_, { input: { name, email } }) => {
      const res = await new UserModel({ name, email }).save();
      return res._id;
    },
  },
};
