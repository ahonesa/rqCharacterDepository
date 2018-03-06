import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { ReduxFormControl, ReduxFormGroup, ReduxRadio } from '../fields/Fields';
import { Link } from 'react-router-dom';
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col } from "react-bootstrap";


const ADDITIONAL_FIELDS = [
  { label: "Species", name: "species" },
  { label: "Homeland/Clan", name: "clan" },
  { label: "Age", name: "age" },
  { label: "Culture", name: "culture" },
  { label: "Religion", name: "religion" },
  { label: "Parent Occupation", name: "parent" },
  { label: "Adventurer Occupation", name: "occupation" }
]

class CharacterFormPageOne extends Component {
  constructor(props) {
    super(props)
  }

  renderAdditionalFields() {
    return _.map(ADDITIONAL_FIELDS, ({ label, name }) => {
      return <ReduxFormGroup label={label} name={name} />
    });
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <Row style={{ padding: 40 }}>
        <Col>
          <form onSubmit={handleSubmit}>
            <ReduxFormGroup label="Character Name" name="name" />
            <FormGroup>
              <label>Sex</label>
              <Field name="sex" component={ReduxRadio} type="radio" label="male" value="male" />
              <Field name="sex" component={ReduxRadio} type="radio" label="female" value="female" />
            </FormGroup>
            {this.renderAdditionalFields()}
            <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
            <Button type="submit">Next</Button>
          </form>
        </Col>
      </Row>
    );
  }
}
// <Field key="name" component={TextField} type="text" label="Character Name" name="name" />
export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CharacterFormPageOne);
