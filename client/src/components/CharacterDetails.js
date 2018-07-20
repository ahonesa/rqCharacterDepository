import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Panel, Button, Table, Badge } from 'react-bootstrap';
import { Characteristics } from './character-details/Characteristics';
import { SkillsPanelOne, SkillsPanelTwo } from './character-details/Skills';
import { WeaponsPanel } from './character-details/Weapons';
import calculateModifiers from './characters/StatBonuses'
import './common.css';

const CharacterDetails = ({ char, auth }) => {
  switch (char) {
    case null:
      return (<div>
        <span>Loading</span>
      </div>);
    default:
      const c = _.get(char, "character", {})
      const ownerId = _.get(char, "ownerId", {})
      const characteristics = _.get(char, "character.characteristics", {})
      const bonuses = characteristics && calculateModifiers(characteristics)
      const skills = _.get(char, "character.skills", {})
      const weapons = _.get(char, "character.weapons", {})
      const weaponskills = _.get(char, "character.weaponskills", {})
      const authorizationLevel = auth && auth.authorizationLevel
      const userId = auth && auth.googleId
      const isOwner = ownerId === userId 
      const hasXp = c.xp > 0  

      console.log(bonuses)

      return (
        <Panel bsSize="small">
          <Panel.Heading componentClass="h4" style={{ marginTop: "0px" }}>{char.characterId} <Badge>{c.xp}</Badge></Panel.Heading>
          <Panel.Body>
            <Row>
              <Col xs={12} md={4} lg={4}>
                <Panel className="shadowPanel" bsSize="small">
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
              <Col xs={12} md={4} lg={4}>
                <Panel className="shadowPanel" bsSize="small">
                  <Panel.Heading>Stats</Panel.Heading>
                  <Panel.Body>
                    <Table condensed responsive>
                      <thead>
                        <tr>
                          <th>Stat</th>
                          <th>Base</th>
                          <th>Current</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td>Hit points:</td><td>{bonuses.hitPoints.base}</td><td>{bonuses.hitPoints.current}</td></tr>
                        <tr><td>Magic points:</td><td>{bonuses.magicPoints.base}</td><td>{bonuses.magicPoints.current}</td></tr> 
                        <tr><td>Fatigue points:</td><td>{bonuses.fatiguePoints.base}</td><td>{bonuses.fatiguePoints.current}</td></tr>                           
                      </tbody>
                    </Table>
                    <Table condensed responsive>
                      <tbody>                         
                        <tr><td>Damage modifier:</td><td>{bonuses.damageModifier}</td></tr>
                        <tr><td>Strike rank:</td><td></td></tr>
                        <tr><td>Movement:</td><td></td></tr>
                      </tbody>
                    </Table>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Panel className="shadowPanel" bsSize="small">
                  <Panel.Heading>Characteristics</Panel.Heading>
                  <Panel.Body>
                    <Characteristics characteristics={characteristics} owner={isOwner} xp={c.xp}/>
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4} lg={4}>
                <Panel className="shadowPanel">
                  <Panel.Heading>Skills</Panel.Heading>
                  <Panel.Body>
                    <SkillsPanelOne skills={skills} bonuses={bonuses} owner={isOwner} hasXp={hasXp} />
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Panel className="shadowPanel">
                  <Panel.Heading>Skills</Panel.Heading>
                  <Panel.Body>
                    <SkillsPanelTwo skills={skills} bonuses={bonuses} owner={isOwner} hasXp={hasXp} />
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Panel className="shadowPanel">
                  <Panel.Heading>Weapons</Panel.Heading>
                  <Panel.Body>
                    <WeaponsPanel weapons={weapons} weaponskills={weaponskills} bonuses={bonuses} owner={isOwner} hasXp={hasXp} />
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col >
              <Panel>
                <Panel.Body>
                <Button disabled={ authorizationLevel === 1 ? false : true  } href={"/chars/" + char.characterId + "/update/"}>Update character</Button>
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
