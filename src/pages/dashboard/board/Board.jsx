import React, { useEffect } from 'react';
import NavBar from '../../../components/navBar/NavBar';
import "./Board.css";

const Board = () => {

  useEffect(()=>{
  },[])
  return (
    <div className='container__section__board__details'>
        <NavBar/>
        <section className='container__board__details'>
        </section>
    </div>
  )
}

export default Board;