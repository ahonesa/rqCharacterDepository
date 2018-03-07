import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router-dom';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, Label } from "react-bootstrap";

const CHARACTERISTICS_FIELDS = [
  { label: "STR", name: "str" },
  { label: "CON", name: "con" },
  { label: "SIZ", name: "siz" },
  { label: "INT", name: "int" },
  { label: "DEX", name: "dex" },
  { label: "POW", name: "pow" },
  { label: "APP", name: "app" }
]

const CharacteristicField = ({ name, label }) => {
  return (
    <Row>
      <Col xs={6} md={4} >
        <ReduxFormGroup key={name} label={label} name={"characteristics." + name} />
      </Col>
      <Col xs={6} md={4}>
        <ReduxFormGroup key={name + "_max"} label={label + " max"} name={"characteristics." + name + "_max"} />
      </Col>
    </Row>
  );
}


class CharacterFormPageTwo extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
  }

  renderFields() {
    return _.map(CHARACTERISTICS_FIELDS, ({ label, name }) => {
      return <CharacteristicField key={name} label={label} name={name} />
    });
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <Row>
        <h2 style={{ marginBottom: 30}}><Label>Characteristics</Label></h2>
        <form onSubmit={handleSubmit}>
          {this.renderFields()}
          <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
          <Button type="button" onClick={this.previousPage}>Previous</Button>
          <Button type="submit">Next</Button>
        </form>
      </Row>);
  }
}

export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CharacterFormPageTwo);
