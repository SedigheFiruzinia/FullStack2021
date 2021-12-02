import React,{useState, useEffect} from "react"
import { useMutation , useLazyQuery} from "@apollo/client"
import { LOGIN , FIND_BOOKS} from "./queries"


const LoginForm = ({setUser , setPage, setFilterBooks, show})=>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const [getGenreBooks, findedBooks] = useLazyQuery(FIND_BOOKS) 

    const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
    console.log(error.graphQLErrors[0].message)
    }
  })

////////////////////////////////
  useEffect(()=>{
    if ( result.data ) {
        console.log('useeffect')
        const token = result.data.login.value
        const user = result.data.login.user
        setUser({token:token , user:user})
        localStorage.setItem('user-token', token)
        getGenreBooks({ variables: { genre: user.favoriteGenre.toLowerCase() } })
    }
  // eslint-disable-next-line
  }, [result.data] )
///////////////////////////////////////////
useEffect(()=>{
  if(findedBooks.data){
    console.log('useeffect2')
    setFilterBooks(findedBooks.data.allBooks)
  }
  // eslint-disable-next-line
}, [findedBooks.data])
//////////////////////////////////////////

  const submit = async (event)=>{
      event.preventDefault()
      login({variables:{username,password}})

      setPassword('')
      setUsername('')
      setPage('')
      
  }
///////////////////////////////////////////////
if (!show) {
    return null
}

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm