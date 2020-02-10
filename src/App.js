import React ,{Component}from 'react';
import {connect} from 'react-redux'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './conitainers/BurgerBuilder/BurgerBuilder';
import CheckOut from './conitainers/Checkout/Checkout';
import Orders from './conitainers/Orders/Orders';
import { Route, Switch ,Redirect}  from 'react-router-dom';
import Auth from './conitainers/Auth/Auth';
import Logout from './conitainers/Auth/logout/logout';
import * as actions from './store/actions/index';

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
            <Route path="/Auth" component={Auth}/>
            <Redirect to='/'/>
      </Switch>
    );
      if(this.props.isauthenticated){
        routes = (
          <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/Auth" component={Auth}/>
          <Route path="/checkout" component={CheckOut}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" component={Orders}/>
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
