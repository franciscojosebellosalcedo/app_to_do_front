import React from 'react';
import {Outlet, Navigate} from "react-router-dom";
import { ROUTES } from '../constanst/constants';

const LoginGuard = () => {
    const data=localStorage.getItem("data");
  return data ? <Navigate replace to={`${ROUTES.WORKS_AREAS}`}/>:<Outlet/> ;
}

export default LoginGuard;