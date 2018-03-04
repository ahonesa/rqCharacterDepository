import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <ul className="right">
          <li><a href="/auth/google">Login with Google</a></li>
          </ul>
        );
      default:
        return (
        <ul className="right">
        <li><Link to="/chars">Characters</Link></li> 
        <li><Link to="/diceroom">Diceroom</Link></li>  
        <li><Link to="/user">User</Link></li>
        <li><a href="/api/logout">Logout</a></li>
        </ul>
        );
    }

  }
  

//       <img src='https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50' className="circle" />  
  render() {
    return(
      <nav>
        <div className="nav-wrapper">
          <Link 
            to={this.props.auth ? "/chars" : "/"} 
            className="left brand-logo"
          >
            RQ Character Deposit
          </Link>
          {this.renderContent()}
        </div>  
      </nav>  
    )
  }
}

function mapStateToProps({auth}) {
  return { auth }
}

export default connect(mapStateToProps)(Header);