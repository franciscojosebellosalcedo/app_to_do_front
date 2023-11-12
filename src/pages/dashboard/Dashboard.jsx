import React from 'react';
import { Outlet } from "react-router-dom";
import NavBar from '../../components/navBar/NavBar';
import "./Dashboard.css";


const Dashboard = () => {
  return (
    <div className='background__dashboard dashboard color__text'>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Dashboard;