import React from 'react'

const Notification = ({ notification }) => {

  const notificationStyle = {
    fontSize: 18,
    backgroundColor: 'lightgray',
    color: notification?.type === 'success' ? 'green' : 'red',
    border: notification?.type === 'success' ? '3px solid green' : '3px solid red',
    borderRadius: 10,
    padding: 10,
    marginTop: 10
  }

  return (
    <>
      {notification &&
      <div style={notificationStyle}>{notification.message}</div>
      }
    </>
  )
}

export default Notification