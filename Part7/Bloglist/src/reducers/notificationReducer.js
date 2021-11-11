
export const blogCreatedMsg= (msg) => {
  return dispatch => {
    dispatch({
      type:'Blog-Created-Msg',
      payload: {
        message: msg
      }
    })
    setTimeout(() => {
      dispatch({
        type:'hide',
      })
    }, 5000)
  }
}

export const loginFailed= () => {
  return async dispatch => {
    await dispatch({
      type:'Login-Failed',
      payload:{
        message:'Incorect Username or Password'
      }
    })
    setTimeout(() => {
      dispatch({
        type:'hide',
      })
    }, 5000)

  }
}


const notificationReducer = (state={} , action) => {
  switch (action.type){
  case 'Blog-Created-Msg':
    return { message: action.payload.message,  style:'success' }
  case 'Login-Failed':
    return { message: action.payload.message, style:'error' }
  case 'hide':
    return {}
  default :
    return state
  }
}

export default notificationReducer