import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField';
import { Link } from 'react-router-dom';

class UserForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const onSubmit = (values) => (console.log(values));
    const { reset } = this.props
    return (
      <div>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="card-panel teal lighten-5 col s12">
              <Field key="name" component={TextField} type="text" label="User Name" name="name" />
              <Link to="/" className="red btn-flat left white-text" onClick={reset}>
                Cancel
              </Link>
              <button type="submit" className="teal btn-flat right white-text">
                Submit
                <i className="material-icons right">done</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "userForm"
})(UserForm);