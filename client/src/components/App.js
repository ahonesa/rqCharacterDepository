import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import CharacterListView from "./CharacterListView";
import CharacterDetailsView from "./CharacterDetailsView";
import CharacterForm from './character-form/CharacterForm';
import UserForm from './user-form/UserForm';
import DiceRoom from './dice-room/DiceRoom';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchParams();
  }

  render() {
    return (
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/chars" component={CharacterListView} />
            <Route exact path="/chars/:characterId" component={CharacterDetailsView} />
            <Route exact path="/chars/:characterId/update" component={AddPropsToRoute(CharacterForm, { oper: "update"})} />
            <Route exact path="/new_char" component={AddPropsToRoute(CharacterForm, { oper: "create"})} />
            <Route exact path="/user" component={UserForm} />
            <Route exact path="/diceroom" component={DiceRoom} />
          </div>
        </BrowserRouter>
    );
  }
}

const AddPropsToRoute = (WrappedComponent, passedProps)=>{
  return (
      class Route extends Component{
          render(){
              let props = Object.assign({}, this.props, passedProps)
              return  <WrappedComponent {...props} />
          }
      }
  )
}

export default connect(null, actions)(App);
