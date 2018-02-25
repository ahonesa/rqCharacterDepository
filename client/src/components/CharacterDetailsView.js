import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CharacterListView from './CharacterListView';

class CharacterDetailsView extends Component {
  render() {
    console.log(this.props)
    return(
      <div className="row">
        <div className="col s3"><CharacterListView /></div>
        <div className="col s9">Details</div>
      </div>
    )
  }
}

function mapStateToProps({characters}) {
  return { characters }
}

export default connect(mapStateToProps, actions)(CharacterDetailsView);