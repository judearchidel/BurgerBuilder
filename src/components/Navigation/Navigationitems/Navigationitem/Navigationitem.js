import React from 'react';
import classes from './Navigationitem.module.css';
import { checkPropTypes } from 'prop-types';

const navigationitem = (props) => (
    <li className={classes.Navigationitem}>
    <a href={props.link}
    className={props.active? classes.active: null}>{props.children}</a>
    </li>
)

export default navigationitem;