import _ from 'lodash';
import React from 'react';
import { Table, Panel } from 'react-bootstrap';


const SkillRows = (skills) => skills.map(skill => {
  console.log(skill)
  return <tr key={skill.skill}><td>{skill.skill.split(".")[1]}</td><td>{skill.value}</td></tr>
}
)

const SkillGroups = (group, skills) => {
  const filtered = skills.filter(skill => {
    return (skill.skill.split(".")[0] === group)
  })
  return (
    <Panel>
      <Panel.Body>
        <Table condensed responsive>
          <thead>
            <tr><th>{group}</th></tr>
          </thead>
          <tbody>
            {SkillRows(filtered)}
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
  );
}

export const SkillsPanelOne = (props) => {
  console.log(props)
  if (props.skills) {
    const skills = props.skills;
    return (<div>
      {SkillGroups("dexterity", skills)}
      {SkillGroups("communication", skills)}
      {SkillGroups("knowledge", skills)}
    </div>);
  } else {
    return <div />;
  }
}

export const SkillsPanelTwo = (props) => {
  console.log(props)
  if (props.skills) {
    const skills = props.skills;
    return (<div>
      {SkillGroups("magic", skills)}
      {SkillGroups("manipulation", skills)}
      {SkillGroups("perception", skills)}
      {SkillGroups("stealth", skills)}
    </div>);
  } else {
    return <div />;
  }
}
