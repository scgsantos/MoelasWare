import React from "react";
import '../common.css';
import './CreateTest.css'


class CreateTest extends React.Component {
    render() {
        return (
            <div className='CreateTest-header'>
              <h1 className='title'>CREATE A TEST</h1>
            <div className='CreateTest-header'>
              <h1 className='subtitle'>RANDOM TEST WITH SPECIFICATIONS</h1>
            </div>
            <section>
              <div className='choose-panel'>
                <p className='choose-title'>CHOOSE THE NUMBER OF QUIZZES YOU WANT IN YOUR TEST</p>
                <select className="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
              </div>
              <div className='specify-panel'>
                <p className='specify-title'>SPECIFY THE TAGS YOU MUST HAVE IN THE QUIZZES</p>
                <input type='text' className="write"></input>
              </div>
              <div className="create-button">
                <button>CREATE</button>
              </div>
            </section>   
          </div>
        );
    }
}

export default CreateTest;