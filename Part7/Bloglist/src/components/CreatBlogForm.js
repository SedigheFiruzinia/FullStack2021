import React, { useState } from 'react'
import { Form, Button,Col } from 'react-bootstrap'

const CreatBlogForm=({ creat }) => {
  const [title, setTitle] = useState('')
  const [auther, setAuther] = useState('')
  const [url, setUrl] = useState('')

  /////////////////////////////////////////////
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
  //////////////////////
  /////////////////////////////////////
  return(
    <div className = "formDiv" >
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Col xs={4}>
            <Form.Control
              placeholder="Title"
              type="text"
              id='title'
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              placeholder="Author"
              type="text"
              id='auther'
              value={auther}
              name="auther"
              onChange={({ target }) => setAuther(target.value)}
            />
          </Col>
          <Col xs={4}>
            <Form.Control
              placeholder="URL"
              type="text"
              id='url'
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Col>
          <div style={{ height:2 }}><br /></div>
          <Button style={{ marginLeft:20 }} variant="info" size="sm" id="creat-button" type="submit">create</Button>
        </Form.Group>
      </Form>
      <div style={{ height:2 }}><br /></div>
    </div>
  )
}
export default CreatBlogForm