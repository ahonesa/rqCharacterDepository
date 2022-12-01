import _ from 'lodash';
import React from 'react';
import * as actions from "../../../actions";
import { connect } from 'react-redux';
import { Table, Button, Badge } from 'react-bootstrap';

const mapStateToProps = ({ selectedChar }) => {
  if (selectedChar) {
    return { selectedChar }
  } else return {};
}

const xpBadge = (skillXp) => {
    if(skillXp < 1) return;
    else return <Badge>{skillXp}</Badge>;
}

const xpButton = (characterId, powXpRolls, props) => {
    const xpEnabled = props.owner && (props.hasXp || powXpRolls > 0) && props.xpRollsAllowed
    const xpAwardEnabled = props.isGM && !props.xpRollsAllowed && (powXpRolls < 1 || !powXpRolls)

    if(xpEnabled)
        return <Button bsSize="xsmall" onClick={() => props.powXpRoll(characterId)}>XP</Button>;
    else if(xpAwardEnabled)
        return <Button bsSize="xsmall" onClick={() => props.powXpAward(characterId)}>+1</Button>;
    else return;
}

export const Characteristics = connect(mapStateToProps, actions)((props) => {
  if (props.characteristics && props.selectedChar) {
    const selectedChar = props.selectedChar;
    const characteristics = props.characteristics;
    const canInc = characteristics.pow < characteristics.pow_max
    const powXpRolls = _.get(characteristics, "powXpRolls", 0)
    const powXpEnabled = canInc && props.owner && powXpRolls > 0 && props.xpRollsAllowed

    return (<Table condensed responsive>
      <thead>
        <tr>
          <th>Char</th>
          <th>Org</th>
          <th>Cur</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>STR</td>
          <td>{characteristics.str_org}</td>
          <td>{characteristics.str}</td>
          <td>{characteristics.str_max}</td>
        </tr>
        <tr>
          <td>CON</td>
          <td>{characteristics.con_org}</td>
          <td>{characteristics.con}</td>
          <td>{characteristics.con_max}</td>
        </tr>
        <tr>
          <td>SIZ</td>
          <td>{characteristics.siz_org}</td>
          <td>{characteristics.siz}</td>
          <td>{characteristics.siz_max}</td>
        </tr>
        <tr>
          <td>INT</td>
          <td>{characteristics.int_org}</td>
          <td>{characteristics.int}</td>
          <td>{characteristics.int_max}</td>
        </tr>
        <tr>
          <td>POW</td>
          <td>{characteristics.pow_org}</td>
          <td>{characteristics.pow}</td>
          <td>{characteristics.pow_max}
              {xpBadge(powXpRolls)}
              {xpButton(selectedChar.characterId, powXpRolls, props)}</td>
        </tr>
        <tr>
          <td>DEX</td>
          <td>{characteristics.dex_org}</td>
          <td>{characteristics.dex}</td>
          <td>{characteristics.dex_max}</td>
        </tr>
        <tr>
          <td>CHA</td>
          <td>{characteristics.cha_org}</td>
          <td>{characteristics.cha}</td>
          <td>{characteristics.cha_max}</td>
        </tr>
      </tbody>
    </Table>);
  } else {
    return;
  }
})