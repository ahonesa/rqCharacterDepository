import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
          <NavItem eventKey={1} href="/chars">Characters</NavItem> 
          <NavItem eventKey={2} href="/diceroom">Diceroom</NavItem>  
          <NavItem eventKey={3} href="/user">User</NavItem>
          <NavItem eventKey={4} href="/api/logout">Logout</NavItem>
        </Nav>
        );
    }

  }

  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={this.props.auth ? "/chars" : "/"} >
              RQG Character Deposit
            </Link>
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

export default connect(mapStateToProps)(Header);