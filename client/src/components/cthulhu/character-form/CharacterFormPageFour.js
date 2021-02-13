import React, {Component} from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {InputSelect, ReduxFormGroup, ReduxRadio} from '../../fields/Fields'
import {Button, Col, ControlLabel, FormGroup, Label, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {isRequired} from "./validation";
import {WEAPON_SKILLS} from "../characters/Skills";


class CharacterFormPageFour extends Component {
    constructor(props) {
        super(props)
        this.previousPage = props.previousPage.bind(this)
        this.renderWeaponFields = this.renderWeaponFields.bind(this)
        this.renderWeaponSkillSelect = this.renderWeaponSkillSelect.bind(this)
    }

    renderWeaponSkillSelect(member) {
        return (
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select weapon skill</ControlLabel>
                <Field name={`${member}.skill`} component={InputSelect} placeholder="select" validate={isRequired}>
                    <option/>
                    {
                        WEAPON_SKILLS.map(({label, name}) => {
                            return <option key={label} value={name}>{label}</option>;
                        })
                    }
                </Field>
            </FormGroup>
        );
    }

    renderWeaponFields({fields}) {
        return (<div>
                <label>Select weapons</label>
                <ListGroup>
                    {fields.map((member, index) => {
                        return (
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col xs={4} md={3} lg={3}>
                                        {this.renderWeaponSkillSelect(member)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} md={3} lg={3}>
                                        <ReduxFormGroup name={`${member}.weapon`} label="Weapon"
                                                        validate={isRequired}/>
                                    </Col>
                                    <Col xs={4} md={3} lg={3}>
                                        <ReduxFormGroup name={`${member}.damage`} label="Damage"/>
                                    </Col>
                                    <Col xs={4} md={3} lg={3}>
                                        <ReduxFormGroup name={`${member}.range`} label="Range"/>
                                    </Col>
                                    <Col xs={4} md={3} lg={3}>
                                        <ReduxFormGroup name={`${member}.attacks`} label="Attacks"/>
                                    </Col>
                                    <Col xs={4} md={3} lg={3}>
                                        <ReduxFormGroup name={`${member}.ammo`} label="Ammo"/>
                                    </Col>
                                    <Col xs={4} md={3} lg={3}>
                                        <ReduxFormGroup name={`${member}.malfunction`} label="Malfunction"/>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Button type="button" style={{marginTop: 25}}
                                                onClick={() => fields.remove(index)}>Remove</Button>
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
                <h2 style={{marginBottom: 30}}><Label>Weapons</Label></h2>
                <form onSubmit={handleSubmit}>
                    <FieldArray name="weapons" component={this.renderWeaponFields}/>
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
})(CharacterFormPageFour);