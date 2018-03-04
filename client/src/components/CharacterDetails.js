import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CharacterDetails = ({char}) => {
  console.log(char);
  switch(char) {
    case null:
      return (<div>
        <span>Loading</span>
      </div>);  
    default:
      return (
        <div className="row">
          <img src="https://drive.google.com/open?id=1QGznNQZZtXx8RhH3ef-hbtix57oD4knd"/>
        </div>  
      );
    }

}

export default CharacterDetails
