import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import { ARMOR } from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect, ReduxCheckbox } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem, Label } from "react-bootstrap";
import {isNumber, isRequired, isString} from "./validation";

class CharacterFormPageSix extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderStuffFields = this.renderStuffFields.bind(this)
    this.renderArmorFields = this.renderArmorFields.bind(this)
  }

  renderStuffFields({ fields }) {
    return (<div>
      <label>Fatigue</label>
      <ListGroup>
        <ListGroupItem>Fatigue points: {_.get(this.props, "character.fatiguePoints.base", 0)}</ListGroupItem>
      </ListGroup>
      <label>Select stuff</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.item`} label="Item" validate={[isRequired, isString]}/>
                </Col>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.weight`} label="Weight" validate={[isRequired, isNumber]} />
                </Col>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.special`} label="Special" />
                </Col>
                <Col xs={6} md={3}>
                  <Button type="button" onClick={() => fields.remove(index)}>Remove</Button>
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

  renderArmorSelect(member) {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select armor type</ControlLabel>
        <Field name={`${member}.armorType`} component={ReduxFormSelect} placeholder="select" validate={isRequired}>
          <option />
          {
            ARMOR.map(({ label }) => {
              return <option key={label} value={label}>{label}</option>;
            })
          }
        </Field>
      </FormGroup>
    );
  }

  renderArmorFields({ fields, meta: { error, submitFailed } }) {
    return (<div>
      <label>Select armor layers:</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              {this.renderArmorSelect(member)}
              <Row>
                <Col xs={6} md={3}>
                  <FormGroup>
                    <label>Locations</label>
                    <Field name={`${member}.head`} component={ReduxCheckbox} type="checkbox" label="Head" value="head" />
                    <Field name={`${member}.chest`} component={ReduxCheckbox} type="checkbox" label="Chest" value="chest" />
                    <Field name={`${member}.stomach`} component={ReduxCheckbox} type="checkbox" label="Stomach" value="stomach" />
                    <Field name={`${member}.lh`} component={ReduxCheckbox} type="checkbox" label="Left hand" value="lh" />
                    <Field name={`${member}.rh`} component={ReduxCheckbox} type="checkbox" label="Right hand" value="rh" />
                    <Field name={`${member}.ll`} component={ReduxCheckbox} type="checkbox" label="Left leg" value="ll" />
                    <Field name={`${member}.rl`} component={ReduxCheckbox} type="checkbox" label="Right leg" value="rl" />
                  </FormGroup>
                </Col>
                <Col xs={6} md={3}>
                  <Button type="button" onClick={() => fields.remove(index)}>Remove</Button>
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
        <form onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: 30 }}><Label>Armor</Label></h2>
          <FieldArray name="armor" component={this.renderArmorFields} />
          <h2 style={{ marginBottom: 30 }}><Label>Stuff</Label></h2>
          <FieldArray name="stuff" component={this.renderStuffFields} />
          <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
          <Button type="button" onClick={this.previousPage}>Previous</Button>
          <Button type="submit">Complete</Button>
        </form>
      </Row>);
  }
}

export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CharacterFormPageSix);