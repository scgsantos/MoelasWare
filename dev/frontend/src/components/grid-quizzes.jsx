import React, { Component } from 'react';
import "../CSS/index.css";
import Button from '../components/buttons';

class gridQuizzes extends Component {
    constructor(props){
        super(props);
  
      }
    render() { 
        
        return (
            //make a button with a connection link
            <div class = 'grid'>
                {Array.from(Array(this.props.numberOfunfinishedquizzes).keys()).map((i) => {return <Button buttonNumber = {i+1}/>})}
            </div>
            
        );
    }
}
 
export default gridQuizzes;