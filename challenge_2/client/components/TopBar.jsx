import React, { Component } from "react";
import ReactDOM from "react-dom";

class TopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.options.startDate,
      endDate: this.props.options.endDate
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(e) {
    // console.log(e.target.value)
    // console.log(e.target.getAttribute('id') === 'start')
    if (e.target.getAttribute('id') === 'start') {
      this.setState({
        startDate: e.target.value
      }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({
        endDate: e.target.value
      }, () => {
        console.log(this.state);
      });
    }
  }

  render() {
    let { startDate, endDate } = this.state;
    return (
      <div className="topbar">
        <button onClick={this.props.options.cacheClick}
                className={this.props.options.cache ? 'cache' : 'live'}>{this.props.options.cache ? 'Cached' : 'Live'}</button>
        <div>Start Date:     </div>
        <input type="date" id="start" name="trip-start"
          value={this.state.startDate}
          onChange={this.onDateChange}></input>
        <div>End Date:     </div>
        <input type="date" id="end" name="trip-end"
          value={this.state.endDate}
          onChange={this.onDateChange}></input>
        <button onClick={() => { this.props.options.dateSearch(startDate, endDate)}}>Submit</button>
      </div>
    );
  }
}

export default TopBar;
