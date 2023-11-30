import { headers } from "../constanst/constants";
import { headersWithAccessToken } from "../helpers/helpers";

const URL_BASE=process.env.REACT_APP_URL_BASE;

export const updateAccontUser=async (id,accessToken,body)=>{
    const response=await fetch(URL_BASE+"/user/"+id,{
        method:"PUT",
        headers:headersWithAccessToken(headers,accessToken),
        body:JSON.stringify(body)
    });
    return response.json();
}

export const login=async (body)=>{
    const response=await fetch(URL_BASE+"/user/login",{
        method:"POST",
        headers,
        body:JSON.stringify(body)
    });
    return response.json();
}

export const getNewTokenUser=async (token)=>{
    headers["access-token"]=`bearer ${token}`;
    const response=await fetch(URL_BASE+"/user/refress-token",{
        method:"GET",
        headers,
    });
    return response.json(); 
}

export const createAccontUser=async (body)=>{
    const response=await fetch(URL_BASE+"/user",{
        method:"POST",
        headers,
        body:JSON.stringify(body)
    });
    return response.json();
}