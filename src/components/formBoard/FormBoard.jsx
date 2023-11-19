import "./FormBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalFormBoard } from "../../feacture/viewActive/viewActiveSlice";
import { OPTIONS_COLOR } from "../../constanst/constants";
import { useState,useEffect } from "react";
import {addNewBoard  } from "../../feacture/workArea/workAreaSlice";
import {createNewBoard} from "../../services/board";
import {toast } from 'sonner';

const FormBoard = () => {
  const openModalFormBoard = useSelector((state) => state.viewActive.data.openModalFormBoard);
  const listWorksAreas = useSelector((state) => state.workArea.data);
  const accessToken = useSelector((state) => state.user.data.accessToken);
  const [openOptionSelect, setOptionSelect] = useState(false);
  const [newBoard,setNewBoard]=useState({title:"",colorBackground:"",workArea:""});
  const [workAreaSelected,setWorkAreaSelected]=useState(null);

  const dispatch = useDispatch();
  const [listOptionColor, setListOptionColor] = useState([]);

  const handlerSelectedColor = (index) => {
    const listOptions = listOptionColor;
    listOptions.map((item) => {
      item.isSelected = false;
    });
    listOptions[index].isSelected = true;
    handelerForm("colorBackground",OPTIONS_COLOR[index]);
    setListOptionColor([...listOptions]);
  }

  const handlerOptionSelect = () => {
    setOptionSelect(!openOptionSelect);
  }

  const handelerForm=(target,value)=>{
    setNewBoard({...newBoard,[target]:value});
  }

  const handlerOption=(index)=>{
    const workArea=listWorksAreas[index];
    setWorkAreaSelected(workArea?.name);
    handelerForm("workArea",workArea?._id);
    handlerOptionSelect();
  }

  const createBoard=async(e)=>{
    e.preventDefault();
    try {
      if(newBoard.title != "" && newBoard.workArea){
        const responseCreatedBoard=await createNewBoard(accessToken,newBoard);
        if(responseCreatedBoard.status===200 && responseCreatedBoard.response){
          const data=responseCreatedBoard.data;
          dispatch(setOpenModalFormBoard());
          dispatch(addNewBoard({_id:newBoard.workArea,newBoard:data}));
          setWorkAreaSelected(null);
          setNewBoard({...newBoard,title:"",colorBackground:OPTIONS_COLOR[0],workArea:""});
          toast.success(responseCreatedBoard.message);
        }else{
          toast.error(responseCreatedBoard.message);
        }
      }
    } catch (error) {
      toast.error("Error al crear el tablero");

    }
  }

  useEffect(() => {
    const list = [];
    OPTIONS_COLOR.map(() => {
      list.push({ isSelected: false });
    });
    list[0].isSelected = true;
    handelerForm("colorBackground",OPTIONS_COLOR[0]);
    setListOptionColor(list);
  }, []);


  return (
    <>
      {
        openModalFormBoard === true ?
          <div className="container__modal container__modal__form__board">
            <section className="modal modal__form__board">
              <i className="uil uil-multiply icon__close" onClick={() => dispatch(setOpenModalFormBoard())}></i>
              <h1 className="modal__title">Crear un tablero</h1>
              <form className="form__board">
                <div className="form__item">
                  <label htmlFor="background__board">Color de Fondo</label>
                  <section className="grid__colors">
                    {
                      OPTIONS_COLOR.map((color, index) => (
                        <div key={index} style={{ backgroundColor: `${color}` }} className="item__color" onClick={() => handlerSelectedColor(index)}>
                          {
                            listOptionColor[index] && listOptionColor[index].isSelected === true
                              ?
                              <div className="icon__selected"><i className="uil uil-check"></i></div>
                              :
                              <p>f</p>
                          }
                        </div>
                      ))
                    }
                  </section>

                </div>

                <section className='form__section'>
                  <label htmlFor="input__select">Area de trabajo</label>
                  <div id='input__select' className='input__select'>
                    <div onClick={() => handlerOptionSelect()}>
                      {workAreaSelected=== null ?"Elige...": workAreaSelected} <i className="uil uil-angle-down icon__dropdown"></i>
                    </div>
                    {
                      openOptionSelect &&
                      <section className='background__element__absolute options__select options__select__wor__area'>
                        {
                         listWorksAreas && listWorksAreas.length >0 ? 
                          <>
                            {
                              listWorksAreas.map((workArea,index)=>(
                                <div onClick={()=>handlerOption(index)} key={index} className='option__select'>{workArea?.name}</div>
                              ))
                            }
                          </>
                         :""
                        }
                      </section>
                    }
                  </div>
                </section>

                <div className="form__item">
                  <label htmlFor="title__board">Título del tablero</label>
                  <input value={newBoard.title} onInput={(e)=>handelerForm("title",e.target.value)} className="input__form__board " type="text" id="title__board" placeholder="Mi tablero" />
                </div>
                
                <button onClick={(e)=>createBoard(e)} className={`btn__create__board ${newBoard.title==="" || newBoard.workArea === "" ?"disable__cursor" :""}`}  >Guardar</button>
              </form>
            </section>
          </div> : ""
      }
    </>
  )
}

export default FormBoard;