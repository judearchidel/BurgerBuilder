import React from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';
import { useHttpError} from '../../hooks/http-error';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, errorHandler] = useHttpError(axios);
        /*const [error,setError ]=useState(null);

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
            */
        return(
            <Aux>
                <Modal show={error} orderdisable={errorHandler}>
                    {error?error.message:null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )

}
}

export default withErrorHandler;