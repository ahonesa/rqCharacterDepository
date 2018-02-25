import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import CharacterListView from "./CharacterListView";
import CharacterDetailsView from "./CharacterDetailsView";

const CharacterNew = () => <h2>CharacterNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/chars" component={CharacterListView} />
            <Route exact path="/chars/:characterId" component={CharacterDetailsView} />
            <Route exact path="/new" component={CharacterNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
