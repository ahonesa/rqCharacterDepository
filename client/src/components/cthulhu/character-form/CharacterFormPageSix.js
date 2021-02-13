import React, {Component} from "react"
import {FieldArray, reduxForm} from "redux-form"
import {ReduxFormGroup} from '../../fields/Fields'
import {Button, Col, Label, ListGroup, ListGroupItem, Row} from "react-bootstrap"
import {isNumber, isRequired, isString} from "./validation"

class CharacterFormPageSix extends Component {
    constructor(props) {
        super(props)
        this.previousPage = props.previousPage.bind(this)
        this.renderStuffFields = this.renderStuffFields.bind(this)
    }

    renderStuffFields({fields}) {
        return (<div>
                <label>Select stuff</label>
                <ListGroup>
                    {fields.map((member, index) => {
                        return (
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <ReduxFormGroup name={`${member}.item`} label="Item"
                                                        validate={[isRequired, isString]}/>
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <ReduxFormGroup name={`${member}.weight`} label="Weight"
                                                        validate={[isRequired, isNumber]}/>
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <ReduxFormGroup name={`${member}.special`} label="Special"/>
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Button type="button" onClick={() => fields.remove(index)}>Remove</Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )
                    })}
                    <Button type="button" onClick={() => fields.push({})}>Add</Button>
                </ListGroup>
            </div>
        )
    }

    render() {
        const {handleSubmit, reset} = this.props
        return (
            <Row>
                <form onSubmit={handleSubmit}>
                    <h2 style={{marginBottom: 30}}><Label>Armor</Label></h2>

                    <h2 style={{marginBottom: 30}}><Label>Stuff</Label></h2>
                    <FieldArray name="stuff" component={this.renderStuffFields}/>
                    <ReduxFormGroup type="number" label="Money" name="money"/>
                    <ReduxFormGroup type="number" label="Spending level" name="spending_level"/>
                    <Button type="reset" href="/cthulhu/chars" onClick={reset}>Cancel</Button>
                    <Button type="button" onClick={this.previousPage}>Previous</Button>
                    <Button type="submit">Complete</Button>
                </form>
            </Row>)
    }
}

export default reduxForm({
    form: "cthulhuCharacterForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(CharacterFormPageSix)