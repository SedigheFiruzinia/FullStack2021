import usersService from '../services/usersService'

export const usersInitialized = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type:'Users-Initialized',
      payload:{
        users
      }
    })
  }
}

const userReducer = (state=[] ,action) => {
  switch(action.type){
  case 'Users-Initialized':
    console.log('in reducer')
    console.log(action.payload.users)
    return  action.payload.users
  default:
    return state
  }

}

export default userReducer