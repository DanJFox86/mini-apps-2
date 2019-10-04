const axios = require('axios');

let cache = [];

const getMoreData = (start = '2018-09-01', end = '2018-10-01', callback = defaultCB) => {
  console.log('start', start, '     end     ', end)
  let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=';
  url += start;
  url += `&end=` + end;
  console.log('heres the url', url);

  axios.get(url)
    .then((response) => {
      let info = response.data.bpi;
      let labels = Object.keys(info);
      labels.sort();
      console.log(info);
      cacheLabels = cache.map((dataPoint) => {
        return dataPoint[0];
      });
      console.log(`heres the cache labels`, cacheLabels)
      labels.forEach((label, idx) => {
        console.log(`looking at datapoint for `, label)
        if (!cacheLabels.includes(label)) {
          console.log(`found a datapoint that is not in our cache`)
          cache.push([label,info[label]]);
        }
      });
      cache.sort((a, b) => {
        if (a[0] > b[0]) {
          return 1;
        } else if (a[0] < b[0]) {
          return -1;
        } else {
          return 0;
        }
      })
      // console.log(cache)
      readFromCache(start, end, callback);
    });
}

const readFromCache = (startDate, endDate, callback) => {
  let data = [];
  cache.forEach((dataPoint, idx) => {
    if (dataPoint[0] >= startDate && dataPoint[0] <= endDate) {
      data.push(dataPoint);
    }
  });
  console.log(data);
  callback(data);
}

const getData = (req, res, callback) => {
  console.log(`Received a ${req.method} request from ${req.url}.`);
  // console.log(req.body);
  let { startDate, endDate } = req.body;
  // console.log('start date:    ', startDate);
  // console.log('end date:      ', endDate);
  if (req.body.cache) {
    readFromCache(startDate, endDate, callback);
  } else {
    getMoreData(startDate, endDate, callback);
  }
}

const defaultCB = () => {
  console.log('Just getting some data, mate! Blimey!');
}

getMoreData();

module.exports = {
    getData
  };