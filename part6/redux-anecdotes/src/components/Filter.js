import React from 'react'
import { connect } from 'react-redux'
import { createFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.createFilter(filter)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style} className='filter'>
      Filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  createFilter
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter