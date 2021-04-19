const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '\\.env') })
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const _ = require('lodash')
const uuid = require('uuid')
const book = require('./models/book')

const TEST_MONGO_URI = process.env.TEST_MONGO_URI
console.log(TEST_MONGO_URI)
mongoose.connect(TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: Author!
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
        bookCount: async () => await Book.count({}),
        authorCount: async () => await Author.count({}),
        allBooks: async (root, args) => {
            if (_.isEmpty(args)) {
                return await Book.find({})
            }
            const books = await Book.find({})
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
        allAuthors: async (root, args) => {
            const authors = await Author.find({})
            const books = await Book.find({}).populate('author')

            return authors.map((author) => {
                return {
                    id: author.id,
                    name: author.name,
                    born: author.born,
                    bookCount: _.filter(
                        books,
                        (book) => book.author.name === author.name
                    ).length,
                }
            })
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            if (!(args.title && args.author && args.published)) {
                throw new UserInputError(
                    'title, author, and published cannot be empty'
                )
            } else if (args.author.length < 4) {
                throw new UserInputError(
                    'Author name must be at least 4 characters long'
                )
            } else if (args.title.length < 2) {
                throw new UserInputError(
                    'Title must be at least 2 characters long'
                )
            }

            const foundAuthor = await Author.findOne({ name: args.author })
            let newlyAdded = null
            if (!foundAuthor) {
                const newAuthor = new Author({
                    name: args.author,
                })
                newlyAdded = await newAuthor.save()
            }

            const newBook = new Book({
                title: args.title,
                author: foundAuthor || newlyAdded,
                published: args.published,
                genres: args.genres || [],
            })
            return await newBook.save()
        },
        editAuthor: async (root, args) => {
            if (!(args.name && args.setBornTo)) {
                throw new UserInputError('name and setBornTo cannot be empty')
            }
            const foundAuthor = await Author.findOne({ name: args.name })
            if (!foundAuthor) {
                return null
            }
            foundAuthor.born = args.setBornTo
            return await foundAuthor.save()
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
