import "./Avatar.css"
import { useSelector,useDispatch } from 'react-redux'
import {  setOpenMenuUser} from "../../feacture/viewActive/viewActiveSlice";
import MenuUser from '../menuUser/MenuUser';

const Avatar = () => {
  const email=useSelector((state)=>state.user.data.user.email);
  const openMenuUser=useSelector((state)=>state.viewActive.data.openMenuUser);
  const dispatch=useDispatch();

  const handlerOpenMenuUser=()=>{
    dispatch(setOpenMenuUser());
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