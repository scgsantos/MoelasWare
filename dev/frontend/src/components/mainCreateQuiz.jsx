import React, { Component } from 'react';
import logo from '../images/logo.png';
import Popup from "./popupCreateQuiz";
import Quiz from "./createQuiz";
import '../font/Basic-Regular.ttf';
import "../App.css";
import "../index.css";

class MainCreateQuiz extends Component {
    state={
        trigger : false,
        msg : "",
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

    create = () => {
      fetch('http://localhost:8000/api/quizzes/',{
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
        body: JSON.stringify({
          
          qName : this.state.qName,
          category : this.state.category,
          a1 : this.state.a1,
          a2 : this.state.a2,
          a3 : this.state.a3,
          a4 : this.state.a4,
          a5 : this.state.a5,
          a6 : this.state.a6,
          e1 : this.state.e1,
          e2 : this.state.e2,
          e3 : this.state.e3,
          e4 : this.state.e4,
          e5 : this.state.e5,
          e6 : this.state.e6,
          option : this.state.option})

      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        this.setState(state => ({ msg:data}));
        this.setState({trigger:true})
      })
    };
    
    
    render() { 
        return(
    <div class="App">
      <br/>
      <div class = "header">
        <div style={{ flex: 1}}></div>
        <div class = "logo" style={{ flex: 2}}>
          <img src={logo} alt="logo" />
        </div>
        <div class = "username" style={{ flex: 4}}>
          <text className='geral'>Hi, username</text>
        </div>
        <div>
          <text className='titleText'>CREATE A QUIZ</text>
        </div>
      </div>
      <br/>

      <form>
      <div className="row">
        <div style={{ flex: 1}}></div>
        <div style={{ flex: 4}}>
          <div className="column">
            <text className='esq'>Question #1</text>
            <div  ><br/></div>
            <text className='esq'><input class="input" type="text" name="qname" onChange={(e)=>{this.setState(state => ({ qName:e.target.value}))}}></input></text>
          </div>
        </div>
        <div style={{ flex: 3}}></div>
        <div style={{ flex: 4}}>
          <div className="column">
            <text className='esq'>Quiz Tag <text className='warning'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Ctrl/Cmd escolher mais que uma tag)</text></text>
            <div><br/></div>
            <select class="select" id="categoria" name="categoria" onChange={(e)=>{this.setState(state => ({ category:e.target.value/2}))}} size="1" multiple>
              <option value = "2">PM</option>
              <option value = "3" disabled="disabled"></option>
              <option value = "4">REQ</option>
              <option value = "5" disabled="disabled"></option>
              <option value = "6">A&D</option>
              <option value = "7" disabled="disabled"></option>
              <option value = "8">IMP</option>
              <option value = "9" disabled="disabled"></option>
              <option value = "10">TST</option>
              <option value = "11" disabled="disabled"></option>
              <option value = "12">V&V</option>
              <option value = "13" disabled="disabled"></option>
              <option value = "14">DEP</option>
              <option value = "15" disabled="disabled"></option>
              <option value = "16">CI</option>
              <option value = "17" disabled="disabled"></option>
              <option value = "18">PRC</option>
              <option value = "19" disabled="disabled"></option>
              <option value = "20">PPL</option>
              <option value = "21" disabled="disabled"></option>
              <option value = "22">CCM</option>
              <option value = "23" disabled="disabled"></option>
              <option value = "24">RSK</option>
			      </select>
          </div>
        </div>
      </div>
      <br/>

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
      <Quiz answerText="#" explText="#" changeFunAnswer={(e)=>{this.setState(state => ({ a1:e.target.value}))}} changeFunOption={(e)=>{this.setState(state => ({ option:e.target.value}))}} changeFunExpl={(e)=>{this.setState(state => ({ e1:e.target.value}))}}/><br/>
      <Quiz answerText="#" explText="#" changeFunAnswer={(e)=>{this.setState(state => ({ a2:e.target.value}))}} changeFunOption={(e)=>{this.setState(state => ({ option:e.target.value}))}} changeFunExpl={(e)=>{this.setState(state => ({ e2:e.target.value}))}}/><br/>
      <Quiz answerText="#" explText="#" changeFunAnswer={(e)=>{this.setState(state => ({ a3:e.target.value}))}} changeFunOption={(e)=>{this.setState(state => ({ option:e.target.value}))}} changeFunExpl={(e)=>{this.setState(state => ({ e3:e.target.value}))}}/><br/>
      <Quiz answerText="#" explText="#" changeFunAnswer={(e)=>{this.setState(state => ({ a4:e.target.value}))}} changeFunOption={(e)=>{this.setState(state => ({ option:e.target.value}))}} changeFunExpl={(e)=>{this.setState(state => ({ e4:e.target.value}))}}/><br/>
      <Quiz answerText="#" explText="#" changeFunAnswer={(e)=>{this.setState(state => ({ a5:e.target.value}))}} changeFunOption={(e)=>{this.setState(state => ({ option:e.target.value}))}} changeFunExpl={(e)=>{this.setState(state => ({ e5:e.target.value}))}}/><br/>
      <Quiz answerText="#" explText="#" changeFunAnswer={(e)=>{this.setState(state => ({ a6:e.target.value}))}} changeFunOption={(e)=>{this.setState(state => ({ option:e.target.value}))}} changeFunExpl={(e)=>{this.setState(state => ({ e6:e.target.value}))}}/><br/>
      <button type="button" class="button" onClick={()=>this.create()}>Create Quiz</button>
      </form>

      <Popup trigger={this.state.trigger} msg={this.state.msg}>
        <button type="button" onClick={this.togglePopup}>Close</button>
      </Popup>
      <br/>
    </div>
            );
    }
}


  export default MainCreateQuiz;
