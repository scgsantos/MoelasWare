import React, { Component } from 'react';
import "../App.css";

class Quiz extends Component {
    state={};
    render() { 
        return(
              <div class="app">
                <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #<span>{this.props.numberFromParent}</span>
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name={this.props.numberFromParent}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value={this.props.numberFromParent}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #<span>{this.props.numberFromParent}</span>
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <input class ="input" type="text" name={this.props.numberFromParent*2}></input>
                      </text>
                    </div>
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