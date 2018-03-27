import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Button, Table, Panel } from 'react-bootstrap';


const SkillRows = (skills, props, bonus) => skills.map(skill => {
  return <tr key={skill.skill}><td>{skill.skill.split(".")[1]}</td><td>{parseInt(skill.value) + bonus}</td><td></td><td>
    <Button disabled={!props.owner || !props.hasXp} bsSize="xsmall" onClick={() => props.skillXpRoll(props.selectedChar.characterId, skill.skill)}>XP</Button></td></tr>
}
)

const SkillGroups = (group, props, bonus) => {
  const filtered = props.skills.filter(skill => {
    return (skill.skill.split(".")[0] === group)
  })
  return (
    <Panel>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{group}</th><th>{bonus}</th></tr>
          </thead>
          <tbody>
            {SkillRows(filtered, props, bonus)}
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
  );
}

const mapStateToProps = ({ selectedChar }) => {
  if (selectedChar) {
    return { selectedChar }
  } else return {};
}

export const SkillsPanelOne = connect(mapStateToProps, actions)((props) => {
  const bonuses = _.get(props, "bonuses.bonuses", {})
  if (props.skills && props.bonuses) {
    return (<div>
      {SkillGroups("dexterity", props, bonuses.dexterityBonus)}
      {SkillGroups("communication", props, bonuses.communicationBonus)}
      {SkillGroups("knowledge", props, bonuses.knowledgeBonus)}
    </div>);
  } else {
    return <div />;
  }
});

export const SkillsPanelTwo = connect(mapStateToProps, actions)((props) => {
  const bonuses = _.get(props, "bonuses.bonuses", {})
  if (props.skills) {
    return (<div>
      {SkillGroups("magic", props, bonuses.magicalBonus)}
      {SkillGroups("manipulation", props, bonuses.manipulationBonus)}
      {SkillGroups("perception", props, bonuses.perceptionBonus)}
      {SkillGroups("stealth", props, bonuses.stealthBonus)}
    </div>);
  } else {
    return <div />;
  }
});
