import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Panel, Button, Table } from 'react-bootstrap';
import { Characteristics } from './character-details/Characteristics';
import { SkillsPanel } from './character-details/Skills';
import { WeaponsPanel } from './character-details/Weapons';

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
      const skills = _.get(char, "character.skills", {})
      const weapons = _.get(char, "character.weapons", {})
      const weaponskills = _.get(char, "character.weaponskills", {})

      return (
        <Panel bsSize="small">
          <Panel.Heading componentClass="h4">{char.characterId}</Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={4} md={4} lg={4}>
                <Panel bsSize="small">
                  <Panel.Heading>Basic info</Panel.Heading>
                  <Panel.Body>
                    <Table condensed responsive>
                      <tbody>
                        <tr><td>Age:</td><td>{c.info.age}</td></tr>
                        <tr><td>Clan:</td><td>{c.info.clan}</td></tr>
                        <tr><td>Culture:</td><td>{c.info.culture}</td></tr>
                        <tr><td>Occupation:</td><td>{c.info.occupation}</td></tr>
                        <tr><td>Parents:</td><td>{c.info.parent}</td></tr>
                        <tr><td>Religion:</td><td>{c.info.religion}</td></tr>
                        <tr><td>Sex:</td><td>{c.info.sex}</td></tr>
                        <tr><td>Species:</td><td>{c.info.species}</td></tr>
                      </tbody>
                    </Table>
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
              <Col xs={4} md={4} lg={4}>
                <Panel>
                  <Panel.Heading>Skills</Panel.Heading>
                  <Panel.Body>
                    <SkillsPanel skills={skills} />
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Panel>
                  <Panel.Heading>Testi 5</Panel.Heading>
                  <Panel.Body>Character details 5</Panel.Body>
                </Panel>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Panel>
                  <Panel.Heading>Weapons</Panel.Heading>
                  <Panel.Body>
                    <WeaponsPanel weapons={weapons} weaponskills={weaponskills} />
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col >
              <Panel>
                <Panel.Body>
                <Button href={"/chars/" + char.characterId + "/update/"}>Update character</Button>
                </Panel.Body>
              </Panel>
              </Col>
            </Row>
          </Panel.Body>
        </Panel>
      );
  }

}

export default CharacterDetails
