import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import { WEAPON_SKILLS } from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem, Label } from "react-bootstrap";
import {isNumber, isRequired} from "./validation";


class CharacterFormPageFour extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderSkillFields = this.renderSkillFields.bind(this)
    this.renderWeaponSkillSelect = this.renderWeaponSkillSelect.bind(this)
    this.renderWeaponFields = this.renderWeaponFields.bind(this)
  }

  renderWeaponSkillSelect(member) {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select weapon category</ControlLabel>
        <Field name={`${member}.skill`} component={ReduxFormSelect} placeholder="select" validate={isRequired}>
          <option />
          {
            WEAPON_SKILLS.map(({ label, group }) => {
              return <option key={group + "." + label} value={group + "." + label}>{label}</option>;
            })
          }
        </Field>
      </FormGroup>
    );
  }
  
  renderSkillFields({ fields }) {
    return (<div>
      <label>Skillbonuses</label>
      <ListGroup>
        <ListGroupItem>Attack Bonus: {_.get(this.props, "character.bonuses.manipulationModifier", 0)}</ListGroupItem>
        <ListGroupItem>Defense Bonus: {_.get(this.props, "character.bonuses.agilityModifier", 0)}</ListGroupItem>
      </ListGroup>
      <label>Select weapon skills</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={6} md={4}>
                  {this.renderWeaponSkillSelect(member)}
                </Col>
              </Row>
              <Row>  
                <Col xs={4} md={4}>
                  <ReduxFormGroup name={`${member}.attack`} label="Attack skill" validate={[isRequired, isNumber]} />
                </Col>
                <Col xs={4} md={4}>
                  <ReduxFormGroup name={`${member}.parry`} label="Parry skill" validate={[isRequired, isNumber]} />
                </Col>
                <Col xs={4} md={4}>
                  <ReduxFormGroup name={`${member}.xp`} label="XP" />
                </Col>
              </Row>  
              <Row>  
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

  renderWeaponFields({ fields }) {
    return (<div>
      <label>Select weapons</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={6} md={4}>
                  {this.renderWeaponSkillSelect(member)}
                </Col>
              </Row>  
              <Row>
                <Col xs={4} md={3} lg={3}>  
                  <ReduxFormGroup name={`${member}.weapon`} label="Weapon in use" validate={ isRequired } />
                </Col>  
                <Col xs={4} md={3} lg={3}>
                  <ReduxFormGroup name={`${member}.sr`} label="Strike rank" />
                </Col>
                <Col xs={4} md={3} lg={3}>  
                  <ReduxFormGroup name={`${member}.damage`} label="Damage" />
                </Col>  
                <Col xs={4} md={3} lg={3}>  
                  <ReduxFormGroup name={`${member}.armor`} label="Armor points" />
                </Col> 
                <Col xs={4} md={3} lg={3}>  
                  <FormGroup>
                    <label>Weapon type</label>
                    <Field name={`${member}.weaponType`} component={ReduxRadio} type="radio" label="crushing" value="crushing" />
                    <Field name={`${member}.weaponType`} component={ReduxRadio} type="radio" label="slashing" value="slashing" />
                    <Field name={`${member}.weaponType`} component={ReduxRadio} type="radio" label="piercing" value="piercing" />
                  </FormGroup>
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
        <h2 style={{ marginBottom: 30}}><Label>Weapons</Label></h2>
        <form onSubmit={handleSubmit}>
          <FieldArray name="weaponskills" component={this.renderSkillFields} />
          <FieldArray name="weapons" component={this.renderWeaponFields} />
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
})(CharacterFormPageFour);