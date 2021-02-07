import _ from "lodash"
import React, {Component} from "react"
import {reduxForm, Field} from "redux-form"
import {ReduxFormGroup, ReduxRadio} from '../../fields/Fields'
import {FormGroup, Button, Row, Col, Label} from "react-bootstrap"
import {isRequired, isString} from "./validation"

const ADDITIONAL_FIELDS = [
    {label: "Species", name: "species", type: "text"},
    {label: "Homeland/Clan", name: "clan", type: "text"},
    {label: "Age", name: "age", type: "number"},
    {label: "Culture", name: "culture", type: "text"},
    {label: "Religion", name: "religion", type: "text"},
    {label: "Parent Occupation", name: "parent", type: "text"},
    {label: "Adventurer Occupation", name: "occupation", type: "text"},
    {label: "Reputation", name: "reputation", type: "number"}
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
                        <FormGroup>
                            <label>Sex</label>
                            <Field name="info.sex" component={ReduxRadio} type="radio" label="male" value="male"/>
                            <Field name="info.sex" component={ReduxRadio} type="radio" label="female" value="female"/>
                        </FormGroup>
                        {this.renderAdditionalFields()}
                        <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
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
