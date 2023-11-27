const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDB')
}).catch((error)=> {
    console.log('error connecting to MongoDB', error.message)
})

const typeDefs = `
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
  }
`

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: () => author.collection.countDocuments(),
        allBooks: async (root, args) => 
        {
            if(args.genre)
            {
                return await Book.find({genres: args.genre}).populate('author')
            }
            return await Book.find({}).populate('author')
        },
        allAuthors: async () => await Author.find({}),
    },
    Mutation: {
        addBook: async (root, args) => {
            let authorExists = await Author.findOne({name: args.author})
            if (!authorExists) {
                const newAuthor = new Author({name: args.author})
                await newAuthor.save()
                authorExists = await Author.findOne({name: args.author})
            }
            const book = new Book({...args, author: {...authorExists}})
            await book.save()
            return await Book.findById(book.id).populate('author')
        },
        editAuthor: async (root, args) => {
            const authorExists = await Author.findOne({name: args.name})
            if (!authorExists) {
                return null
            }
            authorExists.born = args.setBornTo
            await authorExists.save()
            return await Author.findById(authorExists.id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})