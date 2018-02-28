import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField';
import RadioButton from '../fields/RadioButton';
import { Link } from 'react-router-dom';

const CHARACTERISTICS_FIELDS = [
  { label: "STR", name: "str"},
  { label: "CON", name: "con"},
  { label: "SIZ", name: "siz"},
  { label: "INT", name: "int"},
  { label: "DEX", name: "dex"},
  { label: "POW", name: "pow"},
  { label: "APP", name: "app"}
]

const CharacteristicField = ({ name, label }) => {
  return (
    <div className="row">
      <div className="col s4">
        <Field key={name} component={TextField} type="text" label={label} name={name} />
      </div>
      <div className="col s4">
        <Field key={name+"_max"} component={TextField} type="text" label={label+" max"} name={name+"_max"} />
      </div>
    </div>
  );
}


class CharacterFormPageTwo extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
  }

  renderFields() {
    return _.map(CHARACTERISTICS_FIELDS, ({label, name}) => {
      return <CharacteristicField key={name} label={label} name={name} /> 
    });
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>           
          {this.renderFields()}
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
})(CharacterFormPageTwo);
