import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import { ROUTES } from '../constanst/constants';

const LoginGuard = () => {
    const data=localStorage.getItem("token");
  return data ? <Navigate replace to={ROUTES.DASHBOARD.PATH_INITIAL}/>:<Outlet/> ;
}

export default LoginGuard;