import React from 'react';
import { Field } from 'redux-form';
import { FormGroup, Radio, FormControl, ControlLabel, Checkbox } from "react-bootstrap";

export const ReduxFormControl = ({ input, meta, ...props }) => {
  return <FormControl {...props} {...input} />
};

export const ReduxFormSelect = ({ input, meta, ...props }) => {
  return <FormControl componentClass="select" {...props} {...input} />
};

export const ReduxRadio = ({ label, input, meta, ...props }) => {
  return (<Radio {...props} {...input}>{label}</Radio>)
};

export const ReduxCheckbox = ({ label, input, meta, ...props }) => {
  return (<Checkbox {...props} {...input}>{label}</Checkbox>)
};

export const ReduxFormGroup = ({ name, label, type }) => {
  return (
    <FormGroup bsSize="small">
      <ControlLabel>{label}:</ControlLabel>
      <Field component={ReduxFormControl} type={type} name={name} />
    </FormGroup>
  )
};