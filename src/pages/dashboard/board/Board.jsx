import React from 'react'
import NavBar from '../../../components/navBar/NavBar';
import {useNavigate ,useParams } from "react-router-dom";
import { ROUTES } from '../../../constanst/constants';
import "./Board.css"
import { useEffect } from 'react';

const Board = () => {
  const navigate=useNavigate();
  const params=useParams();

  useEffect(()=>{
    console.log(params)
  },[])
  return (
    <div>
        <NavBar/>
        <section className='container__board__details'>
          <i className="uil uil-arrow-left icon__back__section" onClick={() => navigate(ROUTES.WORKS_AREAS)}></i>

        </section>
    </div>
  )
}

export default Board;