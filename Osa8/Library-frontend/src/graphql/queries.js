import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query getAllBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const ALL_BOOKS_AND_GENRES = gql`
  query getAllBooksAndGenres($author: String, $genre: String) {
    allGenres
    allBooks(author: $author, genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const FAVORITE_BOOKS = gql`
  query {
    me {
      favoriteGenre
    }
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  }
`