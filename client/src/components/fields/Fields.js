import React from 'react';
import { Field } from 'redux-form';
import { FormGroup, Radio, FormControl, ControlLabel } from "react-bootstrap";

export const ReduxFormControl = ({ input, meta, ...props }) => {
  return <FormControl {...props} {...input} />
};

export const ReduxRadio = ({ label, input, meta, ...props }) => {
  return (<Radio {...props} {...input}>{label}</Radio>)
};


export const ReduxFormGroup = ({ name, label }) => {
  return (
    <FormGroup>
      <ControlLabel>{label}:</ControlLabel>
      <Field component={ReduxFormControl} type="text" name={name} />
    </FormGroup>
  )
};