import Avatar from "../avatar/Avatar";
import "./NavBar.css"

import React from 'react'
import Options from "./Options";
import ListWorkAreas from "./ListWorkAreas";
import { useDispatch, useSelector } from "react-redux";
import { setOptions, setOpenWorksAreas } from "../../feacture/viewActive/viewActiveSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constanst/constants";
import FormWorkArea from "../formWorkArea/FormWorkArea";
import FormBoard from "../formBoard/FormBoard";

const NavBar = () => {
    const openListWorksArea = useSelector((state) => state.viewActive.data.openWorksAreas);
    const openOptions = useSelector((state) => state.viewActive.data.openOptions);
    const dispatch = useDispatch();
    const navigate = useNavigate()


    return (
        <header className="header">
            <nav className="nav">
                <section className="nav__section section__left ">
                    <div className="item item1" onClick={() => navigate(ROUTES.WORKS_AREAS)}>
                        <img className="logo__nav" src={require("../../assets/icon-codeJr.png")} alt="logo" />
                        <h1 className="title__app">DoList</h1>
                    </div>
                    <div className="item item2">
                        <div onClick={() => dispatch(setOpenWorksAreas())} className={`${openListWorksArea && "active"}`}>
                            Mis areas <i className="uil uil-angle-down icon__arrow"></i>
                        </div>
                        {
                            openListWorksArea && <ListWorkAreas />
                        }
                    </div>
                    <div className="item item3">
                        <button onClick={() => dispatch(setOptions())} >Crear</button>
                        {
                            openOptions && <Options />
                        }
                    </div>
                </section>
                <section className="nav__section section__rigth ">
                    <form className="form__search">
                        <i className="uil uil-search icon__search"></i>
                        <input className="input__search" type="search" placeholder="Buscar..." />
                    </form>
                    <Avatar />
                </section>
            </nav>
            <FormWorkArea />
            <FormBoard />
        </header>
    )
}

export default NavBar;