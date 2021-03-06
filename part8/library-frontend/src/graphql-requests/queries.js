import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query bookByGenre($genre: String!) {
        allBooks(genres: $genre) {
            title
            author {
                name
            }
            published
        }
    }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`
