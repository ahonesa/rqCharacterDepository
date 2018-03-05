import _ from 'lodash';
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField';
import { Link } from 'react-router-dom';
import * as actions from "../../actions";
import { connect } from "react-redux";
import { loadavg } from "os";
import { Grid, FormGroup, Button, FormControl, ControlLabel, Row, Col } from "react-bootstrap";

const ReduxFormControl = ({ input, meta, ...props }) => {
  return <FormControl {...props} {...input} />
};


class UserForm extends Component {

  render() {
    const onSubmit = (values) => {
      this.props.updateUser(values.name)
    };
    const { handleSubmit, reset } = this.props
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4} lg={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup controlId="userForm">
                <ControlLabel>Username:</ControlLabel>
                <Field key="name" component={ReduxFormControl} type="text" label="User Name" name="userName" />
                <Button to="/" onClick={reset}>
                  Cancel
              </Button>
                <Button type="submit">Submit</Button>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({ auth }) {
  return { initialValues: auth }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: "userForm"
})(UserForm));