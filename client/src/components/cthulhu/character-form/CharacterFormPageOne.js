import _ from "lodash"
import React, {Component} from "react"
import {reduxForm, Field} from "redux-form"
import {ReduxFormGroup, ReduxRadio} from '../../fields/Fields'
import {FormGroup, Button, Row, Col, Label} from "react-bootstrap"
import {isRequired, isString, isNumber} from "./validation"

const ADDITIONAL_FIELDS = [
    {label: "Occupation", name: "occupation", type: "text"},
    {label: "Residence", name: "residence", type: "text"},
    {label: "Birthplace", name: "birthplace", type: "text"}
]

class CharacterFormPageOne extends Component {
    constructor(props) {
        super(props)
    }

    renderAdditionalFields() {
        return _.map(ADDITIONAL_FIELDS, ({label, name, type}) => {
            return <ReduxFormGroup key={"info." + name} label={label} name={"info." + name} type={type}/>
        })
    }

    render() {
        const {handleSubmit, reset} = this.props
        return (
            <Row>
                <h2 style={{marginBottom: 30}}><Label>Basic information</Label></h2>
                <Col>
                    <form onSubmit={handleSubmit}>
                        <ReduxFormGroup label="Character Name" name="name" validate={[isRequired, isString]}/>
                        <ReduxFormGroup label="Character Id" name="characterId" />
                        <ReduxFormGroup type="number"  label="Age" name="characteristics.ages"/>
                        <FormGroup>
                            <label>Sex</label>
                            <Field name="info.sex" component={ReduxRadio} type="radio" label="male" value="male"/>
                            <Field name="info.sex" component={ReduxRadio} type="radio" label="female" value="female"/>
                        </FormGroup>
                        {this.renderAdditionalFields()}
                        <Button type="reset" href="/cthulhu/chars" onClick={reset}>Cancel</Button>
                        <Button type="submit">Next</Button>
                    </form>
                </Col>
            </Row>
        )
    }
}

// <Field key="name" component={TextField} type="text" label="Character Name" name="name" />
export default reduxForm({
    form: "cthulhuCharacterForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(CharacterFormPageOne)
