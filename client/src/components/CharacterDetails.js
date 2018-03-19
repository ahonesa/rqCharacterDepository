import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { Characteristics } from './character-details/Characteristics';

const CharacterDetails = ({ char }) => {
  switch (char) {
    case null:
      return (<div>
        <span>Loading</span>
      </div>);
    default:
      console.log(char)
      const c = char.character
      const characteristics = _.get(char, "character.characteristics", {})

      return (
        <Panel bsSize="small">
          <Panel.Heading componentClass="h4">{char.characterId}</Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={4} md={3} lg={4}>
                <Panel bsSize="small">
                  <Panel.Heading>Basic info</Panel.Heading>
                  <Panel.Body>
                    <span>
                    <b>Age:</b> {c.info.age}<br />
                    <b>Clan:</b>       {c.info.clan}<br />
                    <b>Culture:</b>    {c.info.culture}<br />
                    <b>Occupation:</b> {c.info.occupation}<br />
                    <b>Parents:</b>    {c.info.parent}<br />
                    <b>Religion:</b>   {c.info.religion}<br />
                    <b>Sex:</b>        {c.info.sex}<br />
                    <b>Species:</b>    {c.info.species}</span>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={3} md={3} lg={3}>
                <Panel>
                  <Panel.Heading>Picture</Panel.Heading>
                  <Panel.Body></Panel.Body>
                </Panel>
              </Col>
              <Col xs={5} md={5} lg={5}>
                <Panel>
                  <Panel.Heading>Characteristics</Panel.Heading>
                  <Panel.Body>
                      <Characteristics characteristics={characteristics} />
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={4} md={3} lg={3}>
                <Panel>
                  <Panel.Heading>Testi 4</Panel.Heading>
                  <Panel.Body>Character details 1</Panel.Body>
                </Panel>
              </Col>
              <Col xs={4} md={3} lg={3}>
                <Panel>
                  <Panel.Heading>Testi 5</Panel.Heading>
                  <Panel.Body>Character details 5</Panel.Body>
                </Panel>
              </Col>
              <Col xs={4} md={3} lg={3}>
                <Panel>
                  <Panel.Heading>Testi 6</Panel.Heading>
                  <Panel.Body>Character details 6</Panel.Body>
                </Panel>
              </Col>
            </Row>
            <Row>
            <Button href={"/chars/" + char.characterId + "/update/"}>Update character</Button>
            </Row>
          </Panel.Body>
        </Panel>
      );
  }

}

export default CharacterDetails
