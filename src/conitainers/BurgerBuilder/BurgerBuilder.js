import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INCRIDENT_PRICES ={
    salad: 0.5,
    cheese: 0.6,
    meat: 0.7,
    bacon: 0.8
}



class BurgerBuilder extends Component {
    state ={
        incridents: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purachasable: false,
        showorder: false
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
        alert('You continue!!!!');
    }


    render(){
        let disabledInfo = {
            ...this.state.incridents
        }
        for (let ke in disabledInfo){
            disabledInfo[ke]= disabledInfo[ke]<=0;
        }
        return (
           <Aux>
                <Modal show={this.state.showorder} orderdisable={this.OrderDisable}>
                <OderSummary incridents={this.state.incridents} 
                cancelOrder={this.cancelOrder} continueOrder={this.continueOrder}
                price={this.state.totalPrice.toFixed(2)}></OderSummary>
                </Modal>
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
    }
}

export default BurgerBuilder;