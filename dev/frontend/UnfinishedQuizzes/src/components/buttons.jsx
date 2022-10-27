import React, { Component } from 'react';
import "../CSS/index.css";

class Counter extends Component {
    
    render() { 
        return (
            <div class = 'unfinishedquiz'>
                <h1 class = "toptitle">Quiz #<span>{this.props.buttonNumber}</span></h1>
                <button onclick = "location.href = 'https://www.culturagenial.com/monumento-cristo-redentor/'" class = 'button'>Quiz #<span>{this.props.buttonNumber}</span></button>
            </div>
            
        );
    }
}
 
export default Counter;
