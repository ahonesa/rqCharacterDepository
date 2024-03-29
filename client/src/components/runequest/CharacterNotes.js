import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import * as actions from "../../actions";
import {connect} from "react-redux";
import {Button, Col, ControlLabel, FormControl, FormGroup, Panel, Row} from "react-bootstrap";

const ReduxFormControl = ({input, meta, ...props}) => {
    return <FormControl style={{height: 200}} componentClass="textarea" {...props} {...input} />
};

class CharacterNotes extends Component {
    render() {
        const onSubmit = (values) => {
            this.props.createChar(values)
        };
        const {handleSubmit, reset, selectedChar} = this.props
        return (
            <Panel bsSize="small">
                <Panel.Heading componentClass="h4"
                               style={{marginTop: "0px"}}>{selectedChar && selectedChar.characterId}</Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col xs={8} md={8} lg={8}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup>
                                    <ControlLabel>Notes:</ControlLabel>
                                    <Field component={ReduxFormControl} type="textarea" name="notes"/>
                                </FormGroup>
                                <Button type="reset" onClick={reset}>Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </form>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        );
    }
}

function mapStateToProps({selectedChar}) {
    if (selectedChar) {
        return {initialValues: selectedChar.character, selectedChar: selectedChar}
    } else return {selectedChar};
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: "characterNotesForm"
})(CharacterNotes));