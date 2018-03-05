import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import TextField from '../fields/TextField';
import RadioButton from '../fields/RadioButton';
import { Link } from 'react-router-dom';
import SKILLS from '../characters/Skills';

const SkillField = ({ label, basic, group }) => {
  return (
    <Field key={label} component={TextField} type="text" label={label + " (" + basic + ")"} name={group + "." + label} />
  );
}

class CharacterFormPageThree extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderSkillFields = this.renderSkillFields.bind(this)
    this.renderSkillSelect = this.renderSkillSelect.bind(this)
  }

  renderSkillSelect() {
    return (
      <Field name="skillSelect" component="select">
        <option />
        {
          SKILLS.map(({label, basic, group}) => (
            <option key={group + "." + label} value={group + "." + label}>{label}</option>
          ))
        }
      </Field>
    );
  }

  renderSkillFields({ fields, meta: { error, submitFailed } }) {
    return (
      <ul>
        {fields.map((member, index) => {
          return (
            <li key={index}>
              <p>Skill #{index + 1}</p>
              <div className="row">
                <div className="input-field col s4">
                  <label>Select skill</label>
                  <div>
                    {this.renderSkillSelect()}
                  </div>
                </div>
                <div className="col s4">
                  <Field
                    name={`${member}.value`}
                    type="text"
                    component={TextField}
                    label="Item"
                  />
                </div>
                <div className="col s1">
                  <button type="button" title="Remove stuff" className="red btn-flat right white-text" onClick={() => fields.remove(index)}>
                    <i className="material-icons">remove</i>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
        <li>
          <button type="button" className="teal btn-flat right white-text" onClick={() => fields.push({})}>
            Add
            <i className="material-icons right">add</i>
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
      </ul>
    );
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div style={{ padding: 30 }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <FieldArray name="stuff" component={this.renderSkillFields} />
          </div>
          <Link to="/chars" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="button" className="teal btn-flat middle white-text previous" onClick={this.previousPage}>
            Previous
          </button>
          <button type="submit" className="teal teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>);
  }
}

export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CharacterFormPageThree);