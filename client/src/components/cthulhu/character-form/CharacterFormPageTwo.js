import _ from "lodash"
import React, {Component} from "react"
import {reduxForm} from "redux-form"
import {ReduxFormGroup} from '../../fields/Fields'
import {Button, Col, Label, Row} from "react-bootstrap"

const CHARACTERISTICS_FIELDS = [
    {label: "STR", name: "str"},
    {label: "DEX", name: "dex"},
    {label: "INT", name: "int"},
    {label: "CON", name: "con"},
    {label: "APP", name: "app"},
    {label: "POW", name: "pow"},
    {label: "SIZ", name: "siz"},
    {label: "EDU", name: "edu"}
]

const CharacteristicField = ({name, label}) => {
    return (
        <Row>
            <Col xs={4} md={3}>
                <ReduxFormGroup type="number" key={name + "_org"} label={label + " org"}
                                name={"characteristics." + name + "_org"}/>
            </Col>
            <Col xs={4} md={3}>
                <ReduxFormGroup type="number" key={name} label={label} name={"characteristics." + name}/>
            </Col>
        </Row>
    )
}


class CharacterFormPageTwo extends Component {
    constructor(props) {
        super(props)
        this.previousPage = props.previousPage.bind(this)
    }

    renderFields() {
        return _.map(CHARACTERISTICS_FIELDS, ({label, name}) => {
            return <CharacteristicField key={name} label={label} name={name}/>
        })
    }

    render() {
        const {handleSubmit, reset, auth, oper} = this.props
        return (
            <Row>
                <form onSubmit={handleSubmit}>
                    <h2 style={{marginBottom: 30}}><Label>Characteristics</Label></h2>
                    {this.renderFields()}
                    <Row>
                        <Col xs={4} md={3}>
                            <ReduxFormGroup type="number" label="Luck"
                                            name="characteristics.luck"/>
                            <ReduxFormGroup type="number" label="Luck (original)"
                                            name="characteristics.luck_org"/>

                            <ReduxFormGroup type="number" label="Sanity"
                                            name="characteristics.sanity"/>
                            <ReduxFormGroup type="number" label="Sanity (original)"
                                            name="characteristics.sanity_org"/>
                            <ReduxFormGroup type="number" label="Hit Points"
                                            name="characteristics.hit_points"/>
                            <ReduxFormGroup type="number" label="Magic Points"
                                            name="characteristics.magic_points"/>
                        </Col>
                    </Row>
                    <Button type="reset" href="/cthulhu/chars" onClick={reset}>Cancel</Button>
                    <Button type="button" onClick={this.previousPage}>Previous</Button>
                    <Button type="submit">Next</Button>
                </form>
            </Row>)
    }
}

export default reduxForm({
    form: "cthulhuCharacterForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(CharacterFormPageTwo)
