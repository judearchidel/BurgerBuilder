import React from 'react';
import classes from './Input.module.css';

const input = (props) => {

let inputElement = null;
let validation= null;
let inputClass = [classes.Input];
if(props.invalid && props.touched){
    inputClass.push(classes.Invalid);
    validation= <p>!!Enter a valid value!!</p>
}

 switch(props.inputtype)
 {
     case("input"): 
     inputElement = <input {...props.elementConfig} value={props.value} onChange={props.changed}></input>
     break;
     case("textarea"):
     inputElement = <textarea {...props.elementConfig} value={props.value} onChange={props.changed}></textarea>
     break;
     case("select"):
     inputElement = <select value={props.value} onChange={props.changed}>
     { props.elementConfig.options.map(option => {
        return <option key={option.value} value={option.value}>{option.displayValue}</option>
     })
     }
     </select>
    break;
    default:
    inputElement = <input placeholder="place" onChange={props.changed}></input>
    }


return(
    <div className={inputClass.join(" ")}>
    <label>{props.label}</label>
    {inputElement} 
    {validation}
    </div>
)

}

export default input;