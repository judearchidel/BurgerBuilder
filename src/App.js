import React ,{Component}from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './conitainers/BurgerBuilder/BurgerBuilder';

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
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      
    </div>
  );
}
}

export default App;
