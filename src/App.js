import React ,{Component}from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './conitainers/BurgerBuilder/BurgerBuilder';
import CheckOut from './conitainers/Checkout/Checkout';
import Orders from './conitainers/Orders/Orders';
import { Route, Switch }  from 'react-router-dom';
import Auth from './conitainers/Auth/Auth';
class App extends Component  {
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
  return (
    
    <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/checkout" component={CheckOut}/>
            <Route path="/Auth" component={Auth}/>
            <Route path="/orders" component={Orders}/>
          </Switch>
         </Layout>
    </div>
   
  );
}
}

export default App;
