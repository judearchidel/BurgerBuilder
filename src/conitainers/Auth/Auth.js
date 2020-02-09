import React, { Component } from 'react';
import Input from '../../components/UI/input/Input';
import Button from  '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state={
        Controls: {
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

    }
}

ckeckValidity= (value, rules)=>{
       
    let isvalid= true;
    
    if(rules.required){
      isvalid = value.trim() != ''; 
    }
   if(rules.minlength){
       isvalid = value.length >=3 && isvalid;
   }
   if(rules.maxlength){
    isvalid = value.length <=6 && isvalid;
}

return isvalid
}
InputChangeHandler =(event, controlName) => {
const updateControls ={
    ...this.state.Controls,
    [controlName]: {
        ...this.state.Controls[controlName],
        value: event.target.value,
        valid: this.ckeckValidity(event.target.value, this.state.Controls[controlName].Validation),
        touched: true
    }
}
this.setState({
    Controls: updateControls
})
}
submitHandler =(event) =>{
    event.preventDefault();
    this.props.onAuth(this.state.Controls.Email.value,
        this.state.Controls.Password.value)
}

    render(){
        let formDetail= [];
        for (let el in this.state.Controls){
            formDetail.push({
                id: el,
                config: this.state.Controls[el]
                    })
            }

            const form = formDetail.map(el=>(<Input key={el.id} 
                label={el.id} 
                inputtype={el.config.elementType} 
                elementConfig={el.config.elementConfig}
                value= {el.config.value}
                invalid={!el.config.valid}
                touched={el.config.touched}
                changed = {(event)=> this.InputChangeHandler(event,el.id)}></Input>));
        return(
            <div className={classes.Auth}>
                    <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btntyp = "Success">SUBMIT</Button>
                    </form>
            </div>
        )
    }

}

const mapDispatchProps = dispatch => {
    return {
        onAuth: (email,Password) => dispatch(actions.auth(email,Password))
    };
};

export default connect(null,mapDispatchProps)(Auth);