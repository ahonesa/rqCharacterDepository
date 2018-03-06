import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import { Link } from 'react-router-dom';
import SKILLS from '../characters/Skills';
import { ReduxFormGroup, ReduxFormControl, ReduxRadio, ReduxFormSelect } from '../fields/Fields'
import { Grid, FormGroup, Radio, Button, FormControl, ControlLabel, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

class CharacterFormPageFour extends Component {
  constructor(props) {
    super(props)
    this.previousPage = props.previousPage.bind(this)
    this.renderStuffFields = this.renderStuffFields.bind(this)
  }

  renderStuffFields({ fields, meta: { error, submitFailed } }) {
    return (
      <ul>
        {fields.map((member, index) => {
          return (
            <li key={index}>
              <p>Item #{index + 1}</p>
              <div className="row">
                <div className="col s4">
                  <Field
                    name={`${member}.item`}
                    type="text"
                    component={ReduxFormGroup}
                    label="Item"
                  />
                </div>
                <div className="col s1">
                  <Field
                    name={`${member}.quantity`}
                    type="text"
                    component={ReduxFormGroup}
                    label="Quantity"
                  />
                </div>
                <div className="col s1">
                  <Field
                    name={`${member}.weight`}
                    type="text"
                    component={ReduxFormGroup}
                    label="Weight"
                  />
                </div>
                <div className="col s5">
                  <Field
                    name={`${member}.effects`}
                    type="text"
                    component={ReduxFormGroup}
                    label="Effects"
                  />
                </div>
                <div className="col s1">
                <button type="button" title="Remove stuff" className="red btn-flat right white-text" onClick={() => fields.remove(index)}>
                  <i className="material-icons">remove</i>
                  </button>
                </div>
              </div>
            </li>
          );
        })}
        <li>
          <button type="button" className="teal btn-flat right white-text" onClick={() => fields.push({})}>
            Add
            <i className="material-icons right">add</i>
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
      </ul>
    );
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div style={{ padding: 30 }}>
        <form onSubmit={handleSubmit}>
          <FieldArray name="stuff" component={this.renderStuffFields} />
          <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
          <Button type="button" onClick={this.previousPage}>Previous</Button>
          <Button type="submit">Next</Button>
        </form>
      </div>);
  }
}

export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CharacterFormPageFour);