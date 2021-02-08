import _ from 'lodash';
import React from 'react';
import * as actions from "../../../actions";
import { connect } from 'react-redux';
import { Button, Table, Panel, Badge } from 'react-bootstrap';
import './Skills.css';

const SkillRows = (props, bonus) => {
    console.log(props.skills)
    Object.keys(props.skills).map(skill => {
        return (<tr key={skill}>
            <td>skill</td>
            <td className="skillValueColumn">{props.skills.value} {xpBadge(props.skills.xp)}</td>
            <td className="xpColumn">{xpButton(props.selectedCthulhuChar.characterId, skill, props)}</td>
        </tr>)
    })
}

const xpButton = (characterId, skill, props) => {

    const xpEnabled = props.owner && (props.hasXp || skill.xp > 0) && props.xpRollsAllowed
    const xpAwardEnabled = props.isGM && !props.xpRollsAllowed && (skill.xp < 1 || !skill.xp)
        
    if(xpEnabled)
        return <Button bsSize="xsmall" onClick={() => props.skillXpRoll(characterId, skill.skill)}>XP</Button>;
    else if(xpAwardEnabled)
        return <Button bsSize="xsmall" onClick={() => props.skillXpAward(characterId, skill.skill)}>+1</Button>;
    else return;
}

const xpBadge = (skillXp) => { 
  if(skillXp && skillXp > 0) return <Badge>{skillXp}</Badge>;
}

const SkillGroups = (props, bonus) => {
  return (
    <Panel>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>Skills</th><th className="skillValueColumn"></th><th className="xpColumn"></th></tr>
          </thead>
          <tbody>
            {SkillRows(props, bonus)}
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
  );
}

const mapStateToProps = ({ selectedCthulhuChar }) => {
  if (selectedCthulhuChar) {
    return { selectedCthulhuChar }
  } else return {};
}

export const SkillsPanelOne = connect(mapStateToProps, actions)((props) => {
  const bonuses = _.get(props, "bonuses.bonuses", {})
  if (props.skills && props.bonuses) {
    return (<div>
      {SkillGroups(props, 0)}
    </div>);
  } else {
    return <div />;
  }
});

