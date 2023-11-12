import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import { ROUTES } from '../constanst/constants';

const AuthGuard = () => {
    const data=localStorage.getItem("token");
  return data ? <Outlet/>:<Navigate replace to={ROUTES.LOGIN}/> ;
}

export default AuthGuard;