import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Table, Panel, Button, Badge } from 'react-bootstrap';
import './Weapons.css';

const xpBadge = (skillXp) => { 
  if(skillXp < 1) return;
  else return <Badge>{skillXp}</Badge>;
}

const xpButton = (characterId, skill, props) => {

    const xpEnabled = props.owner && (props.hasXp || skill.xp > 0) && props.xpRollsAllowed
    const xpAwardEnabled = props.isGM && !props.xpRollsAllowed && (skill.xp < 1 || !skill.xp)

    if(xpEnabled)
        return <Button bsSize="xsmall" onClick={() => props.weaponXpRoll(characterId, skill.skill)}>XP</Button>;
    else if(xpAwardEnabled)
        return <Button bsSize="xsmall" onClick={() => props.weaponXpAward(characterId, skill.skill)}>+1</Button>;
    else return;
}


const WeaponGroups = (skills, weapons, props, bonuses) => {

  return weapons.map(weapon => {
    const skill = _.find(skills, { 'skill': weapon.skill });
    const xp = _.get(skill, "xp", 0)
    const value = _.get(skill, "value", null)
    const xpEnabled = value && props.owner && (props.hasXp || xp > 0) && props.xpRollsAllowed

    return (<Panel key={weapon._id}>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{weapon.skill.split(".")[1]} {xpBadge(xp)}</th><th>{bonuses.manipulationModifier > 0? "+": ""}{bonuses.manipulationModifier}</th><th className="xpColumn"></th></tr>
          </thead>
          <tbody>
          <tr><td>skill:</td><td>{value && (parseInt(value) + bonuses.manipulationModifier)}</td><td className="xpColumn">{xpButton(props.selectedChar.characterId, skill, props)}</td></tr>
          <tr><td>weapon:</td><td>{weapon.weapon}</td><td className="xpColumn"></td></tr>
          <tr><td>damage:</td><td>{weapon.damage}</td><td className="xpColumn"></td></tr>
            <tr><td>sr:</td><td>{weapon.sr}</td><td className="xpColumn"></td></tr>
            <tr><td>armor:</td><td>{weapon.armor}</td><td className="xpColumn"></td></tr>
            <tr><td>type:</td><td>{weapon.weaponType}</td><td className="xpColumn"></td></tr>
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>);
  })
}

const mapStateToProps = ({ selectedChar }) => {
  if (selectedChar) {
    return { selectedChar }
  } else return {};
}

export const WeaponsPanel = connect(mapStateToProps, actions)((props) => {
  const bonuses = _.get(props, "bonuses.bonuses", {})
  if (props.weaponskills && props.weapons) {
    const weaponskills = props.weaponskills;
    const weapons = props.weapons;
    return (<div>
      {WeaponGroups(weaponskills, weapons, props, bonuses)}
    </div>);
  } else {
    return <div />;
  }
});