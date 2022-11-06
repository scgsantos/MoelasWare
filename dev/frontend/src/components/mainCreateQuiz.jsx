import React, { Component } from 'react';
import logo from '../images/logo.png';
import Popup from "./popupCreateQuiz";
import '../font/Basic-Regular.ttf';
import "../App.css";
import "../index.css";

class MainCreateQuiz extends Component {
    state={
        trigger : false,
        qName : "",
        category : "",
        a1 : "",
        a2 : "",
        a3 : "",
        a4 : "",
        a5 : "",
        a6 : "",
        e1 : "",
        e2 : "",
        e3 : "",
        e4 : "",
        e5 : "",
        e6 : "",
        option : ""
    };
    togglePopup = () => {
        this.setState(state => ({ trigger:!state.trigger}));
    };
    
    render() { 
        return(
    <div class="App">
      <div className='new-line'><br/></div>
      <div class = "header">
        <div style={{ flex: 1}}></div>
        <div class = "logo" style={{ flex: 2}}>
          <img src={logo} alt="logo" />
        </div>
        
        <div class = "username" style={{ flex: 4}}>
          <text style={styles.geral}>Hi, username</text>
        </div>
        <div>
          <text style = {styles.titleText}>CREATE A QUIZ</text>
        </div>
      </div>

      <div className='new-line'><br/></div>

      <form>
        
      <div className="row">
        <div style={{ flex: 1}}></div>
        <div style={{ flex: 4}}>
          <div className="column">
            <text style={styles.esq}>Question #1</text>
            <div className='new-line'><br/></div>
            <text style={styles.esq}><input class="input" type="text" name="qname" onChange={(e)=>{this.setState(state => ({ qName:e.target.value}))}}></input></text>
          </div>
        </div>
        <div style={{ flex: 3}}></div>
        <div style={{ flex: 4}}>
        <div className='new-line'><br/></div>
          <div className='new-line'><br/></div>
          <div className="column">
            <select class="select" id="categoria" name="categoria" onChange={(e)=>{this.setState(state => ({ category:e.target.value}))}}>
              <option value = "0" disabled="disabled">Selecionar Categoria</option>
              <option value = "1">Ciência</option>
              <option value = "2">Desporto</option>
              <option value = "3">História</option>
              <option value = "4">Geografia</option>
              <option value = "5">Línguas</option>
			      </select>
          </div>
        </div>
      </div>

      <div className='new-line'><br/></div>

      <div className="row">
        <div style={{ flex: 1}}></div>
        <div style={{ flex: 18}}>
          <div className="column">
            <text>(Please select the correct answer)</text>
          </div>
        </div>
        <div style={{ flex: 3}}></div>
        <div style={{ flex: 4}}></div>
      </div>
      
                  <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #1
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name="1" onChange={(e)=>{this.setState(state => ({ a1:e.target.value}))}}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value="1" onChange={(e)=>{this.setState(state => ({ option:e.target.value}))}}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #1
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <textarea class="input" type="text" name = "7" onChange={(e)=>{this.setState(state => ({ e1:e.target.value}))}}></textarea>
                      </text>
                    </div>
                  </div>
                </div>

      <div className='new-line'><br/></div>
      
                  <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #2
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name="2" onChange={(e)=>{this.setState(state => ({ a2:e.target.value}))}}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value="2" onChange={(e)=>{this.setState(state => ({ option:e.target.value}))}}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #2
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <textarea class="input" type="text" name = "8" onChange={(e)=>{this.setState(state => ({ e2:e.target.value}))}}></textarea>
                      </text>
                    </div>
                  </div>
                </div>

      <div className='new-line'><br/></div>
      
                  <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #3
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name="3" onChange={(e)=>{this.setState(state => ({ a3:e.target.value}))}}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value="3" onChange={(e)=>{this.setState(state => ({ option:e.target.value}))}}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #3
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <textarea class="input" type="text" name = "9" onChange={(e)=>{this.setState(state => ({ e3:e.target.value}))}}></textarea>
                      </text>
                    </div>
                  </div>
                </div>

      <div className='new-line'><br/></div>

                  <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #4
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name="4" onChange={(e)=>{this.setState(state => ({ a4:e.target.value}))}}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value="4" onChange={(e)=>{this.setState(state => ({ option:e.target.value}))}}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #4
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <textarea class="input" type="text" name = "10" onChange={(e)=>{this.setState(state => ({ e4:e.target.value}))}}></textarea>
                      </text>
                    </div>
                  </div>
                </div>

      <div className='new-line'><br/></div>

                  <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #5
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name="5" onChange={(e)=>{this.setState(state => ({ a5:e.target.value}))}}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value="5" onChange={(e)=>{this.setState(state => ({ option:e.target.value}))}}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #5
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <textarea class="input" type="text" name = "11" onChange={(e)=>{this.setState(state => ({ e5:e.target.value}))}}></textarea>
                      </text>
                    </div>
                  </div>
                </div>

      <div className='new-line'><br/></div>

                  <div className="row">
                  <div style={{ flex: 1}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                        Answer #6
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                        <input class ="input" type="text" name="6" onChange={(e)=>{this.setState(state => ({ a6:e.target.value}))}}></input>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="rad" name="choice" value="6" onChange={(e)=>{this.setState(state => ({ option:e.target.value}))}}></input>
                      </text>
                    </div>
                  </div>
                  <div style={{ flex: 3}}></div>
                  <div style={{ flex: 4}}>
                    <div className="column">
                      <text style={styles.esq}>
                          Explanation #6
                      </text>
                      <div className='new-line'><br/></div>
                      <text style={styles.esq}>
                          <textarea class="input" type="text" name = "12" onChange={(e)=>{this.setState(state => ({ e6:e.target.value}))}}></textarea>
                      </text>
                    </div>
                  </div>
                </div>

      <br/><br/>
      <button type="button" class="button" onClick={()=>this.setState({trigger:true})}>Create Quiz</button>
      <p>{this.state.e1}</p>
      </form>
    
      <Popup trigger={this.state.trigger}>
        <button type="button" onClick={this.togglePopup}>Close</button>
      </Popup>
      <div className='new-line'><br/></div>
    </div>
            );
    }
}

const styles = {
    titleText: {
      fontSize: 30,
      fontWeight: "bold"
    },
    geral: {
      fontSize: 20,
    },
    esq: {
      fontSize: 20,
      textAlign: "left"
    }
  };

  export default MainCreateQuiz;
