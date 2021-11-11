import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersTable = ({ user }) => {

  return(
    <tr>
      <td>
        <Link to={`/users/${user.id}`}> {user.name} </Link>
      </td>
      <td> {user.blogs.length} </td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(element => element.Users)
  return(
    <div style={{ marginTop:150 }}>
      <Table variant='secondary'>
        <tbody>
          <tr>
            <td style={{ fontWeight:'bold' }}>User</td>
            <td style={{ fontWeight:'bold' }}>Number of Blogs</td>
          </tr>
          {
            users.map(a => <UsersTable key = {a.id} user={a}/>)
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Users