import React, { Component } from 'react';
import * as actions from "../actions";
import { connect } from 'react-redux';
import CharacterDetails from './CharacterDetails';
import CharacterNotes from './CharacterNotes';
import Landing from './Landing';
import { Row, Col, Grid, ListGroup, ListGroupItem, Button, Tabs, Tab } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import CharacterStuff from './CharacterStuff';
import './common.css';

class CharacterDetailsView extends Component {

  componentDidMount() {
    this.props.getOneChar(this.props.match.params.characterId);
    this.props.getAllChars();
    this.interval = setInterval(() => this.props.selectedChar && this.props.getOneChar(this.props.selectedChar.characterId), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  rivit = () => this.props.characters && this.props.characters.map(char =>
      <LinkContainer key={char.characterId} to={"/chars/" + char.characterId}>
        <ListGroupItem onClick={() => this.props.getOneChar(char.characterId)} active={this.props.selectedChar && char.characterId===this.props.selectedChar.characterId} >
          {char.characterId}
        </ListGroupItem>
      </LinkContainer>);

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
                <Tabs defaultActiveKey={1} id="tabsMenu" animation={false}>
                  <Tab eventKey={1} title="Details">
                    <CharacterDetails char={this.props.selectedChar} auth={this.props.auth} params={this.props.params} />
                  </Tab>
                  <Tab eventKey={2} title="Stuff">
                    <CharacterStuff char={this.props.selectedChar} auth={this.props.auth} />
                  </Tab>
                  <Tab eventKey={3} title="Notes">
                    <CharacterNotes char={this.props.selectedChar} auth={this.props.auth} enableReinitialize />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Grid>
        )
      }  
  }
}

function mapStateToProps({ selectedChar, characters, auth, params }) {
  return { selectedChar, characters, auth, params }
}

export default connect(mapStateToProps, actions)(CharacterDetailsView);