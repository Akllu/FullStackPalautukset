import React from 'react'

const Filter = (props) => {
  return (
    <div>
        Search by name or phone number:
        <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

export default Filter