import NavBar from "../../../components/navBar/NavBar";
import { ROUTES } from "../../../constanst/constants";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./AboutUser.css"
import { useState } from "react";
import { useEffect } from "react";
import { validationEmail } from "../../../helpers/helpers";
import { updateAccontUser } from "../../../services/user";
import {  toast} from "sonner";
import { setUser } from "../../../feacture/user/userSlice";

const AboutUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.user.data);
    const accessToken = useSelector((state) => state.user.data.accessToken);
    const [openInfoBasic, setOpenInfoBasic] = useState(true);
    const [openInfoAdvance, setOpenInfoAdvance] = useState(true);
    const [newDataUser, setNewDataUser] = useState({ email: "", biography: "" });
    const [credentials, setCredentials] = useState({ currentPassword: "", newPassword: "", repeteNewPassword: "" });
    const [isWarningEmail, setIsWarningEmail] = useState(false);
    const [enableButtonSave, setEnableButtonSave] = useState(false);
    const [isWarningNewPassword, setIsWarningNewPassword] = useState(false);
    const [isWarningPasswordRepete, setIsWarningPasswordRepete] = useState(false);


    const handlerFormInfoBasic = (target, value) => {
        if (target === "email") {
            if (!validationEmail(value)) {
                setIsWarningEmail(true);
                setEnableButtonSave(false);
            } else {
                setIsWarningEmail(false);
                setEnableButtonSave(true);
            }
            setNewDataUser({ ...newDataUser, [target]: value });
        }else{
            setNewDataUser({ ...newDataUser, [target]: value });
        }
    }

    const isValidComparationPassword = () => {
        const {newPassword, repeteNewPassword } = credentials;
        if (newPassword ===  repeteNewPassword) {
            return true;
        }
        return false;
    }

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            if (accessToken) {
                const { currentPassword, newPassword, repeteNewPassword } = credentials;
                if (currentPassword !== "" && newPassword !== "" && repeteNewPassword !== "") {
                    if(!isValidComparationPassword()){
                        toast.error("La contraseña nueva y la repetida no coinciden");
                    }else{
                        newDataUser.password=newPassword;
                        newDataUser.currentPassword=currentPassword;
                    }
                }
                delete newDataUser._id;
                const responseUpdate= await updateAccontUser(data.user._id,accessToken,newDataUser);
                if(responseUpdate.status===200 && responseUpdate.response){
                    const dataResponse=responseUpdate.data;
                    const dataUser={_id:dataResponse._id,email:dataResponse.email,biography:dataResponse.biography};
                    setNewDataUser({...newDataUser,email:dataUser.email,biography:dataUser.biography});
                    const dataSetUser={
                        user:{...dataUser},
                        accessToken:data.accessToken,
                        refressToken:data.refressToken
                    }
                     dispatch(setUser({...dataSetUser}));
                    toast.success(responseUpdate.message);
                    setCredentials({ currentPassword: "", newPassword: "", repeteNewPassword: "" });
                }else{
                    toast.error(responseUpdate.message);
                }
            }
        } catch (error) {
            toast.error("Error al actualizar los datos");
        }
    }

    const handlerFormChangePassword = (target, value) => {
        if (target === "newPassword") {
            if (value.length === 0) {
                setIsWarningNewPassword(false)
            } else {
                if (value.length < 8) {
                    setIsWarningNewPassword(true);
                } else {
                    setIsWarningNewPassword(false);
                }
            }
        }else if(target === "repeteNewPassword"  ){
            if (value.length === 0) {
                setIsWarningPasswordRepete(false)
            } else {
                if (value.length < 8) {
                    setIsWarningPasswordRepete(true);
                } else {
                    setIsWarningPasswordRepete(false);
                }
            }
        }
        setCredentials({ ...credentials, [target]: value });
    }

    const handlerOpenInfoAdvance = () => {
        setOpenInfoAdvance(!openInfoAdvance);
    }

    const handlerOpenInfoBasic = () => {
        setOpenInfoBasic(!openInfoBasic);
    }

    useEffect(() => {
        setNewDataUser({ ...data.user});
        setEnableButtonSave(true);
    }, []);

    return (

        <div>
            <NavBar />
            <div className='conatiner__content'>
                <i className="uil uil-arrow-left  icon__back__about__user" onClick={() => navigate(ROUTES.WORKS_AREAS)}></i>
                <div className="info__user info__accont">
                    <div className="logo__user logo__about__user">{data.user?.email && data.user?.email[0].toUpperCase()}</div>
                    <div className="flex__info">
                        <h3 className="email__user email__about">{data.user?.email.split("@")[0]}</h3>
                        <p className="email__user--small email__about__small">{data.user?.email}</p>
                    </div>
                </div>
                <h1 className="title__about__user">Gestione su cuenta</h1>
                <p className="paragrahp__about__user">Aquí podrás editar información sobre tu cuenta, otras acciones como cambiar su contraseña.</p>
                <h1 className="title__about__user__secundary">Acerca de {data.user?.email.split("@")[0]}</h1>
                <figure className='dividor'></figure>

                <section className="content__about__user">
                    <div className="box__flex__articles">
                        <article className="accont__user info__basic">
                            <h2 className={`title__block__info ${openInfoBasic && "rotate__arrow"}`} onClick={() => handlerOpenInfoBasic()}>Información basica <i className="uil uil-angle-right-b icon__open__item"></i></h2>
                            {
                                openInfoBasic && <form className="form__info__basic form__about__user" >
                                    <section className='form__section form__section__about__user'>
                                        <label htmlFor="input__email">Usuario</label>
                                        <input value={newDataUser?.email} id='input__email' onInput={(e) => handlerFormInfoBasic("email", e.target.value)} type="email" />
                                        {
                                            isWarningEmail === true ? <span className='warning '><i className="uil uil-exclamation-triangle"></i> Por favor ingrese un correo electrónico valido</span> : ""
                                        }
                                    </section>
                                    <section className='form__section form__section__about__user'>
                                        <label htmlFor="input__biography">Biografia (Opcional)</label>
                                        <textarea defaultValue={newDataUser?.biography} onInput={(e) => handlerFormInfoBasic("biography", e.target.value)} id="input__biography" ></textarea>
                                    </section>
                                </form>
                            }
                        </article>

                        <article className="accont__user info__advance">
                            <h2 className={`title__block__info ${openInfoAdvance && "rotate__arrow"}`} onClick={() => handlerOpenInfoAdvance()}>Información avanzada <i className="uil uil-angle-right-b icon__open__item"></i></h2>
                            {
                                openInfoAdvance && <>
                                    <form className="form__info__basic form__about__user" >
                                        <section className='form__section form__section__about__user'>
                                            <label htmlFor="input__password">Contraseña actual</label>
                                            <input value={credentials.currentPassword} onInput={(e) => handlerFormChangePassword("currentPassword", e.target.value)} type="password" id='input__password'  placeholder="Ingrese su contraseña actual" />
                                        </section>
                                        <section className='form__section form__section__about__user'>
                                            <label htmlFor="input__new__password">Contraseña nueva</label>
                                            <input value={credentials.newPassword}  onInput={(e) => handlerFormChangePassword("newPassword", e.target.value)} type="password" id='input__new__password' placeholder="Ingrese contraseña nueva" />
                                            {
                                                isWarningNewPassword === true ? <span className='warning'><i className="uil uil-exclamation-triangle"></i> Debe de tener minimo 8 caracteres</span> : ""
                                            }
                                        </section>
                                        <section className='form__section form__section__about__user'>
                                            <label htmlFor="input__repete__password">Repetir contraseña nueva</label>
                                            <input value={credentials.repeteNewPassword}  onInput={(e) => handlerFormChangePassword("repeteNewPassword", e.target.value)} type="password" id='input__repete__password' placeholder="Ingrese nuevamente contraseña nueva" />
                                            {
                                                isWarningPasswordRepete === true ? <span className='warning'><i className="uil uil-exclamation-triangle"></i> Debe de tener minimo 8 caracteres</span> : ""
                                            }
                                        </section>
                                    </form>
                                </>
                            }
                        </article>
                    </div>
                    <button className={`btn__save__info__user ${enableButtonSave === false ? "disable__cursor" : ""}`} onClick={(e)=>enableButtonSave ===true ? updateUser(e):""}>Guardar</button>

                </section>

            </div>
        </div>
    )
}

export default AboutUser