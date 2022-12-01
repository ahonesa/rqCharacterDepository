import _ from "lodash";
import React, {Component} from "react";
import {reduxForm} from "redux-form";
import * as actions from "../../actions";
import {connect} from "react-redux";
import {Grid, Button, Row, Col, Panel, Table, Tabs, Tab} from "react-bootstrap"
import {ReduxFormGroup} from '../fields/Fields'
import Landing from '../Landing';
import '../common.css';

const MessageRows = (messages) => {

    const msg = _.get(messages, "messages", [])

    return (msg.map(item => {
        let date = new Date(item.createdAt)
        let username = (item.user && item.user.userName) || "Unknown"

        return <tr key={item._id}>
            <td>{username || ""} ({date.toLocaleString()})
                result {item.diceResult}: {item.messageBody || ""}</td>
        </tr>
    }))
}


class DiceRoom extends Component {
    componentDidMount() {
        this.props.fetchMessages()
        this.props.cthulhuFetchMessages()
        this.interval = setInterval(() => this.props.fetchMessages(), 10000)
        this.cthulhuInterval = setInterval(() => this.props.cthulhuFetchMessages(), 10000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        clearInterval(this.cthulhuInterval)
    }

    render() {
        const authorizationLevel = this.props.auth && this.props.auth.authorizationLevel

        const {handleSubmit, reset} = this.props

        const onSubmit = (values) => {
            this.props.postMessage(values.messageBody, values.diceRoll)
        }

        const onCthulhuSubmit = (values) => {
            this.props.cthulhuPostMessage(values.messageBody, values.diceRoll)
        }

        switch (this.props.auth) {
            case null:
                return <Landing/>
            case false:
                return <Landing/>
            default:
                return (
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={12} lg={12}>
                                <Tabs defaultActiveKey={2} id="tabsMenu" animation={false}>
                                    <Tab eventKey={1} title="Cthulhu">
                                        <Panel className="shadowPanel">
                                            <Panel.Heading>ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn
                                                <Button bsSize="small" className="pull-right"
                                                        disabled={authorizationLevel === 10 ? false : true}
                                                        onClick={() => this.props.cthulhuClearMessages()}>Clear all</Button>
                                            </Panel.Heading>
                                            <Panel.Body>
                                                <Table condensed responsive>
                                                    <tbody>
                                                    {MessageRows(this.props.cthulhuMessages)}
                                                    </tbody>
                                                </Table>
                                            </Panel.Body>
                                        </Panel>
                                        <form onSubmit={handleSubmit(onCthulhuSubmit)}>
                                            <Row>
                                                <Col xs={12} md={2} lg={2}>
                                                    <ReduxFormGroup name="diceRoll" label="Dice"/>
                                                </Col>
                                                <Col xs={12} md={10} lg={10}>
                                                    <ReduxFormGroup name="messageBody" label="Message"/>
                                                </Col>
                                            </Row>
                                            <Button type="reset" href="/" onClick={reset}>Cancel</Button>
                                            <Button type="submit">Submit</Button>
                                        </form>
                                    </Tab>
                                    <Tab eventKey={2} title="Runequest">
                                        <Panel className="shadowPanel">
                                            <Panel.Heading>They see me rolling
                                                <Button bsSize="small" className="pull-right"
                                                        disabled={authorizationLevel === 1 ? false : true}
                                                        onClick={() => this.props.clearMessages()}>Clear all</Button>
                                            </Panel.Heading>
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
                                                    <ReduxFormGroup name="diceRoll" label="Dice"/>
                                                </Col>
                                                <Col xs={12} md={10} lg={10}>
                                                    <ReduxFormGroup name="messageBody" label="Message"/>
                                                </Col>
                                            </Row>
                                            <Button type="reset" href="/" onClick={reset}>Cancel</Button>
                                            <Button type="submit">Submit</Button>
                                        </form>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Grid>
                )
        }
    }
}

function mapStateToProps({auth, params, messages, cthulhuMessages}) {
    return {params, auth, messages, cthulhuMessages}
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: "messageForm"
})(DiceRoom))