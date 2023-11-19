import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../constanst/constants'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import LoginGuard from '../guards/LoginGuard'
import AuthGuard from '../guards/AuthGuard'
import WorksArea from '../pages/dashboard/workArea/WorksArea'
import WorkAreaDetails from '../pages/dashboard/workAreaDetails/WorkAreaDetails'

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
          <Route path={ROUTES.WORKS_AREAS} element={<WorksArea/>}></Route>
        </Route>

        <Route element={<AuthGuard />}>
          <Route path={ROUTES.WORK_AREA_DETAIL+"/:id"} element={<WorkAreaDetails/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Routers