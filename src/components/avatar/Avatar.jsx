import React, { useState } from 'react'
import "./Avatar.css"
import { useSelector } from 'react-redux'
import MenuUser from '../menuUser/MenuUser';

const Avatar = () => {
  const email=useSelector((state)=>state.user.data.user.email);
  const [openMenuUser,setOpenMenuUser]=useState(false);

  const handlerOpenMenuUser=()=>{
    setOpenMenuUser(!openMenuUser);
  }

  return (
    <>
    <div className='avatar' onClick={()=>handlerOpenMenuUser()}>
      {email && email[0].toUpperCase()}
    </div>
    <MenuUser open={openMenuUser} setOpen={handlerOpenMenuUser}/>
    </>
  )
}

export default Avatar;