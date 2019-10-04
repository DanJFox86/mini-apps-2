import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const TopBar = (props) => (
  <div className="TopBar">
    <input type="number" value={props.howMany} onChange={props.pinNumberChange} min="0" max="10" rows="1" columns="30"></input>
  </div>
);

export default TopBar;