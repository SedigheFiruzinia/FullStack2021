import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="success" size='sm' id='create-new-blog-button' onClick={toggleVisibility}>{props.buttonLabel}</Button>
        {' '} Create Blog
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button style={{ marginLeft:20 }} variant="secondary" size='sm' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable