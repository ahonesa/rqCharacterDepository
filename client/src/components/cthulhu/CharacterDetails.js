import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Badge, Button, Col, Panel, Row, Table} from 'react-bootstrap'
import {Characteristics} from './character-details/Characteristics'
import {AdditionalSkillsPanel, SkillsPanel} from './character-details/Skills'
import {WeaponsPanel} from './character-details/Weapons'
import calculateModifiers from './characters/StatBonuses'
import '../common.css'
import * as actions from "../../actions"

const CounterAdjButtons = (props) => {
    if (!props.isGM) return <div></div>
    return (<div>
        <Button bsSize="xsmall"
                onClick={() => props.cthulhuCounterUpdate(props.characterId, props.counter, -1)}>-1</Button>
        <Button bsSize="xsmall"
                onClick={() => props.cthulhuCounterUpdate(props.characterId, props.counter, +1)}>+1</Button>
    </div>)
}

const xpButton = (characterId, skill, xp, isGM, isOwner, xpRollsAllowed, props) => {

    const xpEnabled = isOwner && xpRollsAllowed && xp && xp > 0
    const xpAwardEnabled = isGM && !xpRollsAllowed && (!xp || xp < 1)

    if (xpEnabled)
        return <Button bsSize="xsmall" onClick={() => props.cthulhuSkillXpRoll(characterId, skill)}>XP</Button>;
    else if (xpAwardEnabled)
        return <Button bsSize="xsmall" onClick={() => props.cthulhuSkillXpAward(characterId, skill)}>+1</Button>;
}

const xpBadge = (skillXp) => {
    if (skillXp && skillXp > 0) return <Badge>{skillXp}</Badge>;
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
            const additionalSkills = _.get(char, "character.additional_skills", {})
            const weapons = _.get(char, "character.weapons", {})
            const hitPoints = _.get(characteristics, "hit_points", 0)
            const magicPoints = _.get(characteristics, "magic_points", 0)
            const info = _.get(c, "info", {})
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
                            <Col xs={12} md={6} lg={6}>
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
                                                <td>{info.occupation || ""}</td>
                                            </tr>
                                            <tr>
                                                <td>Residence:</td>
                                                <td>{info.residence || ""}</td>
                                            </tr>
                                            <tr>
                                                <td>Birthplace:</td>
                                                <td>{info.birthplace || ""}</td>
                                            </tr>
                                            <tr>
                                                <td>Sex:</td>
                                                <td>{info.sex || ""}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Panel.Body>
                                </Panel>
                                <Panel className="shadowPanel" bsSize="small">
                                    <Panel.Heading>Characteristics</Panel.Heading>
                                    <Panel.Body>
                                        <Characteristics characteristics={characteristics} bonuses={bonuses}
                                                         owner={isOwner}
                                                         xpRollsAllowed={xpRollsAllowed} isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <Panel className="shadowPanel" bsSize="small">
                                    <Panel.Heading>Stats</Panel.Heading>
                                    <Panel.Body>
                                        <Table condensed responsive>
                                            <thead>
                                            <tr>
                                                <th>Stat</th>
                                                <th>Base</th>
                                                <th>Curr</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>Hit points:</td>
                                                <td>{bonuses.hitPoints}</td>
                                                <td>{hitPoints}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="hit_points"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Magic points:</td>
                                                <td>{bonuses.magicPoints}</td>
                                                <td>{magicPoints}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="magic_points"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Luck:</td>
                                                <td>{characteristics.luck_org}</td>
                                                <td>{characteristics.luck} {xpBadge(characteristics.luck_xp || 0)}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="luck"/></td>
                                                <td>{xpButton(c.characterId, "luck", characteristics.luck_xp, isGM, isOwner, xpRollsAllowed, props)}</td>
                                            </tr>
                                            <tr>
                                                <td>Sanity:</td>
                                                <td>{characteristics.sanity_org}</td>
                                                <td>{characteristics.sanity}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="sanity"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Major wound:</td>
                                                <td></td>
                                                <td>{characteristics.major_wound}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="major_wound"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Temporarily insane:</td>
                                                <td></td>
                                                <td>{characteristics.temp_insane}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="temp_insane"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Indefinitely insane:</td>
                                                <td></td>
                                                <td>{characteristics.indef_insane}</td>
                                                <td><CounterAdjButtons {...props} characterId={c.characterId}
                                                                       isGM={isGM} counter="indef_insane"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Movement rate:</td>
                                                <td></td>
                                                <td>{bonuses.movementRate}</td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Build:</td>
                                                <td></td>
                                                <td>{bonuses.build}</td>
                                                <td/>
                                            </tr>
                                            <tr>
                                                <td>Damage modifier:</td>
                                                <td></td>
                                                <td>{bonuses.damageModifier}</td>
                                                <td/>
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
                                    <Panel.Heading>Skills</Panel.Heading>
                                    <Panel.Body>
                                        <SkillsPanel skills={skills} bonuses={bonuses} owner={isOwner}
                                                     xpRollsAllowed={xpRollsAllowed} isGM={isGM} panelNbr={1}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Skills</Panel.Heading>
                                    <Panel.Body>
                                        <SkillsPanel skills={skills} bonuses={bonuses} owner={isOwner}
                                                     xpRollsAllowed={xpRollsAllowed} isGM={isGM} panelNbr={2}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6} lg={6}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Additional Skills</Panel.Heading>
                                    <Panel.Body>
                                        <AdditionalSkillsPanel additionalSkills={additionalSkills} bonuses={bonuses}
                                                               owner={isOwner}
                                                               xpRollsAllowed={xpRollsAllowed} isGM={isGM}
                                                               panelNbr={2}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={6} lg={6}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Weapons</Panel.Heading>
                                    <Panel.Body>
                                        <WeaponsPanel weapons={weapons} skills={skills}
                                                      additionalSkills={additionalSkills} bonuses={bonuses}
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
