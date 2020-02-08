import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as BurgerActions from '../../store/actions/index.js';


class BurgerBuilder extends Component {
    state ={
        showorder: false,
        loading: false,
        error: false
    }

    componentDidMount(){

        this.props.getIngerientsHandler();
     /*  axios.get('https://burgerbilder-4290c.firebaseio.com/incridents.json')
        .then(response=>{
            this.setState({
                incridents: response.data
            });
        })
        .catch(error =>{
            this.setState ({
                error: true
            })
        })
        */
    }

    updateOrderinfo =(incridents)=>{
        const pur = Object.keys(incridents).map(el=> {
                    return incridents[el] }).reduce((sum,i)=> {
                    return sum+i
                    },0)>0;
                    console.log(pur)
        return pur 
    }
   /* addIncridentHandler = (type) =>{
        const oldcount = this.state.incridents[type];
        const price = INCRIDENT_PRICES[type];
        const newcount = oldcount + 1;
        const upadtedIncridents = {
            ...this.state.incridents
        }
        upadtedIncridents[type] = newcount;
        const oldprice = this.state.totalPrice;
        const newPrice = oldprice + price;
        
        this.setState({
            incridents: upadtedIncridents,
            totalPrice: newPrice
        })
        this.updateOrderinfo(upadtedIncridents);
    }

    removeIncridentHandler =(type) =>{
        const oldcount = this.state.incridents[type];
        if(oldcount<=0){
            return;
        }

        const price = INCRIDENT_PRICES[type];
        const newcount = oldcount - 1;
        const upadtedIncridents = {
            ...this.state.incridents
        }
        upadtedIncridents[type] = newcount;
        const oldprice = this.state.totalPrice;
        const newPrice = oldprice - price;
        
        this.setState({
            incridents: upadtedIncridents,
            totalPrice: newPrice
        });
        this.updateOrderinfo(upadtedIncridents);
    }*/

    oderClicked= () =>{
        this.setState({
            showorder: true
        })
    }
    OrderDisable =()=>{
        this.setState({
            showorder: false
        })
    }
    cancelOrder =() =>{
        this.setState({
            showorder: false
        })
    }
    continueOrder =() => {
        
     /*   this.setState({
            loading: true
        });

        console.log(this.state.loading);
        const order ={
            incridents: this.state.incridents,
            price: this.state.totalPrice,
            customer: {
                name: 'jude archie',
                address: {
                    street: 'wayanad',
                    zip: '670645'
                },
             email: 'judearchie@gmailcom'   
            }
        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({
                    loading: false,
                    showorder: false
                })
                console.log(response)
            })
            .catch(error=> {
                this.setState({
                    loading: false,
                    showorder: false
                })
                console.log(error)
                }
                    );*/

        const querparams = [];
       /* for(let i in this.props.ing){
            querparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]));
        }
        querparams.push("price=" + this.props.price);
        const queryString = querparams.join('&');*/
        this.props.history.push({
            pathname: "/checkout",
        });
    
    }


    render(){
        console.log(this.props.price)
        let disabledInfo = {
            ...this.props.ing
        }
        for (let ke in disabledInfo){
            disabledInfo[ke]= disabledInfo[ke]<=0;
        }
        
        let orders = <Spinner></Spinner>;
        let summary= <Spinner></Spinner>;
        if(this.props.error){
            summary = <p>incridents cannot be shown</p>
        }
        if(this.props.ing){
            summary = (
                <Aux>
                <Burger incridents={this.props.ing}></Burger>
                <BuildControls incridents={this.props.ing} 
                addIncridentHandler={this.props.onIngredientsadded} 
                removeIncridentHandler={this.props.onIngredientsremoved}
                disabled={disabledInfo}
                orderinfo={this.updateOrderinfo(this.props.ing)}
                oderClicked= {this.oderClicked}
                price={this.props.price}></BuildControls>
                </Aux>
            );
        orders = <OderSummary incridents={this.props.ing} 
        cancelOrder={this.cancelOrder} continueOrder={this.continueOrder}
        price={this.props.price}></OderSummary>
        }


        if(this.state.loading){
            return (<Spinner></Spinner>);
    
        }
        else{
        return (
           <Aux>
                <Modal show={this.state.showorder} orderdisable={this.OrderDisable}>
                {orders}
                </Modal>
                {summary}
           </Aux>
        );
        }
}

}

const  mapStateToProps = state => {
    return{
        ing: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps= dispatch => {
    return{
        onIngredientsadded: (ingName)=> dispatch(BurgerActions.addIngeridents(ingName)),
        onIngredientsremoved: (ingName)=> dispatch(BurgerActions.removeIngredient(ingName)),
        getIngerientsHandler: () => dispatch (BurgerActions.getIngredients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));