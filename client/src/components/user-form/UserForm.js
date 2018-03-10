import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { loadavg } from "os";
import { Grid, FormGroup, Button, FormControl, ControlLabel, Row, Col } from "react-bootstrap";

const ReduxFormControl = ({input, meta, ...props}) => {
  return <FormControl {...props} {...input} />
};

class UserForm extends Component {
  render() {
    const onSubmit = (values) => {
      this.props.updateUser(values.userName)
    };
    const { handleSubmit, reset } = this.props
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={6} md={4} lg={12}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <ControlLabel>Username:</ControlLabel>
                <Field component={ReduxFormControl} type="text" name="userName" />
              </FormGroup>
              <Button type="reset" href="/" onClick={reset}>Cancel</Button>
              <Button type="submit">Submit</Button>
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