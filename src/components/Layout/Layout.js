import React,{ Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/SideDrawer';

class Layout extends Component {
         
    state ={
        showsideDrawer: false
    }
    
    sideDrawerclose =() =>{
        this.setState({
            showsideDrawer: false
        })
         } 
    showSide = ()=>{
        this.setState({
            showsideDrawer: true
        })
    }
    render( ){
    return  (          
        <Aux>
           <Toolbar sideshow={this.showSide}/> 
              <SideDrawer open={this.state.showsideDrawer}
               closed={this.sideDrawerclose}/>
               <main className={classes.content}>
                {this.props.children}
               </main>
         </Aux>
    );
    }
}

export default Layout;

