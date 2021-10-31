import React from 'react'
import { setFilter } from '../reducers/filterReducer'
//import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const Filter = (props) => {
  //const dispatch = useDispatch()

  const handleChange = (event) => {
    const filter = event.target.value
    //dispatch(setFilter(filter))
    props.setFilter(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const ConnectedFilter = connect(null,{setFilter})(Filter)
export default ConnectedFilter