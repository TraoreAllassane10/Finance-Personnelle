import React, { useState } from 'react'

const Notification = ({message}) => {

  return (
    <div className='w-3/4 bg-green-300 font-semibold rounded-lg p-2 mb-5'>{message}</div>
  )
}

export default Notification
