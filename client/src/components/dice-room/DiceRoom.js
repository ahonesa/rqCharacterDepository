import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { loadavg } from "os";
import {Grid, FormGroup, Button, FormControl, ControlLabel, Row, Col, Panel, Table} from "react-bootstrap"
import { ReduxFormGroup } from '../fields/Fields'

const MessageRows = (messages) => {

    const msg = _.get(messages, "messages", [])

    return (msg.map(item => {
        console.log(item)
        let date = new Date(item.createdAt)
        
        return <tr key={item._id}>
            <td>{item.user.userName || ""} ({date.toLocaleString()}) result {item.diceResult}: {item.messageBody || ""}</td>
        </tr>
    }))
}


class DiceRoom extends Component {
    componentDidMount() {
        this.props.fetchMessages()
    }

    render() {
        const authorizationLevel = this.props.auth && this.props.auth.authorizationLevel
        console.log(authorizationLevel)

        const { handleSubmit, reset } = this.props

        const onSubmit = (values) => {
            this.props.postMessage(values.messageBody, values.diceRoll)
        };
        console.log(this.props.messages);
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={12} lg={12}>
                        <Panel className="shadowPanel">
                            <Panel.Heading>They see me rolling</Panel.Heading>
                            <Panel.Body>
                                <Table condensed responsive>
                                    <tbody>
                                    {MessageRows(this.props.messages)}
                                    </tbody>
                                </Table>
                            </Panel.Body>
                        </Panel>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                            <Col xs={12} md={2} lg={2}>
                            <ReduxFormGroup name="diceRoll" label="Dice" />
                            </Col>
                            <Col xs={12} md={10} lg={10}>
                            <ReduxFormGroup name="messageBody" label="Message" />
                            </Col>
                            </Row>
                            <Button type="reset" href="/" onClick={reset}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps({ auth, params, messages }) {
    return { params, auth, messages }
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: "messageForm"
})(DiceRoom));