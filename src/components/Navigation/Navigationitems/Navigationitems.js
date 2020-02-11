import React from 'react';
import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const navigationitems = (props) => {
    return(
    <ul className={classes.Navigationitems}>
    <Navigationitem link="/"> BurgerBuilder</Navigationitem>
    {props.athenticated ?
        <Navigationitem link="/orders" >My Orders</Navigationitem>
        : null
    }
        {props.athenticated 
        ?<Navigationitem link="/logout" >LogOut</Navigationitem>
        :<Navigationitem link="/Auth" >Authenticate</Navigationitem>
        
    }
    </ul>
);
}
export default navigationitems;