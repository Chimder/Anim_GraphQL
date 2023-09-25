import MankaModel from "../models/manga.model.js";

const MankaResoler = {
  Query: {
    manga: async (_, { id }) => {
      const manga = await MankaModel.findById(id);
      return { ...manga._doc };
    },
  },
};
export default MankaResoler;
