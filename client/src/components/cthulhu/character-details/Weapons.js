import _ from 'lodash';
import React from 'react';
import * as actions from "../../../actions";
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


const WeaponGroups = (weapons, props, bonuses) => {

  return weapons.map(weapon => {
    const skill = _.find(props.skills, { 'skill': weapon.skill });
    const value = _.get(skill, "value", null)

    return (<Panel key={weapon._id}>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{weapon.weapon}</th><th/><th className="xpColumn"/></tr>
          </thead>
          <tbody>
          <tr><td>skill:</td><td/><td className="xpColumn"></td></tr>
          <tr><td>weapon :</td><td>{weapon.weapon}</td><td className="xpColumn"></td></tr>
          <tr><td>damage :</td><td>{weapon.damage}</td><td className="xpColumn"></td></tr>
          <tr><td>range  :</td><td>{weapon.range}</td><td className="xpColumn"></td></tr>
          <tr><td>attacks:</td><td>{weapon.attacks}</td><td className="xpColumn"></td></tr>
          <tr><td>ammo   :</td><td>{weapon.ammo}</td><td className="xpColumn"></td></tr>
          <tr><td>malfunc:</td><td>{weapon.malfunction}</td><td className="xpColumn"></td></tr>
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
  if (props.weapons) {
    const weapons = props.weapons;
    return (<div>
      {WeaponGroups(weapons, props, bonuses)}
    </div>);
  } else {
    return <div />;
  }
});