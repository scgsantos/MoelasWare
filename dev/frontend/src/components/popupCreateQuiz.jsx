import React, { Component } from 'react';
import '../font/Basic-Regular.ttf';
import "../App.css";
import "../index.css";

class Popup extends Component {
    constructor(props){
        super(props);
  
      }
    render() { 
        /*<text>This is the popup where the information about the acceptance of the quiz will show up.</text> */
        return(this.props.trigger)?(
            <div class="popup">
                <div class="popup-inner">
                    <text>{this.props.msg}</text>
                    <div className='new-line'><br/></div>
                    <div className='new-line'><br/></div>
                    {this.props.children}
                </div>
            </div>
        ):"";
    }
}

  export default Popup;