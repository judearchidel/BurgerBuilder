import React , {Component} from 'react';
import CheckoutOrder from '../../components/ChekoutOrder/CheckoutOrder';
import ContactData from './ContactData/ContactData';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
class Checkout extends Component {
/*state = {
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
}*/
componentWillUpdate(){

this.props.onInitPurchase();

}

CheckoutCancelHandler=()=>{
    console.log("cancel");
    this.props.history.goBack();
}

CheckoutContinueHandler=()=>{
    this.props.history.push("/checkout/contactdata");
}


    render(){
        let summary = <Redirect to='/'/>
        
        if (this.props.ing){
            const redierPur = this.props.purchase?<Redirect to='/'/>:null;
            summary= (<div>
                {redierPur}
            <CheckoutOrder ingredients={this.props.ing} 
            CheckoutCancel={this.CheckoutCancelHandler} 
            CheckoutContinue={this.CheckoutContinueHandler}/>
            <Route path={this.props.match.url + '/contactdata'}
            component= {ContactData}/>
            </div>);
        }
        return summary; 
           
}

}

const mapStateToProps = state => {
    return {
        ing: state.bb.ingredients,
        price: state.bb.totalPrice,
        purchase: state.ob.purchased
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onInitPurchase: () => dispatch (action.purachseInit())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Checkout);