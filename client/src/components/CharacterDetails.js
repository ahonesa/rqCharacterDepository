import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CharacterDetails = ({char}) => {
  console.log(char);
  switch(char) {
    case null:
      return (<div className="teal lighten-5">
        <span>Loading</span>
      </div>);  
    default:
      return (
        <div className="row">
        </div>  
      );
    }

}

export default CharacterDetails
