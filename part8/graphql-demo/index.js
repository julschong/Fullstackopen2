const { ApolloServer, UserInputError, gql } = require('apollo-server')
const _ = require('lodash')
const uuid = require('uuid')

let authors = [
    {
        name: 'Robert Martin',
        id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
        born: 1963,
    },
    {
        name: 'Fyodor Dostoevsky',
        id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
        born: 1821,
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
        genres: ['agile', 'patterns', 'design'],
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring'],
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'patterns'],
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
        genres: ['refactoring', 'design'],
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'crime'],
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
        genres: ['classic', 'revolution'],
    },
]

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String]
        id: ID!
    }
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }
    type Query {
        allBooks(author: String, genres: String): [Book!]!
        allAuthors: [Author!]!
        bookCount: Int!
        authorCount: Int!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`
const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            if (!args) {
                return books
            }
            return books.filter((book) => {
                const genresIncluded = args.genres
                    ? book.genres.includes(args.genres)
                    : true
                return (
                    book.author === (args.author || book.author) &&
                    genresIncluded
                )
            })
        },
        allAuthors: (root, args) =>
            authors.map((author) => {
                return {
                    ...author,
                    bookCount: _.filter(
                        books,
                        (book) => book.author === author.name
                    ).length,
                }
            }),
    },
    Mutation: {
        addBook: (root, args) => {
            if (!(args.title && args.author && args.published)) {
                throw new UserInputError(
                    'title, author, and published cannot be empty'
                )
            }
            if (!authors.find((author) => author.name === args.author)) {
                authors.push({ name: args.author })
            }
            const book = {
                title: args.title,
                author: args.author,
                published: args.published,
                genres: args.genres || [],
                id: uuid.v4(),
            }
            books.push(book)
            return book
        },
        editAuthor: (root, args) => {
            if (!(args.name && args.setBornTo)) {
                throw new UserInputError('name and setBornTo cannot be empty')
            }
            const foundAuthor = authors.find(
                (author) => author.name === args.name
            )
            if (!foundAuthor) {
                return null
            }
            const modifiedAuthor = { ...foundAuthor, born: args.setBornTo }
            authors = authors.map((author) => {
                if (author.id === foundAuthor.id) {
                    return modifiedAuthor
                } else {
                    return author
                }
            })
            return modifiedAuthor
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
