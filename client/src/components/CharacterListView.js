import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Landing from './Landing';
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
    switch(this.props.auth) {
      case null:
        return <Landing />;
      case false:
        return <Landing />;
      default:
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
}

function mapStateToProps({ characters, auth }) {
  return { characters, auth }
}

export default connect(mapStateToProps, actions)(CharacterListView);