import './common.css';
import React, {Component} from 'react';
import history from './history';
import Req_4_1_1 from './pages/Req_4_1_1';
import Req_4_1_2 from './pages/Req_4_1_2';
import Req_4_2_1 from './pages/Req_4_2_1';
import Req_4_2_2 from './pages/Req_4_2_2';
import Req_4_2_3 from './pages/Req_4_2_3';
import Req_4_3 from './pages/Req_4_3';

export default class App extends Component {
  render() {

    return (
      <div className="App">
        <h1> Home Page </h1>

        <form>
            <button  onClick={() => history.push('/RandomTest')}>Random Test</button>
          </form>
      </div>
    );
  }
}

