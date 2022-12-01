import _ from 'lodash'
import React, {Component} from "react"
import * as actions from "../../actions"
import {connect} from "react-redux"
import {Col, Panel, Row, Table} from "react-bootstrap"
import calculateBonuses from './characters/StatBonuses'
import '../common.css'

class CharacterStuff extends Component {

    ItemRows = (stuff) => {
        return (stuff.map(item => {
            return <tr key={item._id}>
                <td>{item.item || ""}</td>
                <td>{item.weight || ""}</td>
            </tr>
        }))
    }

    EncounterRows = (encounters) => {
        return (encounters.map(item => {
            return <tr key={item._id}>
                <td>{item.entity || ""}</td>
                <td>{item.sanity_loss || ""}</td>
                <td>{item.total || ""}</td>
            </tr>
        }))
    }

    SpellRows = (spells) => {
        return (spells.map(item => {
            return <tr key={item._id}>
                <td>{item.spell || ""}</td>
                <td>{item.cost || ""}</td>
                <td>{item.cast_time || ""}</td>
            </tr>
        }))
    }

    render() {
        const {char, auth} = this.props

        const c = _.get(char, "character", {})
        const ownerId = _.get(char, "ownerId", {})
        const characteristics = _.get(char, "character.characteristics", {})
        const spells = _.get(char, "character.spells", [])
        const bonuses = characteristics && calculateBonuses(characteristics)
        const stuff = _.get(char, "character.stuff", [])
        const encounters = _.get(char, "character.encounters", [])
        const userId = auth && auth.googleId
        const isOwner = ownerId === userId

        return (
            <Panel bsSize="small">
                <Panel.Heading componentClass="h4" style={{marginTop: "0px"}}>{char && char.characterId}</Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <Panel className="shadowPanel">
                                <Panel.Heading>Items</Panel.Heading>
                                <Panel.Body>
                                    <Table condensed responsive>
                                        <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Weight</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.ItemRows(stuff)}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Panel className="shadowPanel">
                                <Panel.Heading>Other Stuff</Panel.Heading>
                                <Panel.Body>
                                    <Table condensed responsive>
                                        <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Money:</td>
                                            <td>{c.money || ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Spending level:</td>
                                            <td>{c.spending_level || ""}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6} lg={6}>
                            <Panel className="shadowPanel">
                                <Panel.Heading>Encounters</Panel.Heading>
                                <Panel.Body>
                                    <Table condensed responsive>
                                        <thead>
                                        <tr>
                                            <th>Encounter</th>
                                            <th>Sanity Loss</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.EncounterRows(encounters)}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                        <Col xs={12} md={6} lg={6}>
                            <Panel className="shadowPanel">
                                <Panel.Heading>Spells</Panel.Heading>
                                <Panel.Body>
                                    <Table condensed responsive>
                                        <thead>
                                        <tr>
                                            <th>Spell</th>
                                            <th>Cost</th>
                                            <th>Cast Time</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.EncounterRows(encounters)}
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        )
    }
}

export const SpellsPanel = connect(mapStateToProps, actions)((props) => {
    if (props.spells && props.bonuses) {
        return (<div>
            {SpellGroups(props)}
        </div>)
    } else {
        return <div/>
    }
})

const SpellGroups = (props) => {

    let grText = ""

    return (
        <Panel>
            <Panel.Body>
                <Table condensed responsive>
                    <thead>
                    <tr>
                        <th>{grText}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {SpellRows(props.spells)}
                    </tbody>
                </Table>
            </Panel.Body>
        </Panel>
    )
}


const SpellRows = (spells, bonus) => {
    return (spells.map(spell => {
        return <tr key={spell._id}>
            <td>{spell.spell || ""}</td>
            <td>{spell.cost || ""}</td>
            <td>{spell.cast_time || ""}</td>
        </tr>
    }))
}


function mapStateToProps({selectedCthulhuChar}) {
    if (selectedCthulhuChar) {
        return {selectedCthulhuChar: selectedCthulhuChar}
    } else return {}
}

export default connect(mapStateToProps, actions)(CharacterStuff)
