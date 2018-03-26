import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { ReduxFormControl, ReduxFormGroup, ReduxRadio, isReadOnly } from '../fields/Fields';
import { Link } from 'react-router-dom';
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, Label } from "react-bootstrap";


const ADDITIONAL_FIELDS = [
  { label: "Species", name: "species", type: "text" },
  { label: "Homeland/Clan", name: "clan", type: "text" },
  { label: "Age", name: "age", type: "number" },
  { label: "Culture", name: "culture", type: "text" },
  { label: "Religion", name: "religion", type: "text" },
  { label: "Parent Occupation", name: "parent", type: "text" },
  { label: "Adventurer Occupation", name: "occupation", type: "text" }
]

class CharacterFormPageOne extends Component {
  constructor(props) {
    super(props)
  }

  renderAdditionalFields(oper, auth) {
    return _.map(ADDITIONAL_FIELDS, ({ label, name, type }) => {
      return <ReduxFormGroup key={"info." + name} label={label} name={"info." + name} type={type} oper={oper} auth={auth}/>
    });
  }

  render() {
    const { handleSubmit, reset, oper, auth } = this.props
    console.log("oper: ", oper, auth)
    return (
      <Row>
        <h2 style={{ marginBottom: 30}}><Label>Basic information</Label></h2>
        <Col>
          <form onSubmit={handleSubmit}>
            <ReduxFormGroup label="Character Name" name="name" oper={oper} auth={auth}/>
            <FormGroup>
              <label>Sex</label>
              <Field disabled={isReadOnly(oper, auth)} name="info.sex" component={ReduxRadio} type="radio" label="male" value="male" />
              <Field disabled={isReadOnly(oper, auth)} name="info.sex" component={ReduxRadio} type="radio" label="female" value="female" />
            </FormGroup>
            {this.renderAdditionalFields(oper, auth)}
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
