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
      <Col xs={4} md={3}>
        <ReduxFormGroup type="number" key={name + "_org"} label={label + " org"} name={"characteristics." + name + "_org"} />
      </Col>
      <Col xs={4} md={3} >
        <ReduxFormGroup type="number" key={name} label={label} name={"characteristics." + name} />
      </Col>
      <Col xs={4} md={3}>
        <ReduxFormGroup type="number" key={name + "_max"} label={label + " max"} name={"characteristics." + name + "_max"} type="number" />
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
    const { handleSubmit, reset, auth, oper } = this.props
    return (
      <Row>
        <form onSubmit={handleSubmit}>
          <h2 style={{ marginBottom: 30 }}><Label>Characteristics</Label></h2>
          {this.renderFields()}
          <Row>
            <Col xs={4} md={3}>
              <ReduxFormGroup type="number" label="XP points" name="xp" />
            </Col>
          </Row>
          <Row>
            <Col xs={4} md={3}>
              <ReduxFormGroup type="number" label="Max POW for gain roll" name="characteristics.maxPowForGain" />
            </Col>
          </Row>
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
