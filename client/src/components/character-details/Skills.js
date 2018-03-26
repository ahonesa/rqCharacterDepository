import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Button, Table, Panel } from 'react-bootstrap';


const SkillRows = (skills, props) => skills.map(skill => {
  console.log(skill)
  return <tr key={skill.skill}><td>{skill.skill.split(".")[1]}</td><td>{skill.value}</td><td></td><td>
    <Button disabled={!props.owner} bsSize="xsmall" onClick={() => props.skillXpRoll(props.selectedChar.characterId, skill.skill)}>XP</Button></td></tr>
}
)

const SkillGroups = (group, props) => {
  const filtered = props.skills.filter(skill => {
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
  if (selectedChar) {
    return { selectedChar }
  } else return {};
}

export const SkillsPanelOne = connect(mapStateToProps, actions)((props) => {
  console.log(props)
  if (props.skills) {
    return (<div>
      {SkillGroups("dexterity", props)}
      {SkillGroups("communication", props)}
      {SkillGroups("knowledge", props)}
    </div>);
  } else {
    return <div />;
  }
});

export const SkillsPanelTwo = connect(mapStateToProps, actions)((props) => {
  console.log(props)
  if (props.skills) {
    return (<div>
      {SkillGroups("magic", props)}
      {SkillGroups("manipulation", props)}
      {SkillGroups("perception", props)}
      {SkillGroups("stealth", props)}
    </div>);
  } else {
    return <div />;
  }
});
