import React, { Component}from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        

        constructor(){
            super()
           this.state ={
                error: null     
            }
            this.requestInetceptor = axios.interceptors.request.use(req=>{
                this.setState({
                    error: null
                })
                return req;
            });
            this.responseInetceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                });
            });

        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInetceptor);
            axios.interceptors.response.eject(this.responseInetceptor);

        }

        errorHandler = () => {
            this.setState({
                error: null
            })
        }



        render(){
        return(
            <Aux>
                <Modal show={this.state.error} orderdisable={this.errorHandler}>
                    {this.state.error?this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Aux>
        )
    }

}
}

export default withErrorHandler;