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

class CharacterFormPageFour extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderStuffFields = this.renderStuffFields.bind(this)
  }

  renderStuffFields({ fields, meta: { error, submitFailed } }) {
    return (
      <ul>
        <li>
          <button type="button" className="teal teal btn-flat right white-text" onClick={() => fields.push({})}>
            Add
            <i className="material-icons right">add</i>
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((member, index) => {
          return (
          <li key={index}>
            <button type="button" title="Remove stuff" className="teal teal btn-flat right white-text" onClick={() => fields.remove(index)}>
              Remove
              <i className="material-icons right">remove</i>
            </button>
            <p>Item #{index + 1}</p>
            <div className="row">
            <div className="col s4">
            <Field
              name={`${member}.item`}
              type="text"
              component={TextField}
              label="Item"
            />
            </div>
            <div className="col s4">
            <Field
              name={`${member}.quantity`}
              type="text"
              component={TextField}
              label="Quantity"
            />
            </div>
            <div className="col s4">
            <Field
              name={`${member}.weight`}
              type="text"
              component={TextField}
              label="Weight"
            />
            </div>
            </div>
          </li>
        );
      })}
    </ul>
    ); 
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div style={{padding: 30}}>
        <form onSubmit={handleSubmit}>
          <div className="row">
          <FieldArray name="stuff" component={this.renderStuffFields} />
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
})(CharacterFormPageFour);