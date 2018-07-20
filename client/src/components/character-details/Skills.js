import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Button, Table, Panel, Badge } from 'react-bootstrap';
import './Skills.css';

const SkillRows = (skills, props, bonus) => skills.map(skill => {
  const xpEnabled = props.owner && (props.hasXp || skill.xp > 0) && props.xpRollsAllowed
  return <tr key={skill.skill}><td>{skill.skill.split(".")[1] || ""}</td><td className="skillValueColumn">{parseInt(skill.value) + bonus} {xpBadge(skill.xp)}</td><td className="xpColumn">
    <Button disabled={!xpEnabled} bsSize="xsmall" onClick={() => props.skillXpRoll(props.selectedChar.characterId, skill.skill)}>XP</Button></td></tr>
})

const xpBadge = (skillXp) => { 
  if(skillXp < 1) return;
  else return <Badge>{skillXp}</Badge>;
}

const SkillGroups = (group, props, bonus) => {
  const filtered = props.skills.filter(skill => {
    return (skill.skill.split(".")[0] === group)
  })
  return (
    <Panel>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{group}</th><th className="skillValueColumn">{bonus > 0? "+": ""}{bonus}</th><th className="xpColumn"></th></tr>
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
      {SkillGroups("dexterity", props, bonuses.agilityModifier)}
      {SkillGroups("communication", props, bonuses.communicationModifier)}
      {SkillGroups("knowledge", props, bonuses.knowledgeModifier)}
      {SkillGroups("rune", props, 0)}
      {SkillGroups("passion", props, 0)}
    </div>);
  } else {
    return <div />;
  }
});

export const SkillsPanelTwo = connect(mapStateToProps, actions)((props) => {
  const bonuses = _.get(props, "bonuses.bonuses", {})
  if (props.skills) {
    return (<div>
      {SkillGroups("magic", props, bonuses.magicModifier)}
      {SkillGroups("manipulation", props, bonuses.manipulationModifier)}
      {SkillGroups("perception", props, bonuses.perceptionModifier)}
      {SkillGroups("stealth", props, bonuses.stealthModifier)}
    </div>);
  } else {
    return <div />;
  }
});
