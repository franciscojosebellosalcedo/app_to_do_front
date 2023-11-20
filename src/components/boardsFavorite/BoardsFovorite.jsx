import { ROUTES } from "../../constanst/constants";
import "./BoardsFavorite.css";
import { useNavigate } from "react-router-dom";
import {  useSelector,useDispatch} from "react-redux";
import { changeStateIsFavoriteBoard } from "../../helpers/helpers";

const BoardsFovorite = ({ boardsFavorites }) => {
    const accessToken=useSelector((state)=>state.user.data.accessToken);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectBoard = (workArea, board) => {
        navigate(ROUTES.WORK_AREA_BOARD + `/${workArea?._id}/board/${board?._id}`);
    }

    return (
        <>
            {
                boardsFavorites && boardsFavorites.length > 0 ?
                    <div className='container__boards__favorites'>
                        <h1 className="work__area__title"><i className="uil uil-star icon__favorite__board"></i>Tableros favoritos</h1>
                        <div className='grid__boards grid__boards__favorites'>
                            {
                                boardsFavorites.map((board, index) => (
                                    <div onClick={() => redirectBoard(board.workArea, board)} key={index} className='item__board' style={{ backgroundColor: `${board?.colorBackground}` }}>
                                        {board?.title}
                                        <i className="uil uil-star icon__favorite" style={{ color: board.isFavorite && "yellow" }} onClick={(e) => changeStateIsFavoriteBoard({e,board,accessToken,dispatch})}></i>
                                    </div>
                                ))
                            }
                        </div>
                    </div> : ""
            }
        </>
    )
}

export default BoardsFovorite;