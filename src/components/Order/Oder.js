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
         return  <span key={el.name+1} style={{
            color: 'black',
            padding: '5px',
            boxShadow: '2px 5px #edebf0',
            backgroundColor: '#f7f5fa',
            marginLeft:'20px',
            textDecoration: 'bold',
    }}><span>{el.name}</span><span> ({el.amount})</span></span>
     })
     }</p>
 
         
        <p>total price: {props.price} </p>
     </div>
 )   
}

export default order;