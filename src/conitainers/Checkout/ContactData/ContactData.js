import React, {Component} from 'react';
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

class ContactData extends Component {
    state= {
        name: '',
        email: '',
        address: {
            street:'',
            postalCode: ''
        },
        loading: false

    }

    OderSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients,this.props.totalprice);

        this.setState({
            loading: true
        });

        console.log(this.state.loading);

        const order ={
            ingredients: {...this.props.ingredients },
            price: this.props.totalprice,
            customer: {
                name: 'jude archie',
                address: {
                    street: 'wayanad',
                    zip: '670645'
                },
             email: 'judearchie@gmailcom' 
             
            }
            
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

   render(){

    if(this.state.loading){
        return <Spinner></Spinner>
    }else{
       return(
           <div className={classes.Contactdata}>
           <h4>Enter Your Contact Data</h4>
           <form>
           <input type='text' placeholder="Your Name" />
           <input type='text' placeholder="Your Email" />
           <input type='text' placeholder="Your Street" />
           <input type="text" placeholder="Your Postal code"/>
           <Button btntyp = "Success" clicked={this.OderSubmitHandler}>Order</Button>
           </form>
           </div>
       )
   } 
}
}

export default withRouter(ContactData);