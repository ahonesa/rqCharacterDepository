import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import { SKILLS } from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem, Label } from "react-bootstrap";

class CharacterFormPageSix extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderStuffFields = this.renderStuffFields.bind(this)
  }

  renderStuffFields({ fields, meta: { error, submitFailed } }) {
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
                  <ReduxFormGroup name={`${member}.item`} label="Item" />
                </Col>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.weight`} label="Weight" />
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

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <Row>
        <h2 style={{ marginBottom: 30 }}><Label>Armor</Label></h2>
        <form onSubmit={handleSubmit}>
          <ListGroup>
            <Row>
              <Col xs={2} md={2} xsOffset={3}>
                <ListGroupItem><ReduxFormGroup name="armor.H" label="Head" /></ListGroupItem>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={2}>
                <ListGroupItem><ReduxFormGroup name="armor.LH" label="Left Hand" /></ListGroupItem>
              </Col>
              <Col xs={4} md={4}>
                <ListGroupItem><ReduxFormGroup name="armor.C" label="Chest" /></ListGroupItem>
              </Col>
              <Col xs={2} md={2}>
                <ListGroupItem><ReduxFormGroup name="armor.RH" label="Right Hand" /></ListGroupItem>
              </Col>
            </Row>
            <Row>
              <Col xs={4} md={4} xsOffset={2}>
                <ListGroupItem><ReduxFormGroup name="armor.S" label="Stomach" /></ListGroupItem>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={2} xsOffset={2}>
                <ListGroupItem><ReduxFormGroup name="armor.LL" label="Left Leg" /></ListGroupItem>
              </Col>
              <Col xs={2} md={2}>
                <ListGroupItem><ReduxFormGroup name="armor.RL" label="Right Leg" /></ListGroupItem>
              </Col>
            </Row>
          </ListGroup>
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