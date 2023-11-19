import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constanst/constants";
import { useState } from 'react';
import { Toaster, toast } from 'sonner'
import "./Login.css";
import { login } from '../../services/user';

import {useDispatch } from 'react-redux';
import { setUser } from '../../feacture/user/userSlice';


const Login = () => {
  const regex =/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  const [enableOtherInput,setEnableOtherInput]=useState(false);
  const [credencials,setCredencials]=useState({email:"",password:""});
  const [messageWarningPassword,setMessageWarningPassword]=useState("Por favor ingrese una contraseña");
  const [isWarningEmail,setIsWarningEmail]=useState(false);
  const [isWarningPassword,setIsWarningPassword]=useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handLerForm=(target,value)=>{
    if(target==="email"){
      if(!validationEmail(value)){
        setEnableOtherInput(false);
        setIsWarningPassword(false);
      }else{
        setIsWarningEmail(false);
      }
    }
    setIsWarningPassword(false)
    setCredencials({...credencials,[target]:value});
  }

  const validationEmail=(email)=>{
    return regex.test(email);
  }

  const loginUser=async (e)=>{
    e.preventDefault();
    try{
      if(!validationEmail(credencials.email)){
        setEnableOtherInput(false);
        setIsWarningPassword(false);
        setIsWarningEmail(true);
        return;
      }
      if(credencials.password===""){
        setIsWarningPassword(true);
        setMessageWarningPassword("Por favor ingrese una contraseña")
        return;
      }
      if(validationEmail(credencials.email) && credencials.password!==""){
        const responseLogin=await login(credencials);
        if(responseLogin.status===200 && responseLogin.response){
          dispatch(setUser(responseLogin.data));
          navigate(`${ROUTES.WORKS_AREAS}`);
        }else{
          toast.error(responseLogin.message);
        }
      }
    }catch(error){
      toast.error('Error al iniciar sesión');
    }
  }


  const continueAccess=(e)=>{
    e.preventDefault();
    if(!validationEmail(credencials.email)){
      setIsWarningEmail(true);
      setEnableOtherInput(false);
      setIsWarningPassword(false);
      return;
    }else if(validationEmail(credencials.email)){
      setEnableOtherInput(true);
      return;
    }
  }

  return (
    <div className='container background__access conatiner__access'>
      <Toaster position="top-center" richColors expand={false}/>
      <form className='form__access'>
        <div className='form__logo'>
          <img className='logo__form__access' src={require("../../assets/icon-codeJr.png")} alt="logo" />
          <h1 className='title__app'>DoList</h1>
        </div>
        <p>Inicia sesión para continuar</p>
        <section className='container__inputs'>
          <div>
            <input value={credencials.email} onInput={(e)=>handLerForm("email",e.target.value)} className='input input__form__access' type="email" placeholder='Ingresa tu correo electrónico' />
            {
              isWarningEmail===true ? <span className='warning '><i className="uil uil-exclamation-triangle"></i> Por favor ingrese un correo electrónico valido</span> :""
            }
          </div>
          {
            enableOtherInput===true ? <div>
            <input value={credencials.password} onInput={(e)=>handLerForm("password",e.target.value)} className='input input__form__access' type="password" placeholder='Ingresa una contraseña' />
            {
              isWarningPassword===true ?  <span className='warning'><i className="uil uil-exclamation-triangle"></i> {messageWarningPassword}</span> :""
            }
          </div>:""
          }
          <button type='submit' onClick={(e)=>enableOtherInput === false ? continueAccess(e):loginUser(e)} className='primary btn__form__access'>{enableOtherInput=== false ? "Continuar":"Iniciar sesión"}</button>
        </section>
        <div className='container__links'>
          <Link className='form__link' href="#">¿ Nesecitas ayuda ?</Link>
          <Link className='form__link' to={ROUTES.REGISTER} >Crear cuenta</Link>
        </div>
      </form>
    </div>
  )
}

export default Login