import _ from 'lodash';
import React from 'react';
import { Table } from 'react-bootstrap';

export const Characteristics = (props) => {
  if (props.characteristics) {
    const characteristics = props.characteristics;
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
          <td>{characteristics.pow_max}</td>
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
}