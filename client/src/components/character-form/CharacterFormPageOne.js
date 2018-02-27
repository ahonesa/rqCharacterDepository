import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField';
import RadioButton from '../fields/RadioButton';
import { Link } from 'react-router-dom';

const ADDITIONAL_FIELDS = [
  { label: "Species", name: "species"},
  { label: "Homeland/Clan", name: "clan"},
  { label: "Age", name: "age"},
  { label: "Culture", name: "culture"},
  { label: "Religion", name: "religion"},
  { label: "Parent Occupation", name: "parent"},
  { label: "Adventurer Occupation", name: "occupation"}
]

class CharacterFormPageOne extends Component {
  constructor(props) {
    super(props)
  }

  renderAdditionalFields() {
    return _.map(ADDITIONAL_FIELDS, ({label, name}) => {
      return <Field key={name} component={TextField} type="text" label={label} name={name} /> 
    });
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Field key="name" component={TextField} type="text" label="Character Name" name="name" />            
          <div>
            <label>Sex</label>
            <Field name="sex" component={RadioButton} type="radio" label="male" value="male" />
            <Field name="sex" component={RadioButton} type="radio" label="female" value="female" />
          </div>
          {this.renderAdditionalFields()}
          <Link to="/chars" className="red btn-flat left white-text" onClick={reset}>
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
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
})(CharacterFormPageOne);
