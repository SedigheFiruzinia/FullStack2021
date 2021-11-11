

export const userLoggedin = (user) => {
  return async dispatch => {
    await dispatch({
      type:'User-Logged_In',
      payload:{
        user:user,
      }
    })
  }
}
export const userLoggedOut = () => {
  return dispatch => {
    dispatch({
      type:'User-Logged-Out',
    })
  }
}

const userReducer = (state=null,action) => {
  switch(action.type){
  case 'User-Logged_In':
    return { user: action.payload.user }
  case 'User-Logged-Out':
    return null
  default:
    return state
  }

}

export default userReducer