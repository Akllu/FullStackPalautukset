const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const { genre } = args
      const author = await Author.findOne({ name: args.author })

      if (author && genre) {
        return await Book
          .find({ author: author, genres: { $in: genre } }).populate('author')
      } else if (author) {
        return await Book.find({ author: author }).populate('author')
      } else if (genre) {
        return await Book.find({ genres: { $in: genre } }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async (root, args) => {
      const books = await Book.find({})
      const genres = [...new Set(books.flatMap(b => b.genres))].concat('all genres')
      return genres
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root }).populate('author')
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }  
      }

      const book = new Book({ ...args, author })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {

      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      
      return author  
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args
      const user = new User({ username, favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers