import UserModel from "../models/user.model.js";

export const typeDef = `#graphql
type User {
  _id:String
  name: String!
  email:String!
  favorite:[String]
}

input UserInput {
  name: String!
  email:String!
}
input updateUserInput {
  # email:String
  # name: String
  favorite:[String!]!
}
extend type Query {
  getUser(id: ID!): User
  getUsers: [User!]!
  isUserArray(email:String!, input: updateUserInput): String
}
extend type Mutation {
  createUser(input: UserInput!): String!
  updateUser(email:String!, input: updateUserInput): String
  updateUserArray(email:String!, input: updateUserInput):User!
  deleteUser(id:ID!): String!
}
`;

export const userResolver = {
  Query: {
    getUser: async (_, { id }) => {
      return await UserModel.findById(id);
    },
    getUsers: async () => {
      return await UserModel.find();
    },

    isUserArray: async (_, { email, input: { favorite } }) => {
      const isok = await UserModel.findOne(
        { email: email },
        { favorite: favorite }
      );
      return isok ? true : false
    }
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
    updateUser: async (_, { email, input: { favorite } }) => {
      const res = await UserModel.updateOne(
        { email: email },
        { $push: { favorite: favorite } }
      );
      return res.acknowledged;
    },
    updateUserArray: async (_, { email, input: { favorite } }) => {
      const isok = await UserModel.findOne(
        { email: email },
        { favorite: favorite }
      );
      return isok ? true : false

      // const res = await UserModel.updateOne(
      //   { email: email },
      //   { $push: { favorite: favorite } }
      // );
    },
    deleteUser: async (_, { id }) => {
      const res = await UserModel.findByIdAndRemove(id);
      return id;
    },
  },
};
