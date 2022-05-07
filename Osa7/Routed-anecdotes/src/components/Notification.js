import React from 'react'

const Notification = ({ notification }) => {

  const style = {
    marginTop: '5px',
    border: '2px solid red'
  }

  return (
    <div style={style}>{notification}</div>
  )
}

export default Notification