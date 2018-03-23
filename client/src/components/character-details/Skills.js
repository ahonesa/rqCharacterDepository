import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Button, Table, Panel } from 'react-bootstrap';


const SkillRows = (skills, props) => skills.map(skill => {
  console.log(skill)
  return <tr key={skill.skill}><td>{skill.skill.split(".")[1]}</td><td>{skill.value}</td><td></td><td>
    
    <Button bsSize="xsmall" onClick={() => props.skillXpRoll(props.selectedChar.characterId, skill.skill)}>XP</Button></td></tr>
}
)

const SkillGroups = (group, skills, props) => {
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
            {SkillRows(filtered, props)}
          </tbody>
        </Table>
      </Panel.Body>
    </Panel>
  );
}

const mapStateToProps = ({ selectedChar }) => {
  if(selectedChar) {
    return { selectedChar }
  } else return {};
}

export const SkillsPanelOne = connect(mapStateToProps, actions)((props) => {
  console.log(props)
  if (props.skills) {
    const skills = props.skills;
    return (<div>
      {SkillGroups("dexterity", skills, props)}
      {SkillGroups("communication", skills, props)}
      {SkillGroups("knowledge", skills, props)}
    </div>);
  } else {
    return <div />;
  }
});

export const SkillsPanelTwo = connect(mapStateToProps, actions)((props) => {
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
});
