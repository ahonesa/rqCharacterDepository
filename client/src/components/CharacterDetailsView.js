import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CharacterListView from './CharacterListView';
import CharacterDetails from './CharacterDetails';
import CharacterNotes from './CharacterNotes';
import Landing from './Landing';
import { Row, Col, Grid, ListGroup, ListGroupItem, Button, Tabs, Tab, Panel } from 'react-bootstrap';
import CharacterStuff from './CharacterStuff';


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
    switch(this.props.auth) {
      case null:
        return <Landing />;
      case false:
        return <Landing />;
      default:
        return (
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={2} lg={2}>
                <ListGroup>
                  {this.rivit()}
                </ListGroup>
                <Button href="/new_char">Create new character</Button>
              </Col>
              <Col xs={12} md={10} lg={10}>
                <Tabs defaultActiveKey={1} animation id="tabsMenu">
                  <Tab eventKey={1} title="Details">
                    <CharacterDetails char={this.props.selectedChar} auth={this.props.auth} />
                  </Tab>
                  <Tab eventKey={2} title="Stuff">
                    <CharacterStuff char={this.props.selectedChar} auth={this.props.auth} />
                  </Tab>
                  <Tab eventKey={3} title="Notes">
                    <CharacterNotes char={this.props.selectedChar} auth={this.props.auth} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Grid>
        )
      }  
  }
}

function mapStateToProps({ selectedChar, characters, auth }) {
  return { selectedChar, characters, auth }
}

export default connect(mapStateToProps, actions)(CharacterDetailsView);