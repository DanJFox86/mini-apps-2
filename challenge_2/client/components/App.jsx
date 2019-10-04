import React, { Component } from "react";
import ReactDOM from "react-dom";
import Chart from 'chart.js';
import TopBar from './TopBar.jsx';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cache: false,
      data: [],
      startDate: '2019-08-01',
      endDate: '2019-10-01'
    };
  }

  getData(cache, startDate, endDate) {
    axios.post('/BTCData', { cache, startDate, endDate })
      .then((response) => {
        let { data } = response;
        console.log(`heres our data`, data);
        this.setState({
          cache,
          data,
          startDate,
          endDate
        });
      });
  }

  componentDidMount() {
    this.getData(this.state.cache, this.state.startDate, this.state.endDate);
  }

  liveOrCache() {
    this.getData(!this.state.cache, this.state.startDate, this.state.endDate);
  }

  dateSearch(startDate, endDate) {
    this.getData(this.state.cache, startDate, endDate);
  }

  render() {
    var ctx = document.getElementById('myChart');
    console.log(`here's the data we are working with `, this.state.data);
    let labels = [];
    let data = [];
    if (this.state.data.length > -1) {
      this.state.data.forEach((dataPoint) => {
        labels.push(dataPoint[0]);
        data.push(dataPoint[1]);
      });
    }
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(255, 0, 0, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
    });
    let { startDate, endDate, cache } = this.state;
    let topBarOptions = {
      cacheClick: this.liveOrCache.bind(this),
      cache,
      startDate,
      endDate,
      dateSearch: this.dateSearch.bind(this)
    }
    return (
      <TopBar options={topBarOptions} />
    );
  }
}
export default App;
