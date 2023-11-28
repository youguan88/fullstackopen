const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB', error.message)
})

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
    ): Book!
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
        username: String!
        favoriteGenre: String!
    ): User
    login(
        username: String!
        password: String!
    ): Token
  }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: () => author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                return await Book.find({ genres: args.genre }).populate('author')
            }
            return await Book.find({}).populate('author')
        },
        allAuthors: async () => await Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated',
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    }
                )
            }
            let authorExists = await Author.findOne({ name: args.author })
            if (!authorExists) {
                const newAuthor = new Author({ name: args.author })
                try {
                    await newAuthor.save()
                } catch (error) {
                    throw new GraphQLError('Error adding new author', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author, error
                        }
                    })
                }
                authorExists = await Author.findOne({ name: args.author })
            }
            const book = new Book({ ...args, author: { ...authorExists } })
            try {
                await book.save()
            } catch (error) {
                throw new GraphQLError('Error adding new book', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: error
                    }
                })
            }
            return await Book.findById(book.id).populate('author')
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated',
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    }
                )
            }
            const authorExists = await Author.findOne({ name: args.name })
            if (!authorExists) {
                return null
            }
            authorExists.born = args.setBornTo
            try {
                await authorExists.save()
            } catch (error) {
                throw new GraphQLError(`Error editing author ${args.name}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.setBornTo, error
                    }
                })
            }
            return await Author.findById(authorExists.id)
        },
        createUser: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (user) {
                throw new GraphQLError('Please choose another username', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.username
                    }
                })
            }
            const newUser = new User({ ...args })
            try {
                await newUser.save()
            } catch (error) {
                throw new GraphQLError('Error saving user', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: error
                    }
                })
            }
            return newUser
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            //ignore validation of password as per instructions
            if (!user && args.password === "secret") {
                throw new GraphQLError('Username / Password is incorrect', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})