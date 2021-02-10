import React, {Component} from 'react';
import * as actions from "../../actions";
import {connect} from 'react-redux';
import CharacterDetails from './CharacterDetails';
import CharacterNotes from './CharacterNotes';
import Landing from '../Landing';
import {Button, Col, Grid, ListGroup, ListGroupItem, Row, Tab, Tabs} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import CharacterStuff from './CharacterStuff';
import '../common.css';

class CharacterDetailsView extends Component {

    componentDidMount() {
        this.props.cthulhuGetOneChar(this.props.match.params.characterId);
        this.props.cthulhuGetAllChars();
        this.interval = setInterval(() => this.props.selectedCthulhuChar && this.props.cthulhuGetOneChar(this.props.selectedCthulhuChar.character.characterId), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    rivit = () => this.props.cthulhuCharacters && this.props.cthulhuCharacters.map(char =>
        <LinkContainer key={char.characterId} to={"/cthulhu/chars/" + char.characterId}>
            <ListGroupItem onClick={() => this.props.getOneChar(char.characterId)}
                           active={this.props.selectedCthulhuChar && char.characterId === this.props.selectedCthulhuChar.characterId}>
                {char.character.name}
            </ListGroupItem>
        </LinkContainer>);

    render() {
        switch (this.props.auth) {
            case null:
                return <Landing/>;
            case false:
                return <Landing/>;
            default:
                return (
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={2} lg={2}>
                                <ListGroup>
                                    {this.rivit()}
                                </ListGroup>
                                <Button href="/cthulhu/new_char">Create new character</Button>
                            </Col>
                            <Col xs={12} md={10} lg={10}>
                                <Tabs defaultActiveKey={1} id="tabsMenu" animation={false}>
                                    <Tab eventKey={1} title="Details">
                                        <CharacterDetails char={this.props.selectedCthulhuChar} auth={this.props.auth}
                                                          params={this.props.params}/>
                                    </Tab>
                                    <Tab eventKey={2} title="Stuff">
                                        <CharacterStuff char={this.props.selectedCthulhuChar} auth={this.props.auth}/>
                                    </Tab>
                                    <Tab eventKey={3} title="Notes">
                                        <CharacterNotes char={this.props.selectedCthulhuChar} auth={this.props.auth}
                                                        enableReinitialize/>
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Grid>
                )
        }
    }
}

function mapStateToProps({selectedCthulhuChar, cthulhuCharacters, auth, params}) {
    return {selectedCthulhuChar, cthulhuCharacters, auth, params}
}

export default connect(mapStateToProps, actions)(CharacterDetailsView);