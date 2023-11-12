import Avatar from "../avatar/Avatar";
import "./NavBar.css"

import React from 'react'
import Options from "./Options";
import ListWorkAreas from "./ListWorkAreas";

const NavBar = () => {
    return (
        <header className="header">
            <nav className="nav">
                <section className="nav__section section__left ">
                    <div className="item item1">
                        <img className="logo__nav" src={require("../../assets/icon-codeJr.png")} alt="logo" />
                        <h1 className="title__app">DoList</h1>
                    </div>
                    <div className="item item2">
                        <div>
                            Areas de trabajo  <i className="uil uil-angle-down icon__arrow"></i>
                        </div>
                        {/* <ListWorkAreas/> */}
                    </div>
                    <div className="item item3">
                        <button>Crear</button>
                        {/* <Options/> */}
                    </div>
                </section>
                <section  className="nav__section section__rigth ">
                    <form className="form__search">
                        <i className="uil uil-search icon__search"></i>
                        <input className="input__search" type="search" placeholder="Buscar..." />
                    </form>
                    <Avatar/>
                </section>
            </nav>
        </header>
    )
}

export default NavBar;