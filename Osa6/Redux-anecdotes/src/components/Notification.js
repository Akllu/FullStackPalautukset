import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

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

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification