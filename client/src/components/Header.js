import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import * as actions from "../actions"

class Header extends Component {
    renderContent() {
        console.log("HEADER PROPS: " + this.props.selectedChar)

        const cthulhu = this.props.selectedCthulhuChar ? "/cthulhu/chars/" + this.props.selectedCthulhuChar.characterId : "/cthulhu/chars"

        const char = this.props.selectedChar ? "/chars/" + this.props.selectedChar.characterId : "/chars"

        console.log("CTHULHU: " + cthulhu)
        console.log("CHAR: " + char)

        switch (this.props.auth) {
            case null:
                return
            case false:
                return (
                    <Nav pullRight>
                        <NavItem eventKey={6} href="/auth/google">Login with Google</NavItem>
                    </Nav>
                )
            default:
                return (
                    <Nav pullRight>
                        <LinkContainer to={cthulhu} activeHref="active">
                            <NavItem eventKey={2}>Cthulhu</NavItem>
                        </LinkContainer>
                        <LinkContainer to={char} activeHref="active">
                            <NavItem eventKey={3}>RuneQuest</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/diceroom" activeHref="active">
                            <NavItem eventKey={4}>Dice Room</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/user" activeHref="active">
                            <NavItem eventKey={5}>User</NavItem>
                        </LinkContainer>
                        <NavItem onClick={this.props.logout} eventKey={6}>Logout</NavItem>
                    </Nav>
                )
        }

    }

    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to={this.props.auth ? "/chars" : "/"}>
                            <a href="#">Character Deposit</a>
                        </LinkContainer>
                    </Navbar.Brand>
                </Navbar.Header>
                {this.renderContent()}
            </Navbar>
        )
    }
}

function mapStateToProps({auth, selectedChar}) {
    return {auth, selectedChar}
}

export default connect(mapStateToProps, actions, null, {pure: false})(Header)