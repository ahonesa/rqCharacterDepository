import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CharacterListView from './CharacterListView';
import CharacterDetails from './CharacterDetails';
import { Row, Col, Grid, ListGroup, ListGroupItem, Button } from 'react-bootstrap';


class CharacterDetailsView extends Component {

  componentDidMount() {
    this.props.getOneChar(this.props.match.params.characterId);
    this.props.getAllChars();
  }

  rivit = () => this.props.characters && this.props.characters.map(char =>
    <ListGroupItem key={char.characterId} href={"/chars/" + char.characterId}>
      {char.characterId}
    </ListGroupItem>
  )

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={2} md={2} lg={2}>
            <ListGroup>
              {this.rivit()}
            </ListGroup>
            <Button href="/new_char">Create new character</Button>
          </Col>
          <Col xs={10} md={10} lg={10}>
            <CharacterDetails char={this.props.selectedChar} auth={this.props.auth} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps({ selectedChar, characters, auth }) {
  return { selectedChar, characters, auth }
}

export default connect(mapStateToProps, actions)(CharacterDetailsView);