import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Pin = (props) => (
  <div className="pin">
    {props.pin ? 'I' : "O"}
  </div>
)

export default Pin;