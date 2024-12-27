import axios from 'axios'


export const commonAPI=async(HttpMethod,url,reqHeader,reqBody)=>
{
    const reqConfig={
        method:HttpMethod,
        url,
        data:reqBody,
        headers: reqHeader || { "Content-Type": "application/json" },
    }
    return await axios(reqConfig).then(res=>{return res}).catch(err=>{ return err})


}