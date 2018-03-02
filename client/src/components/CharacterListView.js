import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CharacterListView extends Component {
  componentDidMount() {
    this.props.getAllChars();
  }

  rivit = () => this.props.characters && this.props.characters.map(char =>
    <Link className="collection-item" 
          to={"/chars/" + char.characterId} 
          key={char.characterId}>
     {char.name}
    </Link>
  )

  render() {
    return(
      <div className="container">
        <ul className="collection">
          {this.rivit()}
        </ul>
        <div className="fixed-action-btn">
          <Link to="/new_char" className="btn-floating btn-large red">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({characters}) {
  return { characters }
}

export default connect(mapStateToProps, actions)(CharacterListView);