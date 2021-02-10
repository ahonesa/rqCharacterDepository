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

    render() {
        const onSubmit = (values) => {
            this.props.createChar(values)
        }
        const {char, auth} = this.props

        const c = _.get(char, "character", {})
        const ownerId = _.get(char, "ownerId", {})
        const characteristics = _.get(char, "character.characteristics", {})
        const spells = _.get(char, "character.spells", [])
        const bonuses = characteristics && calculateBonuses(characteristics)
        const stuff = _.get(char, "character.stuff", [])
        const armor = _.get(char, "character.armor", [])
        const authorizationLevel = auth && auth.authorizationLevel
        const userId = auth && auth.googleId
        const isOwner = ownerId === userId

        return (
            <Panel bsSize="small">
                <Panel.Heading componentClass="h4" style={{marginTop: "0px"}}>{char && char.characterId}</Panel.Heading>
                <Panel.Body>
                    <Row>
                        <Col xs={12} md={4} lg={4}>
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
                        <Col xs={12} md={8} lg={8}>
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
                                            <td>Hides of Land:</td>
                                            <td>{c.hidesOfLand || ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Flocks of Herd:</td>
                                            <td>{c.flocksOfHerd || ""}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} lg={4}>
                            <Panel className="shadowPanel">
                                <Panel.Heading>Spells</Panel.Heading>
                                <Panel.Body>
                                    <SpellsPanel spells={spells} bonuses={bonuses} owner={isOwner}/>
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
    const bonuses = _.get(props, "bonuses.bonuses", {})
    if (props.spells && props.bonuses) {
        return (<div>
            {SpellGroups("rune", props, bonuses.magicModifier)}
            {SpellGroups("spirit", props, bonuses.magicModifier)}
            {SpellGroups("sorcery", props, bonuses.magicModifier)}
        </div>)
    } else {
        return <div/>
    }
})

const SpellGroups = (group, props, bonus) => {
    const filtered = props.spells.filter(spell => {
        return (spell.spelltype === group)
    })

    let grText = ""
    switch (group) {
        case "spirit":
            grText = "Spirit magic"
            break
        case "rune":
            grText = "Rune magic"
            break
        case "sorcery":
            grText = "Sorcery"
            break
        default:
            grText = group
    }

    return (
        <Panel>
            <Panel.Body>
                <Table condensed responsive>
                    <thead>
                    <tr>
                        <th>{grText}</th>
                        <th></th>
                        <th className="skillValueColumn">{bonus > 0 ? "+" : ""}{bonus}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {SpellRows(filtered, bonus)}
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
            <td>{spell.rank || ""}</td>
            <td>{parseInt(spell.value) + bonus || ""}</td>
        </tr>
    }))
}


function mapStateToProps({selectedCthulhuChar}) {
    if (selectedCthulhuChar) {
        return {selectedCthulhuChar: selectedCthulhuChar}
    } else return {}
}

export default connect(mapStateToProps, actions)(CharacterStuff)
