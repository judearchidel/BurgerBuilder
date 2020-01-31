import React from 'react';
import classes from './Navigationitem.module.css';
import { NavLink } from 'react-router-dom';

const navigationitem = (props) => (
    <li className={classes.Navigationitem}>
    <NavLink to={props.link} exact
   activeClassName={classes.active}>{props.children}</NavLink>
    </li>
)

export default navigationitem;