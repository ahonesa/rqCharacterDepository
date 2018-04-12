import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";
import { loadavg } from "os";
import { Grid, FormGroup, Button, FormControl, ControlLabel, Row, Col, Panel, Table } from "react-bootstrap";
import calculateBonuses from './characters/StatBonuses'

class CharacterStuff extends Component {

  ItemRows = (stuff) => {
    return(stuff.map(item => {
      console.log(item);
      return <tr key={item._id}><td>{item.item || ""}</td><td>{item.weight || ""}</td></tr>
    }));
  } 

  render() {
    const onSubmit = (values) => {
      console.log(values)
      this.props.createChar(values)
    };
    const { char, auth } = this.props

    const c = _.get(char, "character", {})
    const ownerId = _.get(char, "ownerId", {})
    const characteristics = _.get(char, "character.characteristics", {})
    const bonuses = characteristics && calculateBonuses(characteristics)
    const stuff = _.get(char, "character.stuff", [])
    const authorizationLevel = auth && auth.authorizationLevel
    const userId = auth && auth.googleId
    const isOwner = ownerId === userId
    const hasXp = c.xp > 0

    console.log(stuff)

    return (
      <Panel bsSize="small">
        <Panel.Heading componentClass="h4">{char && char.characterId}</Panel.Heading>
        <Panel.Body>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <Panel>
                <Panel.Heading>Items</Panel.Heading>
                <Panel.Body>
                  <Table condensed responsive>
                    <thead>
                      <tr><th>Item</th><th>Weight</th></tr>
                    </thead>
                    <tbody>
                      {this.ItemRows(stuff)}
                    </tbody>
                  </Table>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    );
  }
}

function mapStateToProps({ selectedChar }) {
  if (selectedChar) {
    return { selectedChar: selectedChar }
  } else return {};
}

export default connect(mapStateToProps, actions)(CharacterStuff);
