import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CharacterListView extends Component {
  componentDidMount() {
    this.props.getAllChars();
  }

  rivit = () => this.props.characters && this.props.characters.map(char =>
    <Link className="collection-item" to={"/chars/" + char.characterId} key={char.characterId}>
     {char.name}
    </Link>
  )

  render() {
    console.log(this.props.characters)
    return(
      <ul className="collection">
        {this.rivit()}
      </ul>
    )
  }
}

function mapStateToProps({characters}) {
  return { characters }
}

export default connect(mapStateToProps, actions)(CharacterListView);