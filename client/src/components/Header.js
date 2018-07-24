import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as actions from "../actions";
import styles from "./common.css";

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Nav pullRight>
            <NavItem eventKey={5} href="/auth/google">Login with Google</NavItem>
          </Nav>
        );
      default:
        return (
        <Nav pullRight>
          <LinkContainer to="/chars" activeHref="active">
            <NavItem eventKey={2}>Characters</NavItem>
          </LinkContainer>
          <NavItem eventKey={3}>Diceroom</NavItem>
          <LinkContainer to="/user" activeHref="active">
            <NavItem eventKey={4}>User</NavItem>
          </LinkContainer>
          <NavItem onClick={this.props.logout} eventKey={4}>Logout</NavItem>
        </Nav>
        );
    }

  }

  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={this.props.auth ? "/chars" : "/"} >
              <a href="#">RQG Character Deposit</a>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>  
        {this.renderContent()}
      </Navbar>  
    )
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps, actions, null, { pure: false })(Header);