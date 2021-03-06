import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls =(props) => {
 
const transcont= Object.keys(props.incridents).map((el)=>{
   return <BuildControl label={el} key={el+1} 
   addIncridentHandler={()=>props.addIncridentHandler(el)}
   removeIncridentHandler={()=>props.removeIncridentHandler(el)}
    disabledinfo={props.disabled[el]}></BuildControl>
});

return (<div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price}</strong></p>
    {transcont}
    <button className={classes.OrderButton} disabled={!props.orderinfo} onClick={props.oderClicked}>{props.isauth?"ORDER NOW":"SING UP TO CONTINUE"}</button>
    </div>)

}

export default buildControls;