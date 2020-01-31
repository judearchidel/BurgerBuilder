import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';


const INCRIDENT_PRICES ={
    salad: 0.5,
    cheese: 0.6,
    meat: 0.7,
    bacon: 0.8
}



class BurgerBuilder extends Component {
    state ={
        incridents: null,
        totalPrice: 4,
        purachasable: false,
        showorder: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://burgerbilder-4290c.firebaseio.com/incridents.json')
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
    }

    updateOrderinfo =(incridents)=>{
        const pur = Object.keys(incridents).map(el=> {
                    return incridents[el] }).reduce((sum,i)=> {
                    return sum+i
                    },0)>0;
        this.setState({
            purachasable: pur
        });
        
    }
    addIncridentHandler = (type) =>{
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
    }

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
        for(let i in this.state.incridents){
            querparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.incridents[i]));
        }
        querparams.push("price=" + this.state.totalPrice);
        const queryString = querparams.join('&');
        this.props.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    
    }


    render(){
       
        let disabledInfo = {
            ...this.state.incridents
        }
        for (let ke in disabledInfo){
            disabledInfo[ke]= disabledInfo[ke]<=0;
        }
        
        let orders = <Spinner></Spinner>;
        let summary= <Spinner></Spinner>;
        if(this.state.error){
            summary = <p>incridents cannot be shown</p>
        }
        if(this.state.incridents){
            summary = (
                <Aux>
                <Burger incridents={this.state.incridents}></Burger>
                <BuildControls incridents={this.state.incridents} 
                addIncridentHandler={this.addIncridentHandler} 
                removeIncridentHandler={this.removeIncridentHandler}
                disabled={disabledInfo}
                orderinfo={this.state.purachasable}
                oderClicked= {this.oderClicked}
                price={this.state.totalPrice}></BuildControls>
                </Aux>
            );
        orders = <OderSummary incridents={this.state.incridents} 
        cancelOrder={this.cancelOrder} continueOrder={this.continueOrder}
        price={this.state.totalPrice.toFixed(2)}></OderSummary>
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

export default withErrorHandler(BurgerBuilder, axios);