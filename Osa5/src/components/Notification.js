import React from 'react'
import styled from 'styled-components'

const SuccessMessage = styled.div`
  font-size: 18px;
  background-color: lightgray;
  color: green;
  border: 3px solid green;
  border-radius: 10px;
  padding: 10px;
`

const ErrorMessage = styled.div`
  font-size: 18px;
  background-color: lightgray;
  color: red;
  border: 3px solid red;
  border-radius: 10px;
  padding: 10px;
`

const Notification = ({ message }) => {
  if (message === null) return null

  return (
    message.type === 'success'
      ? <SuccessMessage>{message.content}</SuccessMessage>
      : <ErrorMessage>{message.content}</ErrorMessage>
  )
}

export default Notification
