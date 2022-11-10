import React from 'react';

import 'common.css';

class CreateTestPanel extends React.Component {
  render() {
    return (
      <div className='CreateTestPanel-div' onClick={this.props.onClick}>
        <button>
          {this.props.text}
        </button>
        <p>{this.props.description}</p>
      </div>
    );

  }
}

export default CreateTestPanel;
