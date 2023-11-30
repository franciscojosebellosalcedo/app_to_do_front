import { ROUTES } from "../../constanst/constants";
import "./MenuUser.css";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../feacture/user/userSlice";
import { resetAllViewsOpen } from "../../feacture/viewActive/viewActiveSlice";

const MenuUser = ({open,setOpen}) => {
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user.data.user);
  const navigate=useNavigate();

  const redirectTo=(url)=>{
    navigate(url);
    setOpen(false);
  }

  const logoutUser=(e)=>{
    e.preventDefault();
    dispatch(removeUser());
    dispatch(resetAllViewsOpen());
    navigate(ROUTES.LOGIN,{replace:true});
  }

  return (
    <section className={`background__element__absolute menu__user ${open === true ? "see__menu__user":""}`}>
      <h1 className="title__menu">Cuenta</h1>
      <i className="uil uil-times icon__close__menu__user" onClick={()=>setOpen(false)}></i>
      <div className="info__user">
        <div className="logo__user">{user?.email && user?.email[0].toUpperCase()}</div>
        <div className="flex__info">
          <h3 className="email__user">{user?.email.split("@")[0]}</h3>
          <p className="email__user--small">{user?.email}</p>
        </div>
      </div>
      <button className="btn__menu__user admin__accconst" onClick={()=>redirectTo(ROUTES.ABOUT_USER)}><i className="uil uil-setting icon__admin__accont"></i> Administrar cuenta</button>
      <button onClick={(e)=>logoutUser(e)} className="btn__menu__user close"><i className="uil uil-signin icon__logout"></i> Cerrar sesión</button>
    </section>
  )
}

export default MenuUser;