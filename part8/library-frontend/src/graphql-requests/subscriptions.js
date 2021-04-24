import { gql } from '@apollo/client'
const BOOK_DETAIL = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
    }
`

export const NEW_BOOK_ADDED = gql`
    subscription {
        newBookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAIL}
`
