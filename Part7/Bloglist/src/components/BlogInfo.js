import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { blogUpdated } from '../reducers/blogReducer'
import { commentAdded } from '../reducers/blogReducer'

const BlogInfo = () => {
  const [comment , setComment]=useState('')
  const blogs = useSelector(element => element.Blogs)
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(b => b.id===id)
  console.log(blog)

  const update =(blog) => {
    // const newBlog = {
    //   // id:blog.id,
    //   // title: blog.title,
    //   // auther: blog.auther,
    //   // url: blog.url,
    //   // user: blog.user,
    //   likes: blog.likes +1
    // }

    console.log(`likes ${blog.likes+1}`)
    dispatch(blogUpdated( blog.likes +1 ,id))
  }

  const newComment = (event) => {
    event.preventDefault()
    console.log('first in newComment()')
    dispatch(commentAdded(id,comment))
  }



  if (!blog){
    return null
  }

  return(
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url} </a>
      <div>{blog.likes} <button onClick={() => update(blog)}>like</button> </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form onSubmit={newComment}>
        <input type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {blog.comments.map((b,index) => <li key={index}>{b}</li>)}
    </div>
  )

}

export default BlogInfo