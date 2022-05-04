import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: 'Hello World!', type: 'normal' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type
      }
    },
    removeNotification(state, action) {
      return {
        message: ''
      }
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const addNotification = (notification, time) => {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer