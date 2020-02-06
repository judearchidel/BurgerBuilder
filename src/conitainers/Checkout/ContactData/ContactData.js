import React, {Component} from 'react';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/Input';
import {withRouter} from 'react-router-dom';

class ContactData extends Component {
    state= {
        orderForm: {
            Name: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value:'',
                Validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Street: {
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value:'',
                Validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Zipcode:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value:'',
                Validation: {
                    required: true,
                    minlength: 3,
                    maxlength: 6
                },
                valid: false,
                touched: false
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                Validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            Email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                Validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            DeliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                Validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false
        }





    OderSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients,this.props.totalprice);
        this.setState({
            loading: true
        });

        console.log(this.state.loading);
        let orderFormData = {};
        for(let el in this.state.orderForm){
            orderFormData[el]= this.state.orderForm[el].value;
        }


        const order ={
            ingredients: {...this.props.ingredients },
            price: this.props.totalprice,
            orderForm: orderFormData

        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({
                    loading: false,
                })
                this.props.history.push('/');
                console.log(response);
            })
            .catch(error=> {
                this.setState({
                    loading: false,
                })
                console.log(error)
                })
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

    InputChangeHandler = (event, inputId) => {
        const updatedForm = {
           ...this.state.orderForm
        }
        const updatedElemnet ={
            ...updatedForm[inputId]
        }
        updatedElemnet.value = event.target.value;
        updatedElemnet.valid = this.ckeckValidity(updatedElemnet.value,updatedElemnet.Validation)
        updatedElemnet.touched= true;
        
        updatedForm[inputId]=updatedElemnet;
        let  formIsValid= true;
        for (let el in updatedForm){
            console.log(updatedForm[el].valid);
            formIsValid = updatedForm[el].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState ({
            orderForm: updatedForm,
            formIsValid: formIsValid
        })
        
    }



   render(){
    let formDetail= [];
    for (let el in this.state.orderForm){
        formDetail.push({
            id: el,
            config: this.state.orderForm[el]
        })
    }


    if(this.state.loading){
        return <Spinner></Spinner>
    }else{
       return(
           <div className={classes.Contactdata}>
           <h4>Enter Your Contact Data</h4>
           <form>
                {formDetail.map(el => {
                    return <Input key={el.id} label={el.id} 
                    inputtype={el.config.elementType} 
                    elementConfig={el.config.elementConfig}
                    value= {el.config.value}
                    invalid={!el.config.valid}
                    touched={el.config.touched}
                    changed = {(event)=> this.InputChangeHandler(event,el.id)}/>
                })

                }
           <Button btntyp = "Success" disabled={!this.state.formIsValid} clicked={this.OderSubmitHandler}>Order</Button>
           </form>
           </div>
       )
   } 
}
}

export default withRouter(ContactData);