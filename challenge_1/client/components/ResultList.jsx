import React from 'react';
import Result from './Result.jsx';

class ResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let events = this.props.events.map((event, idx) => {
      return (<Result key={idx} event={event} />);
    });

    return (
      <div className="resultsContainer">
        {events}
      </div>
    );
  }
}

export default ResultList;
