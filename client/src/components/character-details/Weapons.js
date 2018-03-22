import _ from 'lodash';
import React from 'react';
import { Table, Panel } from 'react-bootstrap';

const WeaponGroups = (skills, weapons) => {
  console.log(skills)
  console.log(weapons)

  return skills.map(skill => {
    return (<Panel key={skill.skill}>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{skill.skill.split(".")[1]}</th></tr>
          </thead>
          <tbody>
            <tr><td>attack:</td></tr>
            <tr><td>parry:</td></tr>
            <tr><td>weapon:</td></tr>
            <tr><td>damage:</td></tr>
            <tr><td>sr:</td></tr>
            <tr><td>armor:</td></tr>
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>);
  })
}

export const WeaponsPanel = (props) => {
  console.log(props)
  if (props.weaponskills && props.weapons) {
    const weaponskills = props.weaponskills;
    const weapons = props.weapons;
    return (<div>
      {WeaponGroups(weaponskills, weapons)}
    </div>);
  } else {
    return <div />;
  }
}