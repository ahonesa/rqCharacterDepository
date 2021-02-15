import _ from "lodash"
import React, {Component} from "react"
import {reduxForm} from "redux-form"
import {ReduxFormGroup} from '../../fields/Fields'
import {Button, Col, Label, Row} from "react-bootstrap"

const CHARACTERISTICS_FIELDS = [
    {label: "STR", name: "str"},
    {label: "CON", name: "con"},
    {label: "SIZ", name: "siz"},
    {label: "INT", name: "int"},
    {label: "DEX", name: "dex"},
    {label: "POW", name: "pow"},
    {label: "CHA", name: "cha"}
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
            <Col xs={4} md={3}>
                <ReduxFormGroup type="number" key={name + "_max"} label={label + " max"}
                                name={"characteristics." + name + "_max"} type="number"/>
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
                            <ReduxFormGroup type="number" label="XP points" name="xp"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} md={3}>
                            <ReduxFormGroup type="number" label="Max POW for gain roll"
                                            name="characteristics.maxPowForGain"/>
                            <ReduxFormGroup type="number" label="POW XP rolls" name="characteristics.powXpRolls"/>
                            <ReduxFormGroup type="number" label="Current Rune Points Pool 1"
                                            name="characteristics.rp1Current"/>
                            <ReduxFormGroup label="Rune Points Pool 1 Name"
                                            name="characteristics.rp1Name"/>
                            <ReduxFormGroup type="number" label="Total Rune Points Pool 1"
                                            name="characteristics.rp1Total"/>
                            <ReduxFormGroup type="number" label="Current Rune Points Pool 2"
                                            name="characteristics.rp2Current"/>
                            <ReduxFormGroup label="Rune Points Pool 2 Name"
                                            name="characteristics.rp2Name"/>
                            <ReduxFormGroup type="number" label="Total Rune Points Pool 2"
                                            name="characteristics.rp2Total"/>
                            <ReduxFormGroup type="number" label="Current Rune Points Pool 3"
                                            name="characteristics.rp3Current"/>
                            <ReduxFormGroup label="Rune Points Pool 3 Name"
                                            name="characteristics.rp3Name"/>
                            <ReduxFormGroup type="number" label="Total Rune Points Pool 3"
                                            name="characteristics.rp3Total"/>
                            <ReduxFormGroup type="number" label="Current Rune Points Pool 4"
                                            name="characteristics.rp4Current"/>
                            <ReduxFormGroup label="Rune Points Pool 4 Name"
                                            name="characteristics.rp4Name"/>
                            <ReduxFormGroup type="number" label="Total Rune Points Pool 4"
                                            name="characteristics.rp4Total"/>
                            <ReduxFormGroup type="number" label="Hero Points" name="characteristics.heroPoints"/>
                        </Col>
                    </Row>
                    <Button type="reset" href="/chars" onClick={reset}>Cancel</Button>
                    <Button type="button" onClick={this.previousPage}>Previous</Button>
                    <Button type="submit">Next</Button>
                </form>
            </Row>)
    }
}

export default reduxForm({
    form: "characterForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(CharacterFormPageTwo)
