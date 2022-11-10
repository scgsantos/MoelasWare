import React, { Component } from 'react';
import Grid from '../components/grid-quizzes';
import "../CSS/index.css";

class radioButtons extends Component {
    state = {
        number: this.props.page,
        unfinishedQuizzes: this.props.unquiz,  
        
    }
    changePage  = () => {
        
        <Grid number = {this.state.unfinishedQuizzes - 24(this.state.number-1)}/>
       
        console.log(this.state.number);
    }

    render() { 
        
        return (
            
            <label class="radio-button">
            <input id = "rbutton" type="radio" name="radio" checked="checked" onChange = {console.log(123)}/>
            </label>  
            
            
        );
    }

    

    
}




        

 
export default radioButtons;
