import "./SearchNavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../helpers/helpers";
import { setOpenSearchNavBar } from "../../feacture/viewActive/viewActiveSlice";
import {  useNavigate} from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../constanst/constants";


const SearchNavBar = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.board.data.list);
    const [dataFound, setDataFound] = useState([]);
    const [value, setValue] = useState("");

    const handLerFormSearch = (value) => {
        setValue(value);
        setDataFound([...searchData(value, boards)]);
    }
    const closeSearch=(e)=>{
        e.preventDefault();
        dispatch(setOpenSearchNavBar());
        setDataFound([]);
        setValue("");
    }

    const redirect=(dataFoundItem)=>{
        dispatch(setOpenSearchNavBar());
        navigate(ROUTES.WORK_AREA_BOARD+`/${dataFoundItem.workArea._id}/board/${dataFoundItem._id}`)
    }

    return (
        <section className="background__element__absolute section__search__navbar">
            <i className="uil uil-multiply icon__close__search" onClick={(e)=>closeSearch(e)}></i>
            <form className="form__search__navbar">
                <h1 className="title__search">Buscar</h1>
                <input onInput={(e) => handLerFormSearch(e.target.value)} type="search" id="input__search" className="input__search__nav__bar" />
            </form>
            {
                value !== "" && dataFound.length > 0 ?

                    <section  className="list__content__found">
                        <>
                            {
                                dataFound.map((dataFoundItem, index) => (
                                    <article key={index} className="content__data__found" onClick={()=>redirect(dataFoundItem)}>
                                        <div className="color__data" style={{ backgroundColor: dataFoundItem.colorBackground }}>
                                        </div>
                                        <div className="text__data__found">
                                            <h3 className="name__data__found">{dataFoundItem?.title}</h3>
                                            <span className="name__work__area__found">{dataFoundItem?.workArea?.name}</span>
                                        </div>
                                    </article>
                                ))
                            }
                        </>
                    </section>

                    :
                    value !== "" && dataFound.length === 0 ?
                        <div className="content__not__found">
                            <img className="image__data__not__found" src={require("../../assets/data-not-found.png")} alt="image data not found" />
                            <p className="message__data__not__found">No se encotró ningún dato que coicida con lo indicado</p>
                        </div> :
                        ""
            }
        </section>
    )
}

export default SearchNavBar;