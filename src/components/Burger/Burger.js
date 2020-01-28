import React from 'react';
import classes from './Burger.module.css';
import BurgerIncredient from './BurgerIncredients/BurgerIncredient';

const burger = (props) => {
    let transIncridents = Object.keys(props.incridents).map((ickey)=> {
                            return [...Array(props.incridents[ickey])].map((_,i)=>{
                                return <BurgerIncredient key={ickey+i} type={ickey}/>
                                });
                            }).reduce((arr,el)=> {
                                return arr.concat(el);
                            })
    if(transIncridents.length === 0){
        transIncridents = <p>start adding</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIncredient type="bread-top"/>
            {transIncridents}
            <BurgerIncredient type="bread-bottom"/>
        </div>
    );
};

export default burger;