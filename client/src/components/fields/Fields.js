import React, { Component } from 'react'
import { Field } from 'redux-form';
import { FormGroup, Radio, FormControl, ControlLabel, Checkbox } from "react-bootstrap";

export const ReduxFormControl = ({ input, meta, ...props }) => {
  return <div>
      <FormControl {...props} {...input} />
      {meta.touched &&
      ((meta.error && <span>{meta.error}</span>) ||
          (meta.warning && <span>{meta.warning}</span>))}
  </div>
};

export const ReduxRadio = ({ label, input, meta, ...props }) => {
  return (<Radio {...props} {...input}>{label}</Radio>)
};

export const ReduxCheckbox = ({ label, input, meta, ...props }) => {
  return (<Checkbox {...props} {...input}>{label}</Checkbox>)
};

export const ReduxFormGroup = ({ name, label, type, validate }) => {
  return (
    <FormGroup bsSize="small">
      <ControlLabel>{label}:</ControlLabel>
      <Field component={Input} type={type} name={name} validate={validate} />
    </FormGroup>
  )
};

export class Input extends Component {
    render () {
        console.log(this.props)

        const {
            feedbackIcon,
            input,
            label,
            type,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        let message;
        const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

        if ( touched && ( error || warning ) ) {
            message = <span className="help-block">{ error || warning }</span>;
        }

        return (
            <FormGroup validationState={ validationState }>
                <ControlLabel>{ label }</ControlLabel>
                <FormControl { ...input }
                             type={ type }
                             { ...props } />
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
                { message }
            </FormGroup>
        );
    }
}

export class InputSelect extends Component {
    render () {
        console.log(this.props)

        const {
            feedbackIcon,
            input,
            label,
            type,
            meta: { error, warning, touched },
            ...props
        } = this.props;

        let message;
        const validationState = touched && ( error && "error" ) || ( warning && "warning" ) || null;

        if ( touched && ( error || warning ) ) {
            message = <span className="help-block">{ error || warning }</span>;
        }

        return (
            <FormGroup validationState={ validationState }>
                <ControlLabel>{ label }</ControlLabel>
                <FormControl componentClass="select"
                             { ...input }
                             type={ type }
                             { ...props } />
                { feedbackIcon ? <FormControl.Feedback>{ feedbackIcon }</FormControl.Feedback> : null }
                { message }
            </FormGroup>
        );
    }
}