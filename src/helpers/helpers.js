
export  const verificateAuth=()=>{
    const data=localStorage.getItem("token");
    return data !=null || data !=undefined; 
}

export const headersWithAccessToken=(headers,accessToken)=>{
    headers["access-token"]=`bearer ${accessToken}`;
    return headers;
}