import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field, FieldArray } from "redux-form";
import TextField from '../fields/TextField';
import RadioButton from '../fields/RadioButton';
import { Link } from 'react-router-dom';
import SKILLS from '../characters/Skills';

const SkillField = ({ label, basic, group }) => {
  return (
    <Field key={label} component={TextField} type="text" label={label + " (" + basic + ")"} name={group + "." + label} />
  );
}

class CharacterFormPageThree extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this)
    this.previousPage = props.previousPage.bind(this)
    this.additionalFields = this.additionalFields.bind(this)
    this.addRow = this.addRow.bind(this)
  }

  renderFields(skillGroup) {
    return (
      <div>
        <ul>{this.addFields(skillGroup)}</ul>
        {this.addRow(skillGroup)}
      </div>
    );
  }

  addFields(skillGroup) {
    return (_.map(SKILLS, (stuff) => {
      if (stuff.group === skillGroup) {
        return <li key={stuff.group + stuff.label}><SkillField {...stuff} /></li>
      } else return;
    }));
  }

  additionalFields(skillGroup) {
    const test = this.state.value
    const basic = parseInt(test.slice(test.indexOf("(") + 1, test.indexOf(")")))
    SKILLS.push({ label: this.state.value, basic: basic, group: skillGroup })
    this.setState({ value: "" });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  addRow(skillGroup) {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button type="button" className="teal btn-flat middle white-text" onClick={() => this.additionalFields(skillGroup)}>
          <i className="material-icons">add</i>
        </button>
      </div>
    );
  }

  render() {
    const { handleSubmit, reset } = this.props
    return (
      <div style={{padding: 30}}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col s4">
              <div className="card-panel teal lighten-2">
                Dexterity bonus: {this.props.character.bonuses.dexterityBonus}
              </div>
              {this.renderFields("dexterity")}
              <div style= {{marginTop: 30}} className="card-panel teal lighten-2">
                Communication bonus: {this.props.character.bonuses.communicationBonus}
              </div>
              {this.renderFields("communication")}
            </div>
            <div className="col s4">
              <div className="card-panel teal lighten-2">
                Knowledge bonus: {this.props.character.bonuses.knowledgeBonus}
              </div>
              {this.renderFields("knowledge")}
              <div style= {{marginTop: 30}} className="card-panel teal lighten-2">
                Magic bonus: {this.props.character.bonuses.magicalBonus}
              </div>
              {this.renderFields("magic")}
            </div>
            <div className="col s4">
              <div className="card-panel teal lighten-2">
                Manipulation bonus: {this.props.character.bonuses.manipulationBonus}
              </div>
              {this.renderFields("manipulation")}
              <div style= {{marginTop: 30}} className="card-panel teal lighten-2">
                Perception bonus: {this.props.character.bonuses.perceptionBonus}
              </div>
              {this.renderFields("perception")}
              <div style= {{marginTop: 30}} className="card-panel teal lighten-2">
                Stealth bonus: {this.props.character.bonuses.stealthBonus}
              </div>
              {this.renderFields("stealth")}
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
