import _ from 'lodash';
import React from 'react';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';


export const Characteristics = connect(null, actions)((props) => {

  const hasXpForPowGain = props.xp > 2
  if (props.characteristics) {
    const characteristics = props.characteristics;
    const canInc = characteristics.pow < characteristics.pow_max
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
          <Button disabled={!canInc || !props.owner || !hasXpForPowGain} bsSize="xsmall" onClick={() => props.powXpRoll(props.selectedChar.characterId)}>XP</Button></td>
        </tr>
        <tr>
          <td>DEX</td>
          <td>{characteristics.dex_org}</td>
          <td>{characteristics.dex}</td>
          <td>{characteristics.dex_max}</td>
        </tr>
        <tr>
          <td>APP</td>
          <td>{characteristics.app_org}</td>
          <td>{characteristics.app}</td>
          <td>{characteristics.app_max}</td>
        </tr>
      </tbody>
    </Table>);
  } else {
    return;
  }
})