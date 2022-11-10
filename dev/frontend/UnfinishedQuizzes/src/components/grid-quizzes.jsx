import React, { Component } from 'react';
import "../CSS/index.css";
import Button from '../components/buttons';

class gridQuizzes extends Component {
    state = {
        unfinishedQuizzes: this.props.number
    }
    
    render() { 
        
        return (
            
            <div class = 'grid'>
                {Array.from(Array(this.state.unfinishedQuizzes).keys()).map((i) => {return <Button buttonNumber = {i+1}/>})}
            </div>
            
        );
    }
}
 
export default gridQuizzes;