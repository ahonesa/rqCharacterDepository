import _ from "lodash";
import React, {Component} from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {InputSelect, ReduxFormGroup} from '../../fields/Fields'
import {Button, Col, ControlLabel, FormGroup, Label, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {isNumber, isRequired, isString} from "./validation";


class CharacterFormPageFive extends Component {
    constructor(props) {
        super(props)
        this.previousPage = props.previousPage.bind(this)
        this.renderSpellFields = this.renderSpellFields.bind(this)
    }

    renderSpellFields({fields, meta: {error, submitFailed}}) {
        return (<div>
                <label>Skillbonuses</label>
                <ListGroup>
                    <ListGroupItem>Magic skill category
                        modifier: {_.get(this.props, "character.bonuses.magicModifier", 0)}</ListGroupItem>
                </ListGroup>
                <label>Select spells</label>
                <ListGroup>
                    {fields.map((member, index) => {
                        return (
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col xs={6} md={3}>
                                        <ReduxFormGroup name={`${member}.spell`} label="Spell Name"
                                                        validate={[isRequired, isString]}/>
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <ReduxFormGroup name={`${member}.cost`} label="Spell cost"
                                                        validate={[isRequired, isString]}/>
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <ReduxFormGroup name={`${member}.cast_time`} label="Cast time"/>
                                    </Col>
                                    <Col xs={6} md={3}>
                                        <Button type="button" onClick={() => fields.remove(index)}>Remove</Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        );
                    })}
                    <Button type="button" onClick={() => fields.push({})}>Add</Button>
                </ListGroup>
            </div>
        );
    }

    render() {
        const {handleSubmit, reset} = this.props
        return (
            <Row>
                <h2 style={{marginBottom: 30}}><Label>Spells</Label></h2>
                <form onSubmit={handleSubmit}>
                    <ReduxFormGroup name="freeint" label="Free INT"/>
                    <FieldArray name="spells" component={this.renderSpellFields}/>
                    <Button type="reset" href="/cthulhu/chars" onClick={reset}>Cancel</Button>
                    <Button type="button" onClick={this.previousPage}>Previous</Button>
                    <Button type="submit">Next</Button>
                </form>
            </Row>);
    }
}

export default reduxForm({
    form: "cthulhuCharacterForm",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
})(CharacterFormPageFive);