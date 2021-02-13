import _ from 'lodash';
import React from 'react';
import * as actions from "../../../actions";
import { connect } from 'react-redux';
import { Button, Table, Panel, Badge } from 'react-bootstrap';
import './Skills.css';
import {BASE_SKILLS} from '../characters/Skills';

const skillRows = (props) => {
    if(props.panelNbr === 1) {
        return Object.keys(props.skills).slice(0, 20).map(skill => {
            const base = _.find(BASE_SKILLS, {'name': skill})
            const xp = props.skills[skill].xp || 0
            return (<tr key={skill}>
                <td>{base.label}</td>
                <td className="skillValueColumn">{props.skills[skill].value} {xpBadge(xp)}</td>
                <td className="xpColumn">{xpButton(props.selectedCthulhuChar.character.characterId, skill, xp, props)}</td>
            </tr>)
        })
    } else {
        return Object.keys(props.skills).slice(20).map(skill => {
            const base = _.find(BASE_SKILLS, {'name': skill})
            const xp = props.skills[skill].xp || 0
            return (<tr key={skill}>
                <td>{base.label}</td>
                <td className="skillValueColumn">{props.skills[skill].value} {xpBadge(xp)}</td>
                <td className="xpColumn">{xpButton(props.selectedCthulhuChar.character.characterId, skill, xp, props)}</td>
            </tr>)
        })
    }
}

const additionalSkillRows = (props) => {
    return props.additionalSkills.map(skill => {
        return (<tr key={skill.name}>
            <td>{skill.label}</td>
            <td className="skillValueColumn">{skill.value} {xpBadge(skill.xp)}</td>
            <td className="xpColumn">{xpButton(props.selectedCthulhuChar.character.characterId, skill.name, skill.xp, props)}</td>
        </tr>)
    })
}

const xpButton = (characterId, skill, xp, props) => {

    const xpEnabled = props.owner && xp > 0 && props.xpRollsAllowed
    const xpAwardEnabled = props.isGM && !props.xpRollsAllowed && xp < 1

    if(xpEnabled)
        return <Button bsSize="xsmall" onClick={() => props.cthulhuSkillXpRoll(characterId, skill)}>XP</Button>;
    else if(xpAwardEnabled)
        return <Button bsSize="xsmall" onClick={() => props.cthulhuSkillXpAward(characterId, skill)}>+1</Button>;
    else return;
}

const xpBadge = (skillXp) => { 
  if(skillXp && skillXp > 0) return <Badge>{skillXp}</Badge>;
}

const SkillPanel = (props) => {
  return (
    <Panel>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>Skills</th><th className="skillValueColumn"></th><th className="xpColumn"></th></tr>
          </thead>
          <tbody>
            {skillRows(props)}
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
  );
}

const AdditionalSkillPanel = (props) => {
    return (
        <Panel>
            <Panel.Body>
                <Table condensed responsive>
                    <thead>
                    <tr><th>Skills</th><th className="skillValueColumn"></th><th className="xpColumn"></th></tr>
                    </thead>
                    <tbody>
                    {additionalSkillRows(props)}
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

export const SkillsPanel = connect(mapStateToProps, actions)((props) => {
  if (props.skills) {
    return (<div>
      {SkillPanel(props)}
    </div>);
  } else {
    return <div />;
  }
});

export const AdditionalSkillsPanel = connect(mapStateToProps, actions)((props) => {
    if (props.additionalSkills) {
        return (<div>
            {AdditionalSkillPanel(props)}
        </div>);
    } else {
        return <div />;
    }
});

