import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searchContainer">
        <textarea onChange={this.props.change} value={this.props.text} rows="1" columns="50"></textarea>
        <button onClick={this.props.search}>Search</button>
      </div>
    );
  }
}

export default Search;
