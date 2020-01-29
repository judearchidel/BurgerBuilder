import React from 'react';
import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const navigationitems = () => (
    <ul className={classes.Navigationitems}>
    <Navigationitem link="/" active> BurgerBuilder</Navigationitem>
    <Navigationitem link="/" >Checkout</Navigationitem>
    </ul>
);

export default navigationitems;