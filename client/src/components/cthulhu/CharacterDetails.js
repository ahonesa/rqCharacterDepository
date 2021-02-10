import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Badge, Button, Col, Panel, Row, Table} from 'react-bootstrap'
import {Characteristics} from './character-details/Characteristics'
import {SkillsPanelOne} from './character-details/Skills'
import {WeaponsPanel} from './character-details/Weapons'
import calculateModifiers from './characters/StatBonuses'
import '../common.css'
import * as actions from "../../actions"

const HpButtons = (props) => {
    if (!props.isGM) return <div></div>
    return (<div>
        <Button bsSize="xsmall" onClick={() => props.hpUpdate(props.characterId, props.loc, -1)}>-1</Button>
        <Button bsSize="xsmall" onClick={() => props.hpUpdate(props.characterId, props.loc, +1)}>+1</Button>
    </div>)
}

const CharacterDetails = (props) => {
    const {char, auth, params} = props
    switch (char) {
        case null:
            return (<div>
                <span>Loading</span>
            </div>)
        default:
            const c = _.get(char, "character", {})
            const ownerId = _.get(char, "ownerId", {})
            const characteristics = _.get(char, "character.characteristics", {})
            const bonuses = characteristics && calculateModifiers(characteristics)
            const skills = _.get(char, "character.skills", {})
            const weapons = _.get(char, "character.weapons", {})
            const hitPoints = _.get(characteristics, "hit_points", 0)
            const magicPoints = _.get(characteristics, "magic_points", 0)
            const authorizationLevel = auth && auth.authorizationLevel
            const userId = auth && auth.googleId
            const isOwner = ownerId === userId
            const isGM = authorizationLevel === 10
            const xpRollsAllowed = params && params.cthulhuXpRollsAllowed

            return (
                <Panel bsSize="small">
                    <Panel.Heading componentClass="h4" style={{marginTop: "0px"}}>{char.character.name}
                        <Badge>{c.xp}</Badge></Panel.Heading>
                    <Panel.Body>
                        <Row>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel" bsSize="small">
                                    <Panel.Heading>Basic info</Panel.Heading>
                                    <Panel.Body>
                                        <Table condensed responsive>
                                            <tbody>
                                            <tr>
                                                <td>Age:</td>
                                                <td>{characteristics.ages}</td>
                                            </tr>
                                            <tr>
                                                <td>Occupation:</td>
                                                <td>{c.info.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>Residence:</td>
                                                <td>{c.info.residence}</td>
                                            </tr>
                                            <tr>
                                                <td>Birthplace:</td>
                                                <td>{c.info.birthplace}</td>
                                            </tr>
                                            <tr>
                                                <td>Sex:</td>
                                                <td>{c.info.sex}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel" bsSize="small">
                                    <Panel.Heading>Stats</Panel.Heading>
                                    <Panel.Body>
                                        <Table condensed responsive>
                                            <thead>
                                            <tr>
                                                <th>Stat</th>
                                                <th>Base</th>
                                                <th>Curr</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>Hit points:</td>
                                                <td>{bonuses.hitPoints}</td>
                                                <td>{hitPoints}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="base"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Magic points:</td>
                                                <td>{bonuses.magicPoints}</td>
                                                <td>{magicPoints}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Luck:</td>
                                                <td>{characteristics.luck_org}</td>
                                                <td>{characteristics.luck}</td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Sanity:</td>
                                                <td>{characteristics.sanity_org}</td>
                                                <td>{characteristics.sanity}</td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Major wound:</td>
                                                <td></td>
                                                <td>{characteristics.major_wound}</td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Temporarily insane:</td>
                                                <td></td>
                                                <td>{characteristics.temp_insane}</td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Indefinitely insane:</td>
                                                <td></td>
                                                <td>{characteristics.indef_insane}</td>
                                                <td/>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel" bsSize="small">
                                    <Panel.Heading>Characteristics</Panel.Heading>
                                    <Panel.Body>
                                        <Characteristics characteristics={characteristics} bonuses={bonuses} owner={isOwner}
                                                         xpRollsAllowed={xpRollsAllowed} isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Skills</Panel.Heading>
                                    <Panel.Body>
                                        <SkillsPanelOne skills={skills} bonuses={bonuses} owner={isOwner}
                                                        xpRollsAllowed={xpRollsAllowed} isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Skills</Panel.Heading>
                                    <Panel.Body>

                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Weapons</Panel.Heading>
                                    <Panel.Body>
                                        <WeaponsPanel weapons={weapons} bonuses={bonuses}
                                                      owner={isOwner} xpRollsAllowed={xpRollsAllowed}
                                                      isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Panel>
                                    <Panel.Body>
                                        <Button disabled={authorizationLevel !== 10}
                                                href={"/cthulhu/chars/" + char.character.characterId + "/update/"}>Update
                                            character</Button>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                    </Panel.Body>
                </Panel>
            )
    }
}

export default connect(null, actions)(CharacterDetails)
