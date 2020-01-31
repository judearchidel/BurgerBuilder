import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import {Link} from 'react-router-dom';

const orderSummary = (props)=>{
    
    const order=Object.keys(props.incridents).map(el=>{
        return <li key={el+5}><span>{el}</span>: {props.incridents[el]}</li>
    })
    return (
        <Aux>
        <h1>Order Summary</h1>
        <p>Your burger is ready has the following incriednts:</p>
        <ul>
            {order}
        </ul>
        <p><strong>Total Price: {props.price}</strong></p>
        <p>checkout?</p>
       <Link to="/"><Button btntyp="Danger" clicked={props.cancelOrder}>Cancel</Button></Link> 
       <Button btntyp="Success" clicked={props.continueOrder}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;