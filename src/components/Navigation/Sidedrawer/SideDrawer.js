import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) =>{
   let attachclsses =[classes.SideDrawer, classes.Close]
   if(props.open){
       attachclsses = [classes.SideDrawer,classes.Open]
   }
    return(
        <Aux>
        <Backdrop show={props.open} clicked={props.closed}>
        <div className={attachclsses.join(" ")}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <Navigationitems/>
            </nav>
            
        </div>
        </Backdrop>
        </Aux>
    );
}

export default sideDrawer ;