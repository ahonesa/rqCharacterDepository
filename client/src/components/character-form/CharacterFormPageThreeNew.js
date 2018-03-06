import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import SKILLS from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col } from "react-bootstrap";


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
        <Field name={`${member}.skill`} component={ReduxFormSelect} placeholder="select">
          <option />
          {
            SKILLS.map(({ label, basic, group }) => (
              <option key={group + "." + label} value={group + "." + label}>{label}</option>
            ))
          }
        </Field>
      </FormGroup>
    );
  }

  renderSkillFields({ fields, meta: { error, submitFailed } }) {
    return (<div>
      <label>Select skills</label>
      <ul>
        {fields.map((member, index) => {
          return (
            <li key={index}>
              <Row>
                <Col xs={6} md={4}>
                  {this.renderSkillSelect(member)}
                </Col>
                <Col xs={6} md={4}>
                  <ReduxFormGroup name={`${member}.value`} label="Skill" />
                </Col>
                <Col xs={6} md={4}>
                <Button type="button" onClick={() => fields.remove(index)}>Remove</Button>
                </Col>
              </Row>
            </li>
          );
        })}
        <li>
          <Button type="button" onClick={() => fields.push({})}>Add</Button>
          {submitFailed && error && <span>{error}</span>}
        </li>
      </ul>
      </div>
    );
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <Row style={{ padding: 30 }}>
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