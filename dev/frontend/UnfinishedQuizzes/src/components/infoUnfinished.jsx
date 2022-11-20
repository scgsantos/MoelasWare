import React, { Component } from 'react';
import "../common.css";

class InfoUnfinished extends Component {
    constructor(props){
      super(props);

    }
    render() { 
        return(
          <div className="row">
          <div style={{ flex: 1}}></div>
          <div style={{ flex: 1}}>
            <div className="column">
              <text className='esq'>
                {this.props.name}
              </text>
            </div>
          </div>
          <div style={{ flex: 17}}></div>
          <div style={{ flex: 1}}>
            <div className="column">
              <text className='right'>
                  {this.props.time}
              </text>
            </div>
          </div>
          <div style={{ flex: 1}}></div>
        </div>
        );
    }
}

export default InfoUnfinished;