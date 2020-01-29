import React from 'react';
import classes from './Toolbar.module.css';
import BurgerLogo from '../../Logo/Logo';
import Navigationitems from '../Navigationitems/Navigationitems';


const toolbar = (props) => {
    return (
    <header className={classes.Toolbar}>
        <div onClick={props.sideshow} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <BurgerLogo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <Navigationitems/>
        </nav>
    
    </header>
    );
}

export default toolbar;