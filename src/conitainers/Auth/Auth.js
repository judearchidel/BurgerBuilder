import React, {useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/input/Input';
import Button from  '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const Auth =(props)=> {
   
       const initalControls = {
            Email: {
                elementType: 'input',
                elementConfig:{
                    type: 'Email',
                    placeholder: 'Your Name'
                },
                value:'',
                Validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Password:{
                elementType: 'input',
                elementConfig:{
                    type: 'Password',
                    placeholder: 'Password'
                },
                value:'',
                Validation: {
                    required: true,
                    minlength: 3,
                    maxlength: 6
                },
                valid: false,
                touched: false
            }

    };
const [Controls,setControls]= useState(initalControls);
const [isSingUP,setisSingUP]= useState(true);
const {burgerbuilding,redirectpath,onSetRedirect}= props;
useEffect(()=>{
    if(!burgerbuilding && redirectpath !== '/'){
        onSetRedirect();
    } 
},[burgerbuilding,redirectpath,onSetRedirect])
    

const ckeckValidity= (value, rules)=>{
       
    let isvalid= true;
    
    if(rules.required){
      isvalid = value.trim() !== ''; 
    }
   if(rules.minlength){
       isvalid = value.length >=3 && isvalid;
   }
   if(rules.maxlength){
    isvalid = value.length <=6 && isvalid;
}

return isvalid
}

const InputChangeHandler =(event, controlName) => {
const updateControls ={
    ...Controls,
    [controlName]: {
        ...Controls[controlName],
        value: event.target.value,
        valid: ckeckValidity(event.target.value, Controls[controlName].Validation),
        touched: true
    }
}
setControls(updateControls)
}

const submitHandler =(event) =>{
    event.preventDefault();
    props.onAuth(Controls.Email.value,
        Controls.Password.value,isSingUP)
}

const SwitchSinginHandler =()=> {
    setisSingUP(!isSingUP)
}


        let formDetail= [];
        for (let el in Controls){
            formDetail.push({
                id: el,
                config: Controls[el]
                    })
            }

            let form = formDetail.map(el=>(<Input key={el.id} 
                label={el.id} 
                inputtype={el.config.elementType} 
                elementConfig={el.config.elementConfig}
                value= {el.config.value}
                invalid={!el.config.valid}
                touched={el.config.touched}
                changed = {(event)=> InputChangeHandler(event,el.id)}></Input>));

             
                if(props.loading){
                    form= <Spinner></Spinner>
                }
                let errorMessage=null;
                if(props.error){
                    errorMessage=<p>{props.error}</p>
                }

               let authedisp= null;
               if (props.authenticated){
                   authedisp = <Redirect to={props.redirectpath}/>
               } 
              

        return(
            <div className={classes.Auth}>
            {authedisp}
            {errorMessage}
            <form onSubmit={submitHandler}>
            {form}
            <Button btntyp = "Success">SUBMIT</Button>
            </form>
            <Button clicked={SwitchSinginHandler} btntyp = "Danger">SWITCH TO {isSingUP?"SINGIN":"SINGUP"}</Button>
    </div>
        )
}

const mapStateToProps = state =>{
  return{
        loading: state.au.loading,
        error: state.au.error,
        authenticated: state.au.token != null,
        burgerbuilding: state.bb.building,
        redirectpath: state.au.authRedirect,
  }
    }

const mapDispatchProps = dispatch => {
    return {
        onAuth: (email,Password,isSingUP) => dispatch(actions.auth(email,Password,isSingUP)),
        onSetRedirect: () => dispatch(actions.setAutheRedirectPath('/'))
    };
};

export default connect(mapStateToProps,mapDispatchProps)(Auth);