const { ApolloServer, gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')

const {PubSub} =require('graphql-subscriptions')
pubsub = new PubSub()

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*

 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
type Subscription{
  bookAdded: Book!
}
  type Book{
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
  }
  type Author{
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author:String, genre:String): [Book!]!
      allAuthors: [Author!]!
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
        setBornTo:Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
      bookCount: () => books.length,
      authorCount: () => authors.length,
      allBooks: (root,args) => {
        let result=books
        if ( args.author){
            result = result.filter(b => b.author === args.author)
        }
        if (args.genre){
            result = result.filter(b => b.genres.includes(args.genre))
        }
        return result
        },
      allAuthors: () => authors
  },
  Author: {
      bookCount: (root) => {
         return books.filter(b=>b.author===root.name).length
      }
  },
  Mutation: {
      addBook: (root,args) => {
          const b = {...args, id:uuidv4() }
          books = books.concat(b)
          const a = {name:b.author , id:b.id}
          if(!authors.find(a=>a.name===b.author))
          {authors=authors.concat(a)}

          pubsub.publish('BOOK_ADDED',{bookAdded:b})

          return b
      },
      editAuthor : (root,args) => {
          const editableIndex = authors.findIndex (a => a.name === args.name)
          if (editableIndex){
            authors[editableIndex] = {...authors[editableIndex],born:args.setBornTo}
            return authors[editableIndex]
          }
          return null
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url , subscriptionsUrl}) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})