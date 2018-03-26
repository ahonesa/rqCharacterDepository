import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Panel, Button, ListGroup, ListGroupItem, Grid } from 'react-bootstrap';

class CharacterListView extends Component {
  componentDidMount() {
    this.props.getAllChars();
  }

  rivit = () => this.props.characters && this.props.characters.map(char => {
    return <ListGroupItem key={char.characterId} href={"/chars/" + char.characterId}>
      {char.characterId}
  </ListGroupItem> }
  )

  render() {
    return (
      <Grid>
        <ListGroup>
          {this.rivit()}
        </ListGroup>

        <Button href="/new_char">Create new character</Button>
      </Grid>
    )
  }
}

function mapStateToProps({ characters }) {
  return { characters }
}

export default connect(mapStateToProps, actions)(CharacterListView);