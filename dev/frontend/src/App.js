import './common.css';
import React, {Component} from 'react';
import history from './history';

export default class App extends Component {
  render() {

    return (
      <div className="App">
        <h1> Home Page </h1>

        <form>
            <button onClick={() => history.push('/SelectTest')}>Select Test</button>
          </form>
      </div>
    );
  }
}

