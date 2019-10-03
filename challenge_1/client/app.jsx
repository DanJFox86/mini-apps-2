import React from 'react';
import Search from './components/Search.jsx';
import ResultList from './components/ResultList.jsx';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      selected: 1,
      pageCount: 1,
      events: []
    };
  }

  search(e) {
    this.setState({
      selected: 1
    }, this.getEvents);
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  getEvents() {
    let url = '/events?';
    let index = 1;
    if (this.state.search !== '') {
      url += `q=${this.state.search}&`;
      index = 2;
    }
    url += '_page=' + JSON.stringify(this.state.selected) + '&_limit=10';
    console.log(`heres the url`, url)
    let offset = this.state.selected * this.props.perPage;
    let options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // _offset: this.state.selected * this.props.perPage,
      // 'Content-Type': 'application/json'
    };
    let pageCount = 0;
    // console.log(options);
    fetch(url, options)
      .then((res) => {
        for (var pair of res.headers.entries()) {
          if (pair[0] === 'link') {
            console.log(pair[1]);
            let links = pair[1].split(',');
            console.log(links);
            links.forEach((link) => {
              link = link.split(';');
              if (link[1].includes('last')) {
                link = link[0];
                link = link.split('=');
                pageCount = Number(link[index].split('&')[0]);
              }
            });
          }
        }
        return res.json();
      })
      .then((events) => {
        this.setState({
          events,
          pageCount
        });
      });
  }

  componentDidMount() {
    this.getEvents();
  }

  handlePageClick(data) {
    let selected = data.selected + 1;
    console.log('going to page', selected);
    this.setState({ selected }, () => {
      this.getEvents();
    });
  };

  render() {
    return (
      <div>
        <Search text={this.state.search}
              search={this.search.bind(this)}
              change={this.onSearchChange.bind(this)} />
        <ResultList events={this.state.events}
                      prev={this.props.prevPage}
                      next={this.props.nextPage} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;
