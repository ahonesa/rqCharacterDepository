import React, { Component } from 'react';
import CharacterFormPageOne from './CharacterFormPageOne';

class CharacterNew extends Component {
  render() {
    return(
      <div>
        <CharacterFormPageOne />
      </div>
    )
  }
}

function mapStateToProps({selectedChar}) {
  return { selectedChar }
}

export default CharacterNew;