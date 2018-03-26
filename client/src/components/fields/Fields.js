import React from 'react';
import { Field } from 'redux-form';
import { FormGroup, Radio, FormControl, ControlLabel, Checkbox } from "react-bootstrap";


export const isReadOnly = (oper, auth) => {
  if(oper === 'create') return false;
  else if(oper === 'update' && auth === 1) return false;
  else if(oper === 'update' && auth === 2) return true;
  else return false;
}

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

export const ReduxFormGroup = ({ name, label, type, oper, auth }) => {
  return (
    <FormGroup bsSize="small">
      <ControlLabel>{label}:</ControlLabel>
      <Field readOnly={isReadOnly(oper, auth)} component={ReduxFormControl} type={type} name={name} />
    </FormGroup>
  )
};