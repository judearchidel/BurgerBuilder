import React,{useState, useEffect, useCallback} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/withErrorHandler';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as BurgerActions from '../../store/actions/index.js';


const BurgerBuilder =(props)=> {

const [showorder, setshoworder]= useState(false);
const [loading, setloading]= useState(false);

const dispatch = useDispatch();

      const  onIngredientsadded = (ingName)=> dispatch(BurgerActions.addIngeridents(ingName));
      const  onIngredientsremoved = (ingName)=> dispatch(BurgerActions.removeIngredient(ingName));
      const  getIngerientsHandler = useCallback(() => dispatch (BurgerActions.getIngredients()),[dispatch]);
      const  onSetReirectPath = (pa)=>dispatch(BurgerActions.setAutheRedirectPath(pa));


      const ing = useSelector(state=> { return  state.bb.ingredients});
      const price = useSelector(state=>  state.bb.totalPrice);
      const error = useSelector(state=> state.bb.error);
     const  authenticated = useSelector(state=> state.au.token != null);
 
    useEffect(()=>{
        getIngerientsHandler();
    },[getIngerientsHandler])
       
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

    const updateOrderinfo = (incridents)=>{
        const pur = Object.keys(incridents).map(el=> {
                    return incridents[el] }).reduce((sum,i)=> {
                    return sum+i
                    },0)>0;
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

    const oderClicked= () =>{

        if (authenticated){
        setshoworder(true);
    } else{
        onSetReirectPath('/checkout');
        props.history.push("/Auth");
        }
    }


    const OrderDisable =()=>{
       setshoworder(false)
    }
   const  cancelOrder =() =>{
    setshoworder(false)   
    }

    const continueOrder =() => {
        
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

       /*  const querparams = [];
       for(let i in this.props.ing){
            querparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ing[i]));
        }
        querparams.push("price=" + this.props.price);
        const queryString = querparams.join('&');*/
        props.history.push({
            pathname: "/checkout",
        });
    
    }


        let disabledInfo = {
            ...ing
        }
        for (let ke in disabledInfo){
            disabledInfo[ke]= disabledInfo[ke]<=0;
        }
        
        let orders = <Spinner></Spinner>;
        let summary= <Spinner></Spinner>;
        if(error){
            summary = <p>incridents cannot be shown</p>
        }
        if(ing){
            summary = (
                <Aux>
                <Burger incridents={ing}></Burger>
                <BuildControls incridents={ing} 
                addIncridentHandler={onIngredientsadded} 
                removeIncridentHandler={onIngredientsremoved}
                disabled={disabledInfo}
                orderinfo={updateOrderinfo(ing)}
                oderClicked= {oderClicked}
                price={price}
                isauth = {authenticated}></BuildControls>
                </Aux>
            );
        orders = <OderSummary incridents={ing} 
        cancelOrder={cancelOrder} continueOrder={continueOrder}
        price={price}></OderSummary>
        }


        if(loading){
            return (<Spinner></Spinner>);
    
        }
        else{
        return (
           <Aux>
                <Modal show={showorder} orderdisable={OrderDisable}>
                {orders}
                </Modal>
                {summary}
           </Aux>
        );
        }

}





export default withErrorHandler(BurgerBuilder, axios);