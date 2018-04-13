import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import { connect } from "react-redux";
import { loadavg } from "os";
import { Grid, FormGroup, Button, FormControl, ControlLabel, Row, Col, Panel, Table } from "react-bootstrap";
import calculateBonuses from './characters/StatBonuses'
import { ARMOR } from './characters/Skills';

class CharacterStuff extends Component {

  ItemRows = (stuff) => {
    return (stuff.map(item => {
      console.log(item);
      return <tr key={item._id}><td>{item.item || ""}</td><td>{item.weight || ""}</td></tr>
    }));
  }

  ArmorRows = (armor) => {
    return (armor.map(item => {
      console.log(item);
      const armor = _.find(ARMOR, { 'label': item.armorType })
      console.log(armor)
      return (<tr key={item._id}>
        <td>{item.armorType}</td>
        <td>{(item.head == "true") && armor.value || "-"}</td>
        <td>{(item.chest == "true") && armor.value || "-"}</td>
        <td>{(item.stomach == "true") && armor.value || "-"}</td>
        <td>{(item.rh == "true") && armor.value || "-"}</td>
        <td>{(item.lh == "true") && armor.value || "-"}</td>
        <td>{(item.rl == "true") && armor.value || "-"}</td>
        <td>{(item.ll == "true") && armor.value || "-"}</td>
        <td>?</td></tr>);
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
    const armor = _.get(char, "character.armor", [])
    const authorizationLevel = auth && auth.authorizationLevel
    const userId = auth && auth.googleId
    const isOwner = ownerId === userId
    const hasXp = c.xp > 0

    console.log(stuff)
    console.log(armor)

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
            <Col xs={12} md={8} lg={8}>
              <Panel>
                <Panel.Heading>Armor layers</Panel.Heading>
                <Panel.Body>
                  <Table condensed responsive>
                    <thead>
                      <tr><th>Armor type</th><th>H</th><th>C</th><th>S</th><th>RH</th><th>LH</th><th>RL</th><th>LL</th><th>Weight</th></tr>
                    </thead>
                    <tbody>
                      {this.ArmorRows(armor)}
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
