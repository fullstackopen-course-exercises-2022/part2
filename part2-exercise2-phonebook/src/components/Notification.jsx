import React from 'react'
import './notification.css';

const Notification = ({ message }) => {
  if(message.includes('ERROR')) {
    return (
        <>
          <div className='error'>{message}</div>
        </>
    )
  } else {
    return (
        <>
          <div className='notification'>{message}</div>
        </>
    )
  }
}

export default Notification