import React from 'react'
import "./Avatar.css"
import { useSelector } from 'react-redux'

const Avatar = () => {
  const email=useSelector((state)=>state.user.data.user.email);
  return (
    <div className='avatar'>{email && email[0].toUpperCase()}</div>
  )
}

export default Avatar;