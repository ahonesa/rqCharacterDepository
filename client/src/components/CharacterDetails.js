import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Panel, Button } from 'react-bootstrap';

const CharacterDetails = ({ char }) => {
  switch (char) {
    case null:
      return (<div>
        <span>Loading</span>
      </div>);
    default:
      console.log(char)
      const c = char.character
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
                    <b>Species:</b>4    {c.info.species}</span>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Panel>
                  <Panel.Heading>Testi 2</Panel.Heading>
                  <Panel.Body>Character details 2</Panel.Body>
                </Panel>
              </Col>
              <Col xs={4} md={4} lg={4}>
                <Panel>
                  <Panel.Heading>Testi 3</Panel.Heading>
                  <Panel.Body>Character details 3</Panel.Body>
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
