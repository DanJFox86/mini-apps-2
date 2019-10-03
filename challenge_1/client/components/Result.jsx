import React from 'react';

class Result extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { description, date, lang, category1, category2, granularity } = this.props.event;

    return (
      <div className="event">
        <div className="description">{description}</div>
        <div className="date">{date}</div>
        <div className="lang">{lang}</div>
        <div className="category1">{category1}</div>
        <div className="category2">{category2}</div>
        <div className="granularity">{granularity}</div>
      </div>
    );
  }
}

export default Result;
