import { removeWorkArea } from "../../feacture/workArea/workAreaSlice";
import { deleteOneWorkArea } from '../../services/workArea';
import {removeOpenDelete ,handlerListOpenDelete} from "../../feacture/viewActive/viewActiveSlice";
import {removeBoardsByWorkArea} from "../../feacture/board/boardSlice";
import { useDispatch, useSelector } from "react-redux";


import { toast } from 'sonner';


const DeleteWorkArea = ({workArea,index}) => {
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const dispatch=useDispatch();


    const deleteWorkArea = async (e, id,index) => {
        e.preventDefault();
        try {
            dispatch(handlerListOpenDelete(index));
            const responseDeleted = await deleteOneWorkArea(accessToken, id);
            if (responseDeleted.status === 200 && responseDeleted.response) {
                toast.success(responseDeleted.message);
                dispatch(removeWorkArea(id));
                dispatch(removeOpenDelete(index));
                dispatch(removeBoardsByWorkArea(workArea._id));
            } else {
                toast.error(responseDeleted.message);
            }
        } catch (error) {
            toast.error("Error al eliminar el area de trabajo");
        }
    }

    return (
        <section className='background__element__absolute content__delete__work__area'>
            <i className="uil uil-multiply icon__close__list__work__areas" onClick={() => dispatch(handlerListOpenDelete(index))}></i>
            <h1 className='title__delete title__delete__work__area'>¿ Eliminar area de trabajo ?</h1>
            <h2 className="delete__name">{workArea?.name}</h2>
            <div className="container__icon">
                <i className="uil uil-exclamation-triangle icon__warning__delete"></i>
            </div>
            <p className="warning__delete"> Al eliminar el area de trabajo se eliminará toda la información de este, incluyento tableros, listas, etc.</p>
            <button className="btn__delete__work__area" onClick={(e) => deleteWorkArea(e, workArea?._id, index)}>Eliminar </button>
        </section>
    )
}

export default DeleteWorkArea;