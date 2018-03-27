import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Table, Panel, Button } from 'react-bootstrap';

const WeaponGroups = (skills, weapons, props) => {
  console.log(skills)
  console.log(weapons)

  return weapons.map(weapon => {
    const skill = _.find(skills, { 'skill': weapon.skill });
    return (<Panel key={weapon.skill}>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{weapon.skill.split(".")[1]}</th></tr>
          </thead>
          <tbody>
            <tr><td>attack:</td><td>{skill.attack}</td><td><Button disabled={!props.owner || !props.hasXp} bsSize="xsmall" onClick={() => props.weaponXpRoll(props.selectedChar.characterId, skill.skill, "attack")}>XP</Button></td></tr>
            <tr><td>parry:</td><td>{skill.parry}</td><td><Button disabled={!props.owner || !props.hasXp} bsSize="xsmall" onClick={() => props.weaponXpRoll(props.selectedChar.characterId, skill.skill, "parry")}>XP</Button></td></tr>
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
  console.log(props)
  if (props.weaponskills && props.weapons) {
    const weaponskills = props.weaponskills;
    const weapons = props.weapons;
    return (<div>
      {WeaponGroups(weaponskills, weapons, props)}
    </div>);
  } else {
    return <div />;
  }
});