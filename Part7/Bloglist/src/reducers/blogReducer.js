import blogService from '../services/blogsService'

export const blogInitialized = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'Blog-Initialized',
      payload: {
        blogs
      }
    })
  }
}
export const blogCreated = (blog) => {
  return async dispatch => {
    await blogService.creatBlog(blog)
    dispatch({
      type: 'Blog-Created',
      payload: {
        blog: blog
      }
    })
  }
}
export const commentAdded = (id,comment) => {
  return async dispatch => {
    await blogService.createComment(id,comment)
    dispatch({
      type: 'Comment-Added',
      payload: {
        id: id,
        comment: comment
      }
    })
  }
}

export const blogRemoved = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'Blog-Removed',
      payload: {
        id: id
      }
    })
  }
}
export const blogUpdated = (likes,id) => {

  return async dispatch => {
    await blogService.updateLikes(likes, id)

    dispatch({
      type: 'Blog-Updated',
      payload: {
        id: id,
        likes: likes
      }
    })
  }
}

const BlogReducer = (state=[],action) => {

  switch (action.type){
  case 'Blog-Created':
    return [ ...state, action.payload.blog]

  case 'Blog-Removed':
    return state.filter(blog => blog.id!==action.payload.id)

  case 'Blog-Updated':
    return state.map(blog => blog.id===action.payload.id
      ? { ...blog,likes:action.payload.likes } : blog)

  case 'Blog-Initialized':
    return action.payload.blogs

  case 'Comment-Added':
    return state.map(blog => blog.id===action.payload.id
      ? { ...blog, comments:[...blog.comments, action.payload.comment] } : blog)

  default:
    return state
  }
}

export default BlogReducer