import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Score from './Score.jsx';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let scores = this.props.scoreBoard.map((score) => {
      return (<Score score={score} />);
    });

    return (
      <div className="scoreboard">
        {scores}
      </div>
    );
  }
}

export default ScoreBoard;