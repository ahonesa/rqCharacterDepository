import React, { Component } from 'react'
import CharacterFormPageOne from './CharacterFormPageOne'
import CharacterFormPageTwo from './CharacterFormPageTwo'
import CharacterFormPageThree from './CharacterFormPageThree'
import calculateBonuses from '../characters/StatBonuses'

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
    console.log(values)
    console.log(this.state)
    if(this.state.page === 2) this.setState( { character: calculateBonuses(values) } )
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    console.log(this.state)
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const onSubmit = (values) => (console.log(values));
    const { page } = this.state
    return (
      <div>
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
      </div>
    )
  }
}

export default CharacterForm
