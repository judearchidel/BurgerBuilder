import React,{ useEffect } from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/index';

const Logout =(props) => {
   const {OnLogout} = props;
    useEffect(()=>{
        OnLogout();
    },[OnLogout])
   
        return <Redirect to='/'/>;
}

const mapDispatchToProps = disaptch =>{
    return{
    OnLogout: () => disaptch(actions.LogOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout);