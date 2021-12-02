const mongoose = require('mongoose')
const {gql,ApolloServer, UserInputError} = require('apollo-server')
const Authors = require('./models/Author') 
const Books = require('./models/Book')
const Users = require ('./models/User')
const jwt = require('jsonwebtoken')
const User = require('./models/User')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()



const JWT_SECRET = 'M//bgytjlkjhgdzxd2515451//lkbgcf255'

MONGODB_URI='mongodb+srv://Mahmoodreza:Mahmoodreza@cluster0.gfsqg.mongodb.net/graphql?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
.then(()=>{
    console.log('connected to MongoDB')
})
.catch((error)=>{
    console.log('error connection to MongoDB',error.message)
})

mongoose.set('debug',true)
const typeDefs = gql`
type Subscription {
    bookAdded: Book!
}
type User {
    username: String!
    favoriteGenre: String!
    id: ID!
}
type Token {
    value: String!
    user: User!
}
type Book{
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id:ID!
}
type Author{
  name: String!
  id: ID!
  born: Int
  bookCount: Int
}
type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks( genre:String): [Book!]!
    allAuthors: [Author!]!
    me: User!
}
type Mutation {

  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
  ) : Book

  editAuthor(
      name: String!
      born:Int!
  ) : Author

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
       bookCount: () => Books.collection.countDocuments(),
       authorCount: () => Authors.collection.countDocuments(),
       allBooks: async (root,args) => {
         let result= await Books.find({}).populate('author')
        if (args.genre){
          result = result.filter(b => b.genres.includes(args.genre))
        }
        return result
        },
      allAuthors: async () => {
          const a= await Authors.find({}).populate('Books')
          console.log('authors.find')
          return a
        },
      me: async (root, args, context) => await context.currentUser,
    },
    Author: {
      bookCount: async (root) => {
        const BookList = await Books.find({}).populate('author')
        return BookList.filter(b=>b.author.name===root.name).length
      }
    },
    Mutation: {
        createUser: (root,args)=>{
            const user = new Users({...args})
            return user.save()
            .catch(error=>{
                throw new UserInputError(error.message , {invalidArgs: args})
            })
        },

        login: async (root,args)=>{
            const user = await User.findOne({username:args.username})
            if(!user || args.password !== "m"){
                throw new UserInputError('wrong credentials')
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return {value : jwt.sign(userForToken,JWT_SECRET), user:user}
        },

        addBook: async (root,args,context) => {
            console.log('args.author',args.author)
            const author = await Authors.findOne ({name : args.author})
            const book = new Books({...args,author:author })
            const currentUser = context.currentUser
            if (!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            try{
                await book.save()
            }
            catch (error){
                throw new UserInputError (error.message , {invalidArgs: args})
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },

        editAuthor : async (root,args,context) => {
            const currentUser = context.currentUser
            if (!currentUser){
                throw new AuthenticationError('not authenticated')
            }
            let editable = await Authors.findOne ({name : args.name})
            if(editable){
                return  Authors.findOneAndUpdate({name:{$in:args.name}},{$set:{born:args.born}})
            }
            editable = new Authors({name:args.name , born:args.born})
            try{
                await editable.save()
            }
            catch(error){
                throw new UserInputError (error.message,{invalidArgs:args})
            }
            return editable
        }
    },

    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null

        if(auth && auth.toLowerCase().startsWith('bearer')){ 
            const decodedToken = jwt.verify(
            auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
  })
  
  server.listen().then(({ url,subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  })

    
