import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import CharacterListView from "./CharacterListView";
import CharacterDetailsView from "./CharacterDetailsView";
import CharacterForm from './character-form/CharacterForm';
import UserForm from './user-form/UserForm'
import { Grid } from 'react-bootstrap';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/chars" component={CharacterListView} />
            <Route exact path="/chars/:characterId" component={CharacterDetailsView} />
            <Route exact path="/new_char" component={CharacterForm} />
            <Route exact path="/user" component={UserForm} />
          </div>
        </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
