import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Score extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let [first, second] = this.props.score;
    if (first === 10) {
      first = 'X';
      second = '';
    } else if (first + second === 10) {
      second = `/`;
    }
    return (
      <div className="score-container">
        <div className="score-top">
          <div className="score-first">
            {first}
          </div>
          <div className="score-second">
            {second}
          </div>
        </div>
      </div>
    )
  }
}

export default Score;