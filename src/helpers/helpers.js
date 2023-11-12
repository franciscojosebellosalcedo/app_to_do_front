export  const verificateAuth=()=>{
    const data=localStorage.getItem("token");
    return data !=null || data !=undefined; 
}