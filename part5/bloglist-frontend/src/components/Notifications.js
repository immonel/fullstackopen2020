import React from 'react'
import './Notifications.css'

// Valid types error, success and info
const Notification = ({ type, message }) => (
  message === '' ? <></> :
    <div className={type}>
      <p>{message}</p>
    </div>
)

export { Notification }