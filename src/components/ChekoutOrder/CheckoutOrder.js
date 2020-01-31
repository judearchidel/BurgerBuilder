import React from 'react';
import Burger from  '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutOrder.module.css';

const checkoutOrder = (props) => {

return (
    <div className={classes.Ckeckout}> 
        <h1> Heres your yummy burger!!!!!</h1>
        <div style={{width:'300px',margin: 'auto'}}>
        <Burger incridents={props.ingredients}/>
        </div>
        <div>
        <Button btntyp="Danger" clicked={props.CheckoutCancel}>Cancel</Button>
        <Button btntyp="Success" clicked={props.CheckoutContinue}>Continue</Button>
        </div>
    </div>
);


}
export default checkoutOrder;