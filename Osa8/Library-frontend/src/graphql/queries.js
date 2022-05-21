import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS_AND_GENRES = gql`
  query getAllBooksAndGenres($author: String, $genre: String) {
    allGenres
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`