import { useEffect } from 'react';
import './App.css';
import Routers from './routers/Routers';
import { getNewTokenUser } from './services/user';
import { useDispatch } from 'react-redux'
import { setUser } from "./feacture/user/userSlice";
import { useState } from 'react';
import Loader from './components/loader/Loader';


function App() {
  const dispatch=useDispatch();
  const [isLoader,setIsLoader]=useState(false);

  const getNewAccessTokenUser=async ()=>{
    setIsLoader(true);
    try {
      const dataUser=JSON.parse(localStorage.getItem("data"));
      if(dataUser){
        const responseNewToken=await getNewTokenUser(dataUser.refressToken);
        if(responseNewToken.status===200 && responseNewToken.response){
          const data=responseNewToken.data;
          const dataUser={
            refressToken: data.refressToken,
            user:data.user
          }
          localStorage.setItem("data",JSON.stringify(dataUser));
          dispatch(setUser(data));
        }
      }
    } catch (error) {
        console.log(error);
    }
    setIsLoader(false);
  }

  useEffect(()=>{
    getNewAccessTokenUser();
  },[]);
  return isLoader ===true ?<Loader/> : <Routers/>
}

export default App;
