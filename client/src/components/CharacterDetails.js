import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

const CharacterDetails = ({char}) => {
  switch(char) {
    case null:
      return (<div>
        <span>Loading</span>
      </div>);  
    default:
      return (
        <Panel>
          Character details here


        </Panel>  
      );
    }

}

export default CharacterDetails
