import React ,{ Component } from 'react';
import axios from '../../axios-order';
import Order from '../../components/Order/Oder';
import * as action from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';

class Orders extends Component {

    /*state={
    loaded: false,
    data: []
}*/


componentDidMount (){
    this.props.getOders(this.props.token,this.props.userId);
}
/*axios.get('/orders.json')
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
*/
  




render() {
    let orderrender= <Spinner></Spinner>
    if(!this.props.loaded){
    orderrender= this.props.data.map(el=>{
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

const mapStateToProps = state =>{
  return { 
     loaded: state.ob.orderLoad,
     data: state.ob.orders,
     token: state.au.token,
     userId: state.au.userId
}
}
const mapDispatchtoProps = dispatch => {
    return {
        getOders: (token,userId) => dispatch(action.orderStart(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchtoProps)(withErrorHandler(Orders,axios));