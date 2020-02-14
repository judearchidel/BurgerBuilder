import React ,{useEffect , lazy ,Suspense}from 'react';
import {connect} from 'react-redux'
import Layout from './components/Layout/Layout';
import BurgerBuilder from './conitainers/BurgerBuilder/BurgerBuilder';
import { Route, Switch ,Redirect}  from 'react-router-dom';
import Logout from './conitainers/Auth/logout/logout';
import * as actions from './store/actions/index';


const Checkout = lazy(() => {
  return import('./conitainers/Checkout/Checkout');
});
const Orders = lazy(() => {
  return import ('./conitainers/Orders/Orders');
});
const Auth = lazy(()=>{
  return import ('./conitainers/Auth/Auth');
});

const App = props =>  {
  const {onsinginauto}= props;
  useEffect(()=>{
    onsinginauto();
  },[onsinginauto])
  
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

    let routes = (
      <Switch>
            <Route path="/" exact component={BurgerBuilder}/>
            <Route path="/Auth" render={(props)=>(<Auth {...props}/>)}/>
            <Redirect to='/'/>
      </Switch>
    );
      if(props.isauthenticated){
        routes = (
          <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/Auth" render={(props)=>(<Auth {...props}/>)} />
          <Route path="/checkout" render={(props)=>(<Checkout {...props}/>)}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/orders" render={(props)=>(<Orders {...props}/>)}/>
        </Switch>
        )
      }


  return (
    
    <div>
        <Layout>
          <Suspense fallback={<p>Loading ....</p>}>{routes}</Suspense>
         </Layout>
    </div>
   
  )
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
