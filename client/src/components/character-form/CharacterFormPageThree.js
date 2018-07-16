import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import { SKILLS } from '../characters/Skills';
import {ReduxFormGroup, ReduxFormControl, ReduxRadio, InputSelect} from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem, Label } from "react-bootstrap";
import { isNumber, isRequired } from "./validation";


class CharacterFormPageThree extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderSkillFields = this.renderSkillFields.bind(this)
    this.renderSkillSelect = this.renderSkillSelect.bind(this)
  }


  renderSkillSelect(member) {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <Field name={`${member}.skill`} component={InputSelect} placeholder="select" validate={isRequired}>
          <option />
          {
            SKILLS.map(({ label, group }) => (
              <option key={group + "." + label} value={group + "." + label}>{label} ({group})</option>
            ))
          }
        </Field>
      </FormGroup>
    );
  }

  renderSkillFields({ fields }) {
    return (<div>
      <label>Skillbonuses</label>
      <ListGroup>
        <ListGroupItem>Agility skill category modifier: {_.get(this.props, "character.bonuses.agilityModifier", 0)}</ListGroupItem>
        <ListGroupItem>Communication skill category modifier: {_.get(this.props, "character.bonuses.communicationModifier", 0)}</ListGroupItem>
        <ListGroupItem>Knowledge skill category modifier: {_.get(this.props, "character.bonuses.knowledgeModifier", 0)}</ListGroupItem>
        <ListGroupItem>Magic skill category modifier: {_.get(this.props, "character.bonuses.magicModifier", 0)}</ListGroupItem>
        <ListGroupItem>Manipulation skill category modifier: {_.get(this.props, "character.bonuses.manipulationModifier", 0)}</ListGroupItem>
        <ListGroupItem>Perception skill category modifier: {_.get(this.props, "character.bonuses.perceptionModifier", 0)}</ListGroupItem>
        <ListGroupItem>Stealth skill category modifier: {_.get(this.props, "character.bonuses.stealthModifier", 0)}</ListGroupItem>
      </ListGroup>
      <label>Select skills</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={4} md={4}>
                  {this.renderSkillSelect(member)}
                </Col>
                <Col xs={4} md={4}>
                  <ReduxFormGroup name={`${member}.value`} label="Skill" validate={[isRequired, isNumber]}/>
                </Col>
                <Col xs={4} md={4}>
                  <ReduxFormGroup name={`${member}.xp`} label="XP" />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12}>
                  <Button type="button" style={{ marginTop: 25 }} onClick={() => fields.remove(index)}>Remove</Button>
                </Col>
              </Row>
            </ListGroupItem>
          );
        })}
        <Button type="button" onClick={() => fields.push({})}>Add</Button>
      </ListGroup>
    </div>
    );
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <Row>
        <h2 style={{ marginBottom: 30 }}><Label>Skills</Label></h2>
        <form onSubmit={handleSubmit}>
          <FieldArray name="skills" component={this.renderSkillFields} />
          <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
          <Button type="button" onClick={this.previousPage}>Previous</Button>
          <Button type="submit">Next</Button>
        </form>
      </Row>);
  }
}

export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CharacterFormPageThree);