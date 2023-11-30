const { PubSub } = require('graphql-subscriptions')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.genre) {
                return await Book.find({ genres: args.genre }).populate('author')
            }
            return await Book.find({}).populate('author')
        },
        allAuthors: async () => {
            const authors = await Author.find({})
            const books = await Book.find({}).populate('author')
            return [...authors].map(author => {
                author.bookCount = books.filter(book => book.author.id === author.id).length
                return author
            })
        },
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
            const bookAdded = await Book.findById(book.id).populate('author')
            pubsub.publish('BOOK_ADDED', {bookAdded: bookAdded})

            return bookAdded
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
            if (!user || args.password !== "secret") {
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers