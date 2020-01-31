import React , {Component} from 'react';
import CheckoutOrder from '../../components/ChekoutOrder/CheckoutOrder';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';

class Checkout extends Component {
state = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalprice: 0
}

componentDidMount(){

    if(this.props.location.search){
    const query = new URLSearchParams(this.props.location.search);
    let incridents = [];
    let price = 0;
    for(let i of query.entries()){
        if(i[0] == 'price')
        {
           price = i[1];
        }else{
        incridents[i[0]]= +i[1]
        }
    }

this.setState({
    ingredients: incridents,
    totalprice: price
});

}
}

CheckoutCancelHandler=()=>{
    console.log("cancel");
    this.props.history.goBack();
}

CheckoutContinueHandler=()=>{
    this.props.history.push("/checkout/contactdata");
}


    render(){
        return (
            <div>
            <CheckoutOrder ingredients={this.state.ingredients} 
            CheckoutCancel={this.CheckoutCancelHandler} 
            CheckoutContinue={this.CheckoutContinueHandler}/>
            <Route path={this.props.match.url + '/contactdata'} render= { () =>(
            <ContactData  ingredients= {this.state.ingredients} totalprice={this.state.totalprice}/>
            )
        }
            />
            </div>
        );
}

}

export default Checkout;