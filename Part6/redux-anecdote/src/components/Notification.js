
import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'


const Notification = (props) => {
  //const notification = useSelector(state=>state.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    notification: state.message
  }
}

const ConnectedNF=connect(mapStateToProps)(Notification)
export default ConnectedNF