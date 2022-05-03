import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: notification.type === 'error' ? 'red' : 'black'
  }

  return (
    <>
      {notification.message === ''
        ? <></>
        : <div style={style}>
            {notification.message}
          </div>
      }
    </>
  )
}

export default Notification