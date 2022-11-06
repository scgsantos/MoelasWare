import React from 'react';

import '../../common.css';
// import './CreateTestPanel.css';

class CreateTestPanel extends React.Component {
  render() {
    return (
      <div className='CreateTestPanel-div'>
        <button>
          {this.props.text}
        </button>
        <p>{this.props.description}</p>
      </div>
    );

  }
}

export default CreateTestPanel;
