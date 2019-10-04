import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pin from './Pin.jsx';
import TopBar from './TopBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [true, true, true, true, true, true, true, true, true, true],
      knock: 0
    }
    this.pinNumberChange = this.pinNumberChange.bind(this);
  }

  pinNumberChange(e) {
    if (e.target.value <= 10) {
      this.setState({
        knock: e.target.value
      }, () => {
        console.log(`New pin value:     `, this.state.knock);
      });
    } else {
      alert('Please enter a number from 0-10');
    }
  }

  knockPins() {
    let arr = this.state.pins;
    let pinsUp = arr.reduce((acc, item) => {
      let val = item ? 1 : 0;
      return acc + val;
    });
    console.log(pinsUp);
  }

  componentDidMount() {

  }

  render() {
    let pins = this.state.pins.map((pin) => {
      return (<Pin pin={pin} />);
    });
    return (
      <div>Bowling Time!!!
        <TopBar howMany={this.props.knock}
               pinNumberChange={this.pinNumberChange} />
        {pins}
      </div>
    );
  }
}

export default App;