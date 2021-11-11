import React from 'react'
import Togglable from './Togglable'
import CreatBlogForm from './CreatBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { blogCreated } from '../reducers/blogReducer'
import { blogCreatedMsg } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'


//////////////////////////////////////////////
const Blogs = () => {
  const user = useSelector(element => element.User)
  const blogs = useSelector(element => element.Blogs)
  const dispatch = useDispatch()

  ////////////////////////////////////////////////
  const handleCreate = (blogObject) => {
    dispatch(blogCreated(blogObject))
    const msg = `a new blog ${blogObject.title} added`
    dispatch(blogCreatedMsg(msg))
  }

  return(
    <div>
      <h2 style={{ marginTop: 100, textAlign:'center', color:'GrayText' }}>Blog App</h2>
      <Togglable buttonLabel='+' >
        <CreatBlogForm creat={handleCreate}/>
      </Togglable>
      <p/>
      <Table hover variant='info'>
        <tbody>
          {blogs.sort(function(a,b){return b.likes-a.likes})
            .map(a => a.user.username===user.user.username &&
            <tr key={a.id}>
              <td>
                <Link to={`/blogs/${a.id}`} style={{ color:'blue', fontSize:18 }} > {a.title}  </Link>
              </td>
              <td>
                {a.auther}
              </td>
            </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}
export default Blogs