import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import TextField from '../fields/TextField';
import RadioButton from '../fields/RadioButton';
import { Link } from 'react-router-dom';
import * as skills from '../characters/Skills';

const SkillField = ({ label, basic }) => {
  return (
    <Field key={label} component={TextField} type="text" label={label + " (" + basic + ")"} name={label} />
  );
}

class CharacterFormPageThree extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.previousPage = props.previousPage.bind(this)
  }

  renderFields(skills) {
    return (
    <div className="card-panel teal lighten-5">
      {this.addFields(skills)}
    </div>);
  }

  addFields(skills) {
    return ( _.map(skills, ({ label, basic }) => {
      return <SkillField key={label} label={label} basic={basic} />
    }));
  }

  additionalFields() {


  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col s4">
              <div className="card-panel teal lighten-2">
                Dexterity bonus: {this.props.character.bonuses.dexterityBonus}
              </div>
              {this.renderFields(skills.DEXTERITY_SKILLS)}
              <div className="card-panel teal lighten-2">
                Communication bonus: {this.props.character.bonuses.communicationBonus}
              </div>
              {this.renderFields(skills.COMMUNICATION_SKILLS)}
            </div>
            <div className="col s4">
              <div className="card-panel teal lighten-2">
                Knowledge bonus: {this.props.character.bonuses.knowledgeBonus}
              </div>
              {this.renderFields(skills.KNOWLEDGE_SKILLS)}
            </div>
            <div className="col s4">
              <div className="card-panel teal lighten-2">
                Manipulation bonus: {this.props.character.bonuses.manipulationBonus}
              </div>
              {this.renderFields(skills.MANIPULATION_SKILLS)}
              <div className="card-panel teal lighten-2">
                Perception bonus: {this.props.character.bonuses.perceptionBonus}
              </div>
              {this.renderFields(skills.PERCEPTION_SKILLS)}
              <div className="card-panel teal lighten-2">
                Stealth bonus: {this.props.character.bonuses.stealthBonus}
              </div>
              {this.renderFields(skills.STEALTH_SKILLS)}
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
