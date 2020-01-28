import React from 'react';
import classes from './BurgerIncredient.module.css'
import PropTypes from 'prop-types';

const burgerIncredient = (props) => {
 
let incredients = null;

 switch(props.type){
    case('bread-bottom'):
        incredients = <div className= {classes.BreadBottom}></div>;
        break;
    case('bread-top'):
        incredients= (
                        <div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>
                    );
        break;
    case('meat'):
        incredients =<div className={classes.Meat}></div>;
        break;
    case('cheese'):
        incredients =<div className ={classes.Cheese}></div>;
        break;
    case('salad'):
        incredients=<div className={classes.Salad}></div>;
        break;
    case('bacon'):
        incredients=<div className={classes.Bacon}></div>;
        break;
    default:
        incredients =null;
    };      
return incredients;
};

burgerIncredient.propTypes ={
    type: PropTypes.string.isRequired
}

export default burgerIncredient;
