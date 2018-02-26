import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField'
import { Link } from 'react-router-dom';

const ADDITIONAL_FIELDS = [
  { label: "Character Name", name: "name"},
  { label: "Species", name: "species"},
  { label: "Homeland/Clan", name: "clan"},
  { label: "Age", name: "age"},
  { label: "Culture", name: "culture"},
  { label: "Religion", name: "religion"},
  { label: "Parent Occupation", name: "parent"},
  { label: "Adventurer Occupation", name: "occupation"}
]

class CharacterFormPageOne extends Component {
  renderAdditionalFields() {
    return _.map(ADDITIONAL_FIELDS, ({label, name}) => {
      return <Field key={name} component={TextField} type="text" label={label} name={name} /> 
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderAdditionalFields()}
          <Link to="/chars" className="red btn-flat left white-text">
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
