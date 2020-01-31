import React from 'react';

const order = (props) => {
let order=[];
console.log(props.ingredients);
for(let i in props.ingredients){
order.push({name: i, amount: props.ingredients[i]})
}
 return(
     <div>
     <p>incridents:{ order.map( el =>{
         return  <span key={el.name+1} style={{ margin : '2px, auto',
        textDecoration: 'bold',
        padding: '3px',
        boxSizing:'border-box',
    backgroundColor: "grey",
border: '0.5px solid black'}}><span>{el.name}</span><span>{el.amount}</span></span>
     })
     }</p>
 
         
        <p>total price: {props.price} </p>
     </div>
 )   
}

export default order;