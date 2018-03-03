import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField';
import { Link } from 'react-router-dom';
import * as actions from "../../actions";
import { connect } from "react-redux";
import { loadavg } from "os";

class UserForm extends Component {

  render() {
    const onSubmit = (values) => {
      this.props.updateUser(values.name)
    };
    const { handleSubmit, reset } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="card-panel teal lighten-5 col s12">
              <Field key="name" component={TextField} type="text" label="User Name" name="userName" />
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

function mapStateToProps({auth}) {
  return { initialValues: auth }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: "userForm"
})(UserForm));