import React from 'react';
import Aux from '../../../hoc/Aux';

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
        <p>checkout?</p>
        </Aux>
    )
}

export default orderSummary;