import { headers } from "../constanst/constants";
import { headersWithAccessToken } from "../helpers/helpers";
const URL_BASE=process.env.REACT_APP_URL_BASE;

export const createNewBoard=async (accessToken,body)=>{
    const response=await fetch(URL_BASE+"/board",{
        method:"POST",
        headers:{...headersWithAccessToken(headers,accessToken)},
        body:JSON.stringify(body)
    });
    return await response.json();
}