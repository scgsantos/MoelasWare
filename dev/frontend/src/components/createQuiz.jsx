import React, { Component } from 'react';
import "../App.css";

class Quiz extends Component {
    constructor(props){
      super(props);

    }
    render() { 
        return(
          <div className="row">
          <div style={{ flex: 1}}></div>
          <div style={{ flex: 4}}>
            <div className="column">
              <text className='esq'>
                Answer #{this.props.answerText}
              </text>
              <div  ><br/></div>
              <text className='esq'>
                <input class ="input" type="text" name="1" onChange={this.props.changeFunAnswer}></input>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="radio" id="rad" name="choice" value="1" onChange={this.props.changeFunOption}></input>
              </text>
            </div>
          </div>
          <div style={{ flex: 3}}></div>
          <div style={{ flex: 4}}>
            <div className="column">
              <text className='esq'>
                  Explanation #{this.props.explText}
              </text>
              <div  ><br/></div>
              <text className='esq'>
                  <textarea class="input" type="text" name = "7" onChange={this.props.changeFunExpl}></textarea>
              </text>
            </div>
          </div>
        </div>
        );
    }
}

const styles = {
    container: {
      flex: 1,
      padding: 20,
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold"
    },
    geral: {
      fontSize: 20,
    },
    botao: {
      fontSize: 15,
    },
    esq: {
      fontSize: 20,
      textAlign: "left"
    }
  };

export default Quiz;