import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import { SKILLS } from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem, Label } from "react-bootstrap";


class CharacterFormPageThree extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderSkillFields = this.renderSkillFields.bind(this)
    this.renderSkillSelect = this.renderSkillSelect.bind(this)
  }


  renderSkillSelect(member) {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <Field name={`${member}.skill`} component={ReduxFormSelect} placeholder="select">
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

  renderSkillFields({ fields, meta: { error, submitFailed } }) {
    return (<div>
      <label>Skillbonuses</label>
      <ListGroup>
        <ListGroupItem>Dexterity Bonus: {_.get(this.props, "character.bonuses.dexterityBonus", 0)}</ListGroupItem>
        <ListGroupItem>Communication Bonus: {_.get(this.props, "character.bonuses.communicationBonus", 0)}</ListGroupItem>
        <ListGroupItem>Knowledge Bonus: {_.get(this.props, "character.bonuses.knowledgeBonus", 0)}</ListGroupItem>
        <ListGroupItem>Magical Bonus: {_.get(this.props, "character.bonuses.magicalBonus", 0)}</ListGroupItem>
        <ListGroupItem>Manipulation Bonus: {_.get(this.props, "character.bonuses.manipulationBonus", 0)}</ListGroupItem>
        <ListGroupItem>Perception Bonus: {_.get(this.props, "character.bonuses.perceptionBonus", 0)}</ListGroupItem>
        <ListGroupItem>Stealth Bonus: {_.get(this.props, "character.bonuses.stealthBonus", 0)}</ListGroupItem>
      </ListGroup>  
      <label>Select skills</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={6} md={4}>
                  {this.renderSkillSelect(member)}
                </Col>
                <Col xs={6} md={4}>
                  <ReduxFormGroup name={`${member}.value`} label="Skill" />
                </Col>
                <Col xs={6} md={4}>
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
        <h2 style={{ marginBottom: 30}}><Label>Skills</Label></h2>
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