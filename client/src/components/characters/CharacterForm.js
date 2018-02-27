import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CharacterFormPageOne from './CharacterFormPageOne'
import CharacterFormPageTwo from './CharacterFormPageTwo'

class CharacterForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 && <CharacterFormPageOne onSubmit={this.nextPage} />}
        {page === 2 && (
          <CharacterFormPageTwo
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </div>
    )
  }
}

CharacterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default CharacterForm