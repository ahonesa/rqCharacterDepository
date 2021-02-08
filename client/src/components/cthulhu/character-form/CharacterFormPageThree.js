import _ from "lodash";
import React, {Component} from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {BASE_SKILLS} from '../characters/Skills';
import {Input, ReduxFormGroup} from '../../fields/Fields'
import {Button, Col, ControlLabel, FormGroup, Label, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {isNumber, isRequired} from "./validation";


class CharacterFormPageThree extends Component {
    constructor(props) {
        super(props)
        this.previousPage = props.previousPage.bind(this)
        this.renderBaseSkillFields = this.renderBaseSkillFields.bind(this)
        this.renderAdditionalSkillFields = this.renderAdditionalSkillFields.bind(this)
        this.props.initialize
    }

    renderAdditionalSkillFields({fields}) {
        return (<div>
                <label>Additional skills</label>
                <ListGroup>
                    {fields.map((member, index) => {
                        return (
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col xs={4} md={4}>
                                        <ReduxFormGroup name={`${member}.skill`} label="Skill"
                                                        validate={[isRequired]}/>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <ReduxFormGroup name={`${member}.value`} label="Skill"
                                                        validate={[isRequired, isNumber]}/>
                                    </Col>
                                    <Col xs={4} md={4}>
                                        <ReduxFormGroup name={`${member}.xp`} label="XP"/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={12}>
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

    renderBaseSkillFields() {
        return _.map(BASE_SKILLS, ({name, label, base}) => {
            console.log("Base: " + base)
            return <FormGroup bsSize="small">
                <ControlLabel>{label + " (" + base + ")"}:</ControlLabel>
                <Field key={"skills." + name} component={Input} type="number" name={"skills." + name + ".value"} validate={[isNumber]} />
            </FormGroup>
        })
    }

    render() {
        const {handleSubmit, reset} = this.props
        return (
            <Row>
                <h2 style={{marginBottom: 30}}><Label>Skills</Label></h2>
                <form onSubmit={handleSubmit}>
                    {this.renderBaseSkillFields()}
                    <FieldArray name="additional_skills" component={this.renderAdditionalSkillFields}/>
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
})(CharacterFormPageThree);