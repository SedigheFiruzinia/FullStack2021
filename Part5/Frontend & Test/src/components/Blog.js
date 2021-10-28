import React, { useState } from 'react'

const Blog = ({ blog,update,remove }) => {


  const [visible, setVisible] = useState(false)
  //const [likes,setLikes] = useState(blog.likes)


  const toggleVisibility = () => {
    setVisible(!visible)
  }
  /*
  const removeBlog = () => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.auther}`)) {

      blogService.deleteBlog(blog.id)
        .then(
          setBlogs(blogs.filter(b => b.id !== blog.id))
        )
    }

  }
*/

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return(
    <div>

      {!visible &&
        <div style= {blogStyle} className='blogclass'>{blog.title} {blog.auther}
          <button onClick={toggleVisibility}>view</button></div>
      }

      {visible &&
        <div style= {blogStyle}>
          <div id='blogsArray'>{blog.title} {blog.auther}
            <button onClick={toggleVisibility}>hide</button></div>
          <div>{blog.likes} <button onClick={() => update(blog)}>like</button> </div>
          <div>{blog.url} </div>
          <div>{blog.user.name}</div>
          <button onClick={() => remove(blog)}>remove</button>
        </div>
      }
    </div>
  )
}

export default Blog