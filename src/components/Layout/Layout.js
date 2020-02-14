import React,{useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

 const Layout = (props) =>{
      
    const [showsideDrawer,setshowsideDrawer]=useState(false);
    
    const sideDrawerclose =() =>{
       setshowsideDrawer(false)
         } 
    const showSide = ()=>{
        setshowsideDrawer(true)
    }
    return  (          
        <Aux>
           <Toolbar sideshow={showSide} athenticated ={props.athenticated}/> 
              <SideDrawer open={showsideDrawer}
               closed={sideDrawerclose}
               athenticated ={props.athenticated}/>
               <main className={classes.content}>
                {props.children}
               </main>
         </Aux>
    );
}
const mapSateToProps = state =>{
    return {
        athenticated: state.au.token != null
    }
}

export default connect(mapSateToProps)(Layout);

