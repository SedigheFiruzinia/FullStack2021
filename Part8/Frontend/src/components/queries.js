import {gql} from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author{name}
            published
            genres
        }
    }
`
export const FIND_BOOKS = gql`
    query findBooksByGenre($genre:String!){
        allBooks (genre:$genre){
            title
            author{name}
            published
            genres
        }
    }
`


export const NEW_BOOK = gql`
    mutation newBook($title: String!, $author: String!, $published: Int!, $genres:[String!]! ) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres,
        ){
            title
            published
            genres
        }
    }
`

export const SET_BORN = gql`
mutation setBorn($name: String!, $born:Int!){
    editAuthor(
        name: $name,
        born: $born,
    ){
        name
        born
        bookCount
    }
}

`

export const LOGIN = gql`
mutation login($username:String!, $password:String!){
    login(username:$username, password:$password){
        value
        user{favoriteGenre}
    }
}
`