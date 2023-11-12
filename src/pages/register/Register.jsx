import React from 'react'
import { Link } from "react-router-dom";
import { ROUTES } from "../../constanst/constants";
import { useState } from 'react';
import { Toaster, toast } from 'sonner'
import { createAccontUser } from '../../services/user';

const Register = () => {
  const regex =/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  const [enableOtherInput,setEnableOtherInput]=useState(false);
  const [newUser,setNewUser]=useState({email:"",password:""});
  const [messageWarningPassword,setMessageWarningPassword]=useState("Por favor ingrese una contraseña");
  const [isWarningEmail,setIsWarningEmail]=useState(false);
  const [isWarningPassword,setIsWarningPassword]=useState(false);

  const handLerForm=(target,value)=>{
    if(target==="email"){
      if(!validationEmail(value)){
        setEnableOtherInput(false);
        setIsWarningPassword(false);
      }else{
        setIsWarningEmail(false);
      }
    }
    if(target==="password"){
      if(value.length<8){
        setIsWarningPassword(true);
        setMessageWarningPassword("Contraseña muy pequeña");
      }else{
        setIsWarningPassword(false);
      }
    }
    setNewUser({...newUser,[target]:value});
  }

  const validationEmail=(email)=>{
    return regex.test(email);
  }

  const createUser=async (e)=>{
    e.preventDefault();
    try{
      if(!validationEmail(newUser.email)){
        setEnableOtherInput(false);
        setIsWarningPassword(false);
        setIsWarningEmail(true);
        return;
      }
      if(newUser.password===""){
        setIsWarningPassword(true);
        setMessageWarningPassword("Por favor ingrese una contraseña")
        return;
      }
      if(validationEmail(newUser.email) && newUser.password.length>=8){
        const responseCreateAccont=await createAccontUser(newUser);
        if(responseCreateAccont.status===200 && responseCreateAccont.response){
          setNewUser({email:"",password:""});
          toast.success(responseCreateAccont.message);
          setEnableOtherInput(false);
        }else{
          toast.error(responseCreateAccont.message);
        }
      }
    }catch(error){
      toast.error('Error al crear la cuenta');
    }
  }


  const continueAccess=(e)=>{
    e.preventDefault();
    if(!validationEmail(newUser.email)){
      setIsWarningEmail(true);
      setEnableOtherInput(false);
      setIsWarningPassword(false);
      return;
    }else if(validationEmail(newUser.email)){
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
        <p>Registrate para continuar</p>
        <section className='container__inputs'>
          <div>
            <input value={newUser.email} onInput={(e)=>handLerForm("email",e.target.value)} className='input input__form__access' type="email" placeholder='Ingresa tu correo electrónico' />
            {
              isWarningEmail===true ? <span className='warning '><i className="uil uil-exclamation-triangle"></i> Por favor ingrese un correo electrónico valido</span> :""
            }
          </div>
          {
            enableOtherInput===true ? <div>
            <input value={newUser.password} onInput={(e)=>handLerForm("password",e.target.value)} className='input input__form__access' type="password" placeholder='Ingresa una contraseña' />
            {
              isWarningPassword===true ?  <span className='warning'><i className="uil uil-exclamation-triangle"></i> {messageWarningPassword}</span> :""
            }
          </div>:""
          }
          <button type='submit' onClick={(e)=>enableOtherInput === false ? continueAccess(e):createUser(e)} className='primary btn__form__access'>{enableOtherInput=== false ? "Continuar":"Crear cuenta"}</button>
        </section>
        <div className='container__links'>
          <Link className='form__link' href="#">¿ Nesecitas ayuda ?</Link>
          <Link className='form__link' to={ROUTES.LOGIN} >Iniciar sesión</Link>
        </div>
      </form>
    </div>
  )
}

export default Register