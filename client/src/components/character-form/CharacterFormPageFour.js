import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import { WEAPON_SKILLS } from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";


class CharacterFormPageFour extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderSkillFields = this.renderSkillFields.bind(this)
    this.renderWeaponSkillSelect = this.renderWeaponSkillSelect.bind(this)
  }

  renderWeaponSkillSelect(member, type) {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <Field name={`${member}.${type}.skill`} component={ReduxFormSelect} placeholder="select">
          <option />
          {
            WEAPON_SKILLS.map(({ label, group }) => {
              if (group === type) {
                return <option key={group + "." + label} value={group + "." + label}>{label} ({group})</option>;
              } else return;
            })
          }
        </Field>
      </FormGroup>
    );
  }

  renderSkillFields({ fields, meta: { error, submitFailed } }) {
    return (<div>
      <label>Skillbonuses</label>
      <ListGroup>
        <ListGroupItem>Attack Bonus: {_.get(this.props, "character.bonuses.manipulationBonus", 0)}</ListGroupItem>
        <ListGroupItem>Defense Bonus: {_.get(this.props, "character.bonuses.dexterityBonus", 0)}</ListGroupItem>
      </ListGroup>
      <label>Select weapon skills</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={6} md={4}>
                  {this.renderWeaponSkillSelect(member, "attack")}
                </Col>
                <Col xs={6} md={4}>
                  <ReduxFormGroup name={`${member}.attack.value`} label="Attack skill" />
                </Col>
              </Row>  
              <Row>  
                <Col xs={6} md={4}>
                  {this.renderWeaponSkillSelect(member, "parry")}
                </Col>
                <Col xs={6} md={4}>
                  <ReduxFormGroup name={`${member}.parry.value`} label="Parry skill" />
                </Col>
              </Row>
              <Row>
                <Col xs={4} md={3} lg={3}>  
                  <ReduxFormGroup name={`${member}.weapon`} label="Weapon in use" />
                </Col>  
                <Col xs={4} md={3} lg={3}>
                  <ReduxFormGroup name={`${member}.sr`} label="Strike rank" />
                </Col>
                <Col xs={4} md={3} lg={3}>  
                  <ReduxFormGroup name={`${member}.damage`} label="Damage" />
                </Col>  
                <Col xs={4} md={3} lg={3}>  
                  <FormGroup>
                    <label>Weapon type</label>
                    <Field name={`${member}.type`} component={ReduxRadio} type="radio" label="crushing" value="crushing" />
                    <Field name={`${member}.type`} component={ReduxRadio} type="radio" label="slashing" value="slashing" />
                    <Field name={`${member}.type`} component={ReduxRadio} type="radio" label="piercing" value="piercing" />
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
      <Row style={{ padding: 30 }}>
        <form onSubmit={handleSubmit}>
          <FieldArray name="weaponSkills" component={this.renderSkillFields} />
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