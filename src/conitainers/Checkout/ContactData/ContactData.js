import React, {useState} from 'react';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/input/Input';
import {connect} from 'react-redux';
import * as OrderAction from '../../../store/actions/index';
import WithErrorHandler from '../../../hoc/WithErrorHandler/withErrorHandler';

const ContactData =(props)=> {
    
      const initialorderForm = {
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
                value: 'fastest',
                Validation: {},
                valid: true
            }
        }
      const  initialformIsValid= false;
      const initialloading= false ;

      const [orderForm, setorderForm]=useState(initialorderForm);
      const [formIsValid, setformIsValid] = useState(initialformIsValid);
      const [loading, setloading] = useState(initialloading);

    const OderSubmitHandler = (event) => {
        event.preventDefault();
        let orderFormData = {};
        for(let el in orderForm){
            orderFormData[el]=orderForm[el].value;
        }
        const order ={
            ingredients: {...props.ing },
            price: props.price,
            orderForm: orderFormData,
            userId: props.userId

        }

        props.onOrdersubmit(order, props.token);

                                /*    axios.post('/orders.json',order)
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
                                            })*/
    }


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

    const InputChangeHandler = (event, inputId) => {
        const updatedForm = {
           ...orderForm
        }
        const updatedElemnet ={
            ...updatedForm[inputId]
        }
        updatedElemnet.value = event.target.value;
        updatedElemnet.valid = ckeckValidity(updatedElemnet.value,updatedElemnet.Validation)
        updatedElemnet.touched= true;
        
        updatedForm[inputId]=updatedElemnet;
        let  formIsValids= true;
        for (let el in updatedForm){
            formIsValids = updatedForm[el].valid && formIsValids;
        }
        
            setorderForm(updatedForm)
            setformIsValid(formIsValids)
    
        
    }


    let formDetail= [];
    for (let el in orderForm){
        formDetail.push({
            id: el,
            config: orderForm[el]
        })
    }


    if(props.loading){
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
                    changed = {(event)=> InputChangeHandler(event,el.id)}/>
                })

                }
           <Button btntyp = "Success" disabled={!formIsValid} clicked={OderSubmitHandler}>Order</Button>
           </form>
           </div>
       )
   } 
}

const mapStateToProps = state => {
    return {
        ing: state.bb.ingredients,
        price: state.bb.totalPrice,
        loading: state.ob.loading,
        token: state.au.token,
        userId: state.au.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onOrdersubmit: (orderData,token) => dispatch(OrderAction.purchaseStart(orderData,token))
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,axios));