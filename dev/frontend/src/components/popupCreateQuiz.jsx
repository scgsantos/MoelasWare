import React, { Component } from 'react';
import '../font/Basic-Regular.ttf';
import "../App.css";
import "../index.css";

class Popup extends Component {
    
    render() { 
        /*<text>This is the popup where the information about the acceptance of the quiz will show up.</text> */
        return(this.props.trigger)?(
            <div class="popup">
                <div class="popup-inner">
                    <text>The quiz was submitted for review.</text>
                    <div className='new-line'><br/></div>
                    <div className='new-line'><br/></div>
                    {this.props.children}
                </div>
            </div>
        ):"";
    }
}

  export default Popup;