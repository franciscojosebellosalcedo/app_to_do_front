import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constanst/constants'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import LoginGuard from '../guards/LoginGuard'
import AuthGuard from '../guards/AuthGuard'
import Dashboard from '../pages/dashboard/Dashboard'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<div>Parece que estás perdido</div>}></Route>

        <Route element={<LoginGuard />}>
          <Route path={ROUTES.LOGIN} element={<Login />}></Route>
        </Route>

        <Route element={<LoginGuard />}>
          <Route path={ROUTES.REGISTER} element={<Register />}></Route>
        </Route>

        <Route element={<AuthGuard />}>
          <Route path={ROUTES.DASHBOARD.PATH_INITIAL} element={<Dashboard/>}>
            <Route path={"hola1"} element={<div>hola1</div>}></Route>
            <Route path={"hola2"} element={<div>hola2</div>}></Route>
          </Route>
        </Route>

       

      </Routes>
    </BrowserRouter>
  )
}

export default Routers