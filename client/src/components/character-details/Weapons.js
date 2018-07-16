import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Table, Panel, Button, Badge } from 'react-bootstrap';

const xpBadge = (skillXp) => { 
  if(skillXp < 1) return;
  else return <Badge>{skillXp}</Badge>;
}

const WeaponGroups = (skills, weapons, props, bonuses) => {

  return weapons.map(weapon => {
    const skill = _.find(skills, { 'skill': weapon.skill });
    const xp = _.get(skill, "xp", 0)
    const value = _.get(skill, "value", null)
    const hasXp = props.hasXp || xp > 0

    return (<Panel key={weapon.skill}>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{weapon.skill.split(".")[1]} {xpBadge(xp)}</th><th>A: {bonuses.manipulationModifier > 0? "+": ""}{bonuses.manipulationModifier}</th><th>P: {bonuses.agilityModifier > 0? "+": ""}{bonuses.agilityModifier}</th></tr>
          </thead>
          <tbody>
            <tr><td>skill:</td><td>{value && (parseInt(value) + bonuses.manipulationModifier)}</td><td><Button disabled={!value || !props.owner || !hasXp} bsSize="xsmall" onClick={() => props.weaponXpRoll(props.selectedChar.characterId, skill.skill)}>XP</Button></td></tr>
            <tr><td>weapon:</td><td>{weapon.weapon}</td></tr>
            <tr><td>damage:</td><td>{weapon.damage}</td></tr>
            <tr><td>sr:</td><td>{weapon.sr}</td></tr>
            <tr><td>armor:</td><td>{weapon.armor}</td></tr>
            <tr><td>type:</td><td>{weapon.weaponType}</td></tr>
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