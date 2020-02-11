import React ,{Component}from 'react';
import {connect} from 'react-redux'
import Layout from './components/Layout/Layout';
import asyncComponent from './hoc/asyncComponent/ayncComponent';
import BurgerBuilder from './conitainers/BurgerBuilder/BurgerBuilder';
import { Route, Switch ,Redirect}  from 'react-router-dom';
import Logout from './conitainers/Auth/logout/logout';
import * as actions from './store/actions/index';


const AsyncCheckout = asyncComponent(() => {
  return import('./conitainers/Checkout/Checkout');
});
const AsyncOrders = asyncComponent(() => {
  return import ('./conitainers/Orders/Orders');
});
const AsyncAuth = asyncComponent(()=>{
  return import ('./conitainers/Auth/Auth');
});

class App extends Component  {
  componentDidMount(){
    this.props.onsinginauto();
  }
  /*state={
      show: true
  }
  componentDidMount(){
    setTimeout(()=>{
      this.setState({
        show:false
      })
    },5000)
  }*/
  render(){

    let routes = (
      <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/Auth" component={AsyncAuth}/>
            <Redirect to='/'/>
      </Switch>
    );
      if(this.props.isauthenticated){
        routes = (
          <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/Auth" component={AsyncAuth}/>
          <Route path="/checkout" component={AsyncCheckout}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={AsyncOrders}/>
        </Switch>
        )
      }


  return (
    
    <div>
        <Layout>
          {routes}
         </Layout>
    </div>
   
  );
}
}

const mapStateToProps = state => {
  return {
    isauthenticated: state.au.token !=null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onsinginauto: () => dispatch (actions.authCheck())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
