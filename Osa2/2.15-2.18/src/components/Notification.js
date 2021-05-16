import React from 'react'

const Notification = ({ notification }) => {
    if(notification.message === null) {
        return null
    }
    else if (notification.type === 'success') {
        return (
            <div className='success'>
            {notification.message}
            </div>
        )
    }
    else {
        return (
            <div className='error'>
                {notification.message}
            </div>
        )
    }
}

export default Notification 