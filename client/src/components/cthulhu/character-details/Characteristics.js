import React from 'react';
import * as actions from "../../../actions";
import {connect} from 'react-redux';
import {Badge, Button, Table} from 'react-bootstrap';

const mapStateToProps = ({selectedCthulhuChar}) => {
    if (selectedCthulhuChar) {
        return {selectedCthulhuChar}
    } else return {};
}

const xpBadge = (skillXp) => {
    if (skillXp < 1) return;
    else return <Badge>{skillXp}</Badge>;
}

const xpButton = (characterId, powXpRolls, props) => {

    console.log(props)

    const xpEnabled = props.owner && (props.hasXp || powXpRolls > 0) && props.xpRollsAllowed
    const xpAwardEnabled = props.isGM && !props.xpRollsAllowed && (powXpRolls < 1 || !powXpRolls)

    if (xpEnabled)
        return <Button bsSize="xsmall" onClick={() => props.powXpRoll(characterId)}>XP</Button>;
    else if (xpAwardEnabled)
        return <Button bsSize="xsmall" onClick={() => props.powXpAward(characterId)}>+1</Button>;
    else return;
}

export const Characteristics = connect(mapStateToProps, actions)((props) => {
    if (props.bonuses && props.bonuses.characteristics) {
        const characteristics = props.bonuses.characteristics
        return (<Table condensed responsive>
            <thead>
            <tr>
                <th>Char</th>
                <th>Org</th>
                <th>Cur</th>
                <th>Half</th>
                <th>Fifth</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>STR</td>
                <td>{characteristics.STR.original}</td>
                <td>{characteristics.STR.current}</td>
                <td>{characteristics.STR.half}</td>
                <td>{characteristics.STR.fifth}</td>
            </tr>
            <tr>
                <td>DEX</td>
                <td>{characteristics.DEX.original}</td>
                <td>{characteristics.DEX.current}</td>
                <td>{characteristics.DEX.half}</td>
                <td>{characteristics.DEX.fifth}</td>
            </tr>
            <tr>
                <td>INT</td>
                <td>{characteristics.INT.original}</td>
                <td>{characteristics.INT.current}</td>
                <td>{characteristics.INT.half}</td>
                <td>{characteristics.INT.fifth}</td>
            </tr>
            <tr>
                <td>CON</td>
                <td>{characteristics.CON.original}</td>
                <td>{characteristics.CON.current}</td>
                <td>{characteristics.CON.half}</td>
                <td>{characteristics.CON.fifth}</td>
            </tr>
            <tr>
                <td>APP</td>
                <td>{characteristics.APP.original}</td>
                <td>{characteristics.APP.current}</td>
                <td>{characteristics.APP.half}</td>
                <td>{characteristics.APP.fifth}</td>
            </tr>
            <tr>
                <td>POW</td>
                <td>{characteristics.POW.original}</td>
                <td>{characteristics.POW.current}</td>
                <td>{characteristics.POW.half}</td>
                <td>{characteristics.POW.fifth}</td>
            </tr>
            <tr>
                <td>SIZ</td>
                <td>{characteristics.SIZ.original}</td>
                <td>{characteristics.SIZ.current}</td>
                <td>{characteristics.SIZ.half}</td>
                <td>{characteristics.SIZ.fifth}</td>
            </tr>
            <tr>
                <td>EDU</td>
                <td>{characteristics.EDU.original}</td>
                <td>{characteristics.EDU.current}</td>
                <td>{characteristics.EDU.half}</td>
                <td>{characteristics.EDU.fifth}</td>
            </tr>
            </tbody>
        </Table>);
    } else {
        return <Table/>;
    }
})