import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pin from './Pin.jsx';
import TopBar from './TopBar.jsx';
import ScoreBoard from './ScoreBoard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [true, true, true, true, true, true, true, true, true, true],
      scoreBoard: [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
      remainingPins: 10,
      knock: 0
    }
    this.pinNumberChange = this.pinNumberChange.bind(this);
    this.knockPins = this.knockPins.bind(this);
  }

  pinNumberChange(e) {
    if (e.target.value <= this.state.remainingPins) {
      this.setState({
        knock: e.target.value
      }, () => {
        console.log(`New pin value:     `, this.state.knock);
      });
    } else {
      alert(`Please enter a number from 0-${this.state.remainingPins}`);
    }
  }

  knockPins() {
    let pins = this.state.pins;
    let knock = this.state.knock;
    let remainingPins = this.state.remainingPins - this.state.knock;
    if (remainingPins < 1) {
      pins = [false,false,false,false,false,false,false,false,false,false];
    } else {
      while(knock > 0) {
        let idx = Math.floor(Math.random() * 10);
        if (pins[idx]) {
          pins[idx] = false;
          knock--;
        }
      }
    }
    this.setState({
      pins,
      remainingPins
    }, () => {
      console.log(this.state.remainingPins);
    });
  }

  componentDidMount() {

  }

  render() {
    let pins = this.state.pins;
    // pins = [pins[0],[pins[1],pins[2]],[pins[3],pins[4],pins[5]],[pins[6],pins[7],pins[8],pins[9]]];

    return (
      <div>Bowling Time!!!
        <TopBar howMany={this.props.knock}
        pinNumberChange={this.pinNumberChange}
          remainingPins={this.props.remainingPins}
              knockPins={this.knockPins} />
        <div className="pins">
          <div className="row 1">
            <Pin pin={pins[0]} />
          </div>
          <div className="row 2">
            <Pin pin={pins[1]} />
            <Pin pin={pins[2]} />
          </div>
          <div className="row 3">
            <Pin pin={pins[3]} />
            <Pin pin={pins[4]} />
            <Pin pin={pins[5]} />
          </div>
          <div className="row 4">
            <Pin pin={pins[6]} />
            <Pin pin={pins[7]} />
            <Pin pin={pins[8]} />
            <Pin pin={pins[9]} />
          </div>
        </div>
        <ScoreBoard scoreBoard={this.state.scoreBoard} />
      </div>
    );
  }
}

export default App;