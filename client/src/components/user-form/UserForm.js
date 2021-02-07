import React, {Component} from "react";
import {reduxForm} from "redux-form";
import * as actions from "../../actions";
import {connect} from "react-redux";
import {Button, Col, Grid, Row} from "react-bootstrap";
import {ReduxFormGroup} from '../fields/Fields'


class UserForm extends Component {
    componentDidMount() {
        this.props.fetchParams()
    }

    render() {

        const authorizationLevel = this.props.auth && this.props.auth.authorizationLevel
        const xpRollsAllowed = this.props.params && this.props.params.xpRollsAllowed
        console.log(xpRollsAllowed)

        const {handleSubmit, reset} = this.props

        const onSubmit = (values) => {
            this.props.updateUser(values.userName)
        };

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={4} lg={12}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ReduxFormGroup name="userName" label="Username:"/>
                            <Button type="reset" href="/" onClick={reset}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </form>
                        <p>XP Rolls Allowed = {xpRollsAllowed ? "yes" : "nope"}</p>
                        <Button disabled={authorizationLevel === 1 ? false : true}
                                onClick={() => this.props.toggleXpRollsAllowed()}>Toggle XP Rolls Allowed</Button>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps({auth, params}) {
    return {initialValues: auth, params, auth}
}

export default connect(mapStateToProps, actions)(reduxForm({
    form: "userForm"
})(UserForm));