import React, { useState } from 'react'

const CreatBlogForm=({ creat }) => {
  const [title, setTitle] = useState('')
  const [auther, setAuther] = useState('')
  const [url, setUrl] = useState('')



  const handleCreate = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      auther: auther,
      url: url,
    }
    creat(newBlog)

    setTitle('')
    setAuther('')
    setUrl('')

  }


  return(
    <div className = "formDiv">
      <form onSubmit={handleCreate}>
        <div>
        title
          <input type="text"
            id='title'
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        auther
          <input type="text"
            id='auther'
            value={auther}
            name="auther"
            onChange={({ target }) => setAuther(target.value)}
          />
        </div>
        <div>
        url
          <input type="text"
            id='url'
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="creat-button" type="submit">create</button>
      </form>
    </div>
  )
}
export default CreatBlogForm