import React, {Component} from 'react';
import * as actions from "../../actions";
import {connect} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import Landing from '../Landing';
import {Button, Grid, ListGroup, ListGroupItem} from 'react-bootstrap';


class CharacterListView extends Component {
    componentDidMount() {
        this.props.cthulhuGetAllChars();
    }

    rivit = () => this.props.characters && this.props.characters.map(char => {
        return (<LinkContainer key={char.characterId} to={"/cthulhu/chars/" + char.characterId}>
            <ListGroupItem>{char.characterId}</ListGroupItem>
        </LinkContainer>);
    })

    render() {
        switch (this.props.auth) {
            case null:
                return <Landing/>;
            case false:
                return <Landing/>;
            default:
                return (
                    <Grid>
                        <ListGroup>
                            {this.rivit()}
                        </ListGroup>
                        <Button href="/cthulhu/new_char">Create new character</Button>
                    </Grid>
                )
        }
    }
}

function mapStateToProps({characters, auth, selectedChar}) {
    return {characters, auth, selectedChar}
}

export default connect(mapStateToProps, actions)(CharacterListView);