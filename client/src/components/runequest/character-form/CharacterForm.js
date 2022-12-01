import _ from 'lodash';
import React, { Component } from 'react'
import CharacterFormPageOne from './CharacterFormPageOne'
import CharacterFormPageTwo from './CharacterFormPageTwo'
import CharacterFormPageThree from './CharacterFormPageThree'
import CharacterFormPageFour from './CharacterFormPageFour'
import CharacterFormPageFive from './CharacterFormPageFive'
import CharacterFormPageSix from './CharacterFormPageSix'
import calculateBonuses from '../characters/StatBonuses'
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { Grid } from 'react-bootstrap';
import { reduxForm, Field } from "redux-form";

class CharacterForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
    const vara = _.get(this.props, 'match.params.characterId', "")
    vara && this.props.getOneChar(this.props.match.params.characterId);
  }
 
  nextPage(values) {
    if (this.state.page === 2) this.setState({ character: calculateBonuses(values.characteristics || {}) })
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const onSubmit = (values) => {
      this.props.createChar(values)
      this.props.history.push('/chars');
    };
    const { page } = this.state
    const { auth, oper } = this.props
    const authorizationLevel = auth && auth.authorizationLevel

    return (
      <Grid>
        {page === 1 && 
          <CharacterFormPageOne 
            onSubmit={this.nextPage} 
            oper={oper} 
            auth={authorizationLevel}
            />
          }
        {page === 2 && (
          <CharacterFormPageTwo
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            auth={authorizationLevel}
            oper={oper}
          />
        )}
        {page === 3 && (
          <CharacterFormPageThree
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            auth={authorizationLevel}
            oper={oper}
          />
        )}
        {page === 4 && (
          <CharacterFormPageFour
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            auth={authorizationLevel}
            oper={oper}
          />
        )}
        {page === 5 && (
          <CharacterFormPageFive
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
            auth={authorizationLevel}
            oper={oper}
          />
        )}
        {page === 6 && (
          <CharacterFormPageSix
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={onSubmit}
            auth={authorizationLevel}
            oper={oper}
          />
        )}
      </Grid>
    )
  }
}

function mapStateToProps({ selectedChar, auth }) {
  if(selectedChar) {
    return { initialValues: selectedChar.character, auth: auth }
  } else return { auth: auth };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: "characterForm"
})(CharacterForm));