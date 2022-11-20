import React, { Component } from 'react';
import "../unfinishedquiz.css";

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
                <a href= {this.props.link}>{this.props.name}</a>
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