import React from 'react'

const Filter = (props) => {
  return (
    <div>
        Find countries:
        <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  )
}

export default Filter