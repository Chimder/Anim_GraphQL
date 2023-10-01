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
  favorite:String
}
extend type Query {
  getUser(id: ID!): User
  getUsers: [User!]!
}
extend type Mutation {
  createUser(input: UserInput!): String!
  updateUser(email:String!, input: updateUserInput): String
  toggleUserArray(email:String!, input: updateUserInput): Boolean!
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
    toggleUserArray: async (_, { email, input: { favorite } }) => {
      const res = await UserModel.findOne({ email: email });
      const filter = await res.favorite.includes(favorite);

      if (!filter) {
        await UserModel.updateOne(
          { email: email },
          { $push: { favorite: favorite } }
        );
      } else {
        await UserModel.updateOne(
          { email: email },
          { $pull: { favorite: favorite } }
        );
      }
      return filter;
    },
    deleteUser: async (_, { id }) => {
      await UserModel.findByIdAndRemove(id);
      return id;
    },
  },
};
