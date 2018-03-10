import React, { Component } from 'react'
import CharacterFormPageOne from './CharacterFormPageOne'
import CharacterFormPageTwo from './CharacterFormPageTwo'
import CharacterFormPageThree from './CharacterFormPageThree'
import CharacterFormPageFour from './CharacterFormPageFour'
import CharacterFormPageFive from './CharacterFormPageFive'
import CharacterFormPageSix from './CharacterFormPageSix'
import calculateBonuses from '../characters/StatBonuses'
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Grid } from 'react-bootstrap';
import { reduxForm, Field } from "redux-form";
import { prepare } from "../characters/PrepareCharacter";

class CharacterForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
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
      prepare(values)
      this.props.createChar(values)
      this.props.history.push('/chars');
    };
    const { page } = this.state
    return (
      <Grid>
        {page === 1 && <CharacterFormPageOne onSubmit={this.nextPage} />}
        {page === 2 && (
          <CharacterFormPageTwo
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <CharacterFormPageThree
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 4 && (
          <CharacterFormPageFour
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 5 && (
          <CharacterFormPageFive
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 6 && (
          <CharacterFormPageSix
            character={this.state.character}
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </Grid>
    )
  }
}

export default connect(null, actions)(reduxForm({
  form: "characterForm"
})(CharacterForm));