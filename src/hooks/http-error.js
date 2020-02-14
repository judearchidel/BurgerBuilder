import {useState,useEffect} from 'react';

export const useHttpError = (axios)=>{
    const [error,setError ]=useState(null);

    const requestInetceptor = axios.interceptors.request.use(req=>{
          setError(null);
            return req;
        });
    const responseInetceptor = axios.interceptors.response.use(res => res, error => {
           setError(error);
        });


    useEffect(()=>{
        return ()=>{
        axios.interceptors.request.eject(requestInetceptor);
        axios.interceptors.response.eject(responseInetceptor);
        }
    },[requestInetceptor,responseInetceptor]);
    
    const errorHandler = () => {
        setError(null);
    }
return [error,errorHandler];

}