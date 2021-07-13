import { gql } from "@apollo/client";

export const AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      id
    }
  }
`;

export const BOOKS = gql`
query GetBooks {
  books {
    id
    name
    genre
  }
}
`;

export const addBookMutation = gql`
    mutation (
        $name: String!,
        $genre: String!,
        $authorId: ID!
      ) {
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

export const getBookQuery = gql`
    query($id: ID!){
        book(id: $id){
            id
            name
            genre
            author {
                id
                name
                books {
                    id
                    name
                }
            }
        }
    }
`;