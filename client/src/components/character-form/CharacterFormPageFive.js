import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem, Label } from "react-bootstrap";


class CharacterFormPageFive extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderSpellFields = this.renderSpellFields.bind(this)
    this.renderSpellSelect = this.renderSpellSelect.bind(this)
  }


  renderSpellSelect(member) {
    return (
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>Select</ControlLabel>
        <Field name={`${member}.spelltype`} component={ReduxFormSelect} placeholder="select">
          <option />
          <option key="spirit" value="spirit">Spirit magic</option>
          <option key="rune" value="rune">Rune magic</option>
          <option key="sorcery" value="sorcery">Sorcery</option>
        </Field>
      </FormGroup>
    );
  }

  renderSpellFields({ fields, meta: { error, submitFailed } }) {
    return (<div>
      <label>Skillbonuses</label>
      <ListGroup>
        <ListGroupItem>Magic skill category modifier: {_.get(this.props, "character.bonuses.magicModifier", 0)}</ListGroupItem>
      </ListGroup>  
      <label>Select spells</label>
      <ListGroup>
        {fields.map((member, index) => {
          return (
            <ListGroupItem key={index}>
              <Row>
                <Col xs={6} md={3}>
                  {this.renderSpellSelect(member)}
                </Col>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.spell`} label="Spell Name" />
                </Col>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.rank`} label="Spell rank" />
                </Col>
                <Col xs={6} md={3}>
                  <ReduxFormGroup name={`${member}.value`} label="Skill (only sorceries)" />
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
        <h2 style={{ marginBottom: 30}}><Label>Spells</Label></h2>
        <form onSubmit={handleSubmit}>
          <ReduxFormGroup name="freeint" label="Free INT" />
          <FieldArray name="spells" component={this.renderSpellFields} />
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
})(CharacterFormPageFive);