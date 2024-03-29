import _ from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import {Badge, Button, Col, Panel, Row, Table} from 'react-bootstrap'
import {Characteristics} from './character-details/Characteristics'
import {SkillsPanelOne, SkillsPanelTwo} from './character-details/Skills'
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

const RpButtons = (props) => {
    if (!props.isGM) return <div></div>
    return (<div>
        <Button bsSize="xsmall" onClick={() => props.rpUpdate(props.characterId, props.pool, -1)}>-1</Button>
        <Button bsSize="xsmall" onClick={() => props.rpUpdate(props.characterId, props.pool, +1)}>+1</Button>
    </div>)
}

const RunePool = (props) => {
    if (!props.rptotal || props.rptotal < 1) return null;
    return (<tr>
        <td>Rune Pool ({props.rpname}):</td>
        <td>{props.rptotal}</td>
        <td>{props.rpcurrent}</td>
        <td><RpButtons {...props} pool={"rp" + props.pool}/></td>
    </tr>)
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
            const hitPoints = _.get(char, "character.hitpoints", {})
            const weaponskills = _.get(char, "character.weaponskills", {})
            const authorizationLevel = auth && auth.authorizationLevel
            const userId = auth && auth.googleId
            const isOwner = ownerId === userId
            const isGM = authorizationLevel === 1
            const hasXp = c.xp > 0
            const xpRollsAllowed = params && params.xpRollsAllowed

            return (
                <Panel bsSize="small">
                    <Panel.Heading componentClass="h4" style={{marginTop: "0px"}}>{char.characterId}
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
                                                <td>{c.info.age}</td>
                                            </tr>
                                            <tr>
                                                <td>Clan:</td>
                                                <td>{c.info.clan}</td>
                                            </tr>
                                            <tr>
                                                <td>Culture:</td>
                                                <td>{c.info.culture}</td>
                                            </tr>
                                            <tr>
                                                <td>Occupation:</td>
                                                <td>{c.info.occupation}</td>
                                            </tr>
                                            <tr>
                                                <td>Parents:</td>
                                                <td>{c.info.parent}</td>
                                            </tr>
                                            <tr>
                                                <td>Religion:</td>
                                                <td>{c.info.religion}</td>
                                            </tr>
                                            <tr>
                                                <td>Sex:</td>
                                                <td>{c.info.sex}</td>
                                            </tr>
                                            <tr>
                                                <td>Species:</td>
                                                <td>{c.info.species}</td>
                                            </tr>
                                            <tr>
                                                <td>Reputation:</td>
                                                <td>{c.info.reputation}</td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Panel.Body>
                                </Panel>
                                <Panel className="shadowPanel" bsSize="small">
                                    <Panel.Heading>Characteristics</Panel.Heading>
                                    <Panel.Body>
                                        <Characteristics characteristics={characteristics} owner={isOwner} xp={c.xp}
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
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>Hit points:</td>
                                                <td>{bonuses.hitPoints.base}</td>
                                                <td>{hitPoints.base}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="base"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Head:</td>
                                                <td>{bonuses.hitPoints.head}</td>
                                                <td>{hitPoints.head}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="head"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Right arm:</td>
                                                <td>{bonuses.hitPoints.rarm}</td>
                                                <td>{hitPoints.rarm}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="rarm"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Left arm:</td>
                                                <td>{bonuses.hitPoints.larm}</td>
                                                <td>{hitPoints.larm}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="larm"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Chest:</td>
                                                <td>{bonuses.hitPoints.chest}</td>
                                                <td>{hitPoints.chest}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="chest"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Abdomen:</td>
                                                <td>{bonuses.hitPoints.abdomen}</td>
                                                <td>{hitPoints.abdomen}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM}
                                                               loc="abdomen"/></td>
                                            </tr>
                                            <tr>
                                                <td>Right leg:</td>
                                                <td>{bonuses.hitPoints.rleg}</td>
                                                <td>{hitPoints.rleg}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="rleg"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Left leg:</td>
                                                <td>{bonuses.hitPoints.lleg}</td>
                                                <td>{hitPoints.lleg}</td>
                                                <td><HpButtons {...props} characterId={c.name} isGM={isGM} loc="lleg"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Magic points:</td>
                                                <td>{bonuses.magicPoints.base}</td>
                                                <td></td>
                                            </tr>

                                            <tr>
                                                <td>Damage modifier:</td>
                                                <td>{bonuses.damageModifier}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Spirit combat damage:</td>
                                                <td>{bonuses.spiritCombatDamage}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>DEX strike rank:</td>
                                                <td>{bonuses.dexStrikeRank}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>SIZ strike rank:</td>
                                                <td>{bonuses.sizStrikeRank}</td>
                                                <td></td>
                                            </tr>
                                            <RunePool {...props} pool="1" characterId={c.name} isGM={isGM}
                                                      rpname={characteristics.rp1Name}
                                                      rptotal={characteristics.rp1Total}
                                                      rpcurrent={characteristics.rp1Current}/>
                                            <RunePool {...props} pool="2" characterId={c.name} isGM={isGM}
                                                      rpname={characteristics.rp2Name}
                                                      rptotal={characteristics.rp2Total}
                                                      rpcurrent={characteristics.rp2Current}/>
                                            <RunePool {...props} pool="3" characterId={c.name} isGM={isGM}
                                                      rpname={characteristics.rp3Name}
                                                      rptotal={characteristics.rp3Total}
                                                      rpcurrent={characteristics.rp3Current}/>
                                            <RunePool {...props} pool="4" characterId={c.name} isGM={isGM}
                                                      rpname={characteristics.rp4Name}
                                                      rptotal={characteristics.rp4Total}
                                                      rpcurrent={characteristics.rp4Current}/>
                                            <tr>
                                                <td>Hero Points:</td>
                                                <td></td>
                                                <td>{characteristics.heroPoints}</td>
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
                                    <Panel.Heading>Skills</Panel.Heading>
                                    <Panel.Body>
                                        <SkillsPanelOne skills={skills} bonuses={bonuses} owner={isOwner} hasXp={hasXp}
                                                        xpRollsAllowed={xpRollsAllowed} isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Skills</Panel.Heading>
                                    <Panel.Body>
                                        <SkillsPanelTwo skills={skills} bonuses={bonuses} owner={isOwner} hasXp={hasXp}
                                                        xpRollsAllowed={xpRollsAllowed} isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col xs={12} md={4} lg={4}>
                                <Panel className="shadowPanel">
                                    <Panel.Heading>Weapons</Panel.Heading>
                                    <Panel.Body>
                                        <WeaponsPanel weapons={weapons} weaponskills={weaponskills} bonuses={bonuses}
                                                      owner={isOwner} hasXp={hasXp} xpRollsAllowed={xpRollsAllowed}
                                                      isGM={isGM}/>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Panel>
                                    <Panel.Body>
                                        <Button disabled={authorizationLevel !== 1}
                                                href={"/chars/" + char.characterId + "/update/"}>Update
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
