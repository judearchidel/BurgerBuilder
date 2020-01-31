import React from 'react';
import classes from './Navigationitems.module.css';
import Navigationitem from './Navigationitem/Navigationitem';

const navigationitems = () => (
    <ul className={classes.Navigationitems}>
    <Navigationitem link="/"> BurgerBuilder</Navigationitem>
    <Navigationitem link="/orders" >My Orders</Navigationitem>
    </ul>
);

export default navigationitems;