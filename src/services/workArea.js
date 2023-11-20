import { headers } from "../constanst/constants";
import { headersWithAccessToken } from "../helpers/helpers";
const URL_BASE=process.env.REACT_APP_URL_BASE;

export const getAllWorkAreasByIdUser=async (accessToken,idUser)=>{
    const response=await fetch(URL_BASE+"/workArea/"+idUser,{
        method:"GET",
        headers:{...headersWithAccessToken(headers,accessToken)}
    });
    return await response.json();
}

export const getWorkArea=async (accessToken,id,idUser)=>{
    const response=await fetch(URL_BASE+"/workArea/"+`${id}/${idUser}`,{
        method:"GET",
        headers:{...headersWithAccessToken(headers,accessToken)},
    });
    return await response.json();
}

export const editWorkArea=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/workArea/"+body._id,{
        method:"PUT",
        headers:{...headersWithAccessToken(headers,accessToken)},
        body:JSON.stringify(body)
    });
    return await response.json();
}

export const createNewWorkArea=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/workArea/",{
        method:"POST",
        headers:{...headersWithAccessToken(headers,accessToken)},
        body:JSON.stringify(body)
    });
    return await response.json();
}

export const deleteOneWorkArea=async (accessToken,id)=>{
    const response=await fetch(URL_BASE+"/workArea/"+id,{
        method:"DELETE",
        headers:{...headersWithAccessToken(headers,accessToken)}
    });
    return await response.json();
}


