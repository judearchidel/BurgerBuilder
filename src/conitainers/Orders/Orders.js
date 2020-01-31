import React ,{ Component } from 'react';
import axios from '../../axios-order';
import Order from '../../components/Order/Oder';

class Orders extends Component {
state={
    loaded: false,
    data: []
}

componentDidMount() {
let fetchData= [];
axios.get('/orders.json')
    .then(response=>{
        for(let i in response.data){
            fetchData.push({...response.data[i],i})
        }
        this.setState({
            loaded: true,
            data: fetchData
        })
    })
    .catch(res=>{
        console.log("Error")
    })
    
  
}

render() {
   
    let orderrender= null;
    if(this.state.loaded){
    orderrender= this.state.data.map(el=>{
        return <Order key={el.i}
            ingredients={el.ingredients}
            price={+el.price}/>
    });
    }
    return(
        <div>
           {orderrender}
        </div>
    );
}
}
export default Orders