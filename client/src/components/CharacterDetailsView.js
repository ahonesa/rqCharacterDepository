import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CharacterListView from './CharacterListView';
import CharacterDetails from './CharacterDetails';


class CharacterDetailsView extends Component {

  componentDidMount() {
    this.props.getOneChar(this.props.match.params.characterId);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s3"><CharacterListView /></div>
          <div className="col s9">
            <CharacterDetails char={this.props.selectedChar} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ selectedChar }) {

  return { selectedChar }
}

export default connect(mapStateToProps, actions)(CharacterDetailsView);