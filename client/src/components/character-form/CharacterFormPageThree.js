import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import TextField from '../fields/TextField';
import RadioButton from '../fields/RadioButton';
import { Link } from 'react-router-dom';

const DEXTERITY_SKILLS = [
  { label: "Swim", basic: 10 },
  { label: "Ride", basic: 20 }
]

const SkillField = ({ label, basic }) => {
  return (
    <div className="row">
      <div className="col s4">
        <Field key={label} component={TextField} type="text" label={label+" (" + basic + ")"} name={label} />
      </div>
    </div>
  );
}


class CharacterFormPageThree extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.previousPage = props.previousPage.bind(this)
  }

  renderDexterityFields() {
    return _.map(DEXTERITY_SKILLS, ({label, basic}) => {
      return <SkillField key={label} label={label} basic={basic} /> 
    });
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col s4">
              <div>
                Dexterity bonus: {this.props.character.bonuses.dexterityBonus}
              </div>             
              {this.renderDexterityFields()}
            </div>
            <div className="col s4">
              <div>
                Dexterity bonus: {this.props.character.bonuses.dexterityBonus}
              </div>             
              {this.renderDexterityFields()}
            </div>
            <div className="col s4">
              <div>
                Dexterity bonus: {this.props.character.bonuses.dexterityBonus}
              </div>             
              {this.renderDexterityFields()}
            </div>
          </div>
          <Link to="/chars" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="button" className="teal btn-flat middle white-text previous" onClick={this.previousPage}>
            Previous
          </button>
          <button type="submit" className="teal teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>);
  }
}

export default reduxForm({
  form: "characterForm",
  destroyOnUnmount: false, 
  forceUnregisterOnUnmount: true
})(CharacterFormPageThree);
