import React, { Component } from 'react';
import "../CSS/index.css";

class buttons extends Component {

    state = {
        link : this.props.linkzao
    }
    render() { 
        return (
            <div class = 'unfinishedquiz'>
                <h1 class = "toptitle"> Quiz #<span>{this.props.buttonNumber}</span></h1>
                <a class = "vski" href= "https://pbs.twimg.com/media/DtlG-4oWoAIKdd4.jpg">
                    <button  class = 'button'  >Quiz #<span>{this.props.buttonNumber}</span></button>
                </a>
            </div>
        );
    }
}
 
export default buttons;
