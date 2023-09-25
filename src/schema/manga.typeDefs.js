const MankatypeDefs = `#graphql
type Manga {
  _id:String
  name: String!
  img:String!
  imgHeader: String!
  author: String!
  status: String!
  genres: [String!]!
}

input MangaInput {
  name: String!
  genres:[String]
}
type Query {
  manga(id: String!): Manga
  getMangas(limit: Int): [Manga]
}
type Mutation {
  createManka(mangaInput: MangaInput): String!
  updateManka(ID:ID!, mangaInput: MangaInput): String!
  deleteManka(ID:ID!): String!
}
`;

export default MankatypeDefs;
