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

    rivit = () => this.props.cthulhuCharacters && this.props.cthulhuCharacters.map(char => {
        console.log(this.props.cthulhuCharacters)
        return (<LinkContainer key={char.characterId} to={"/cthulhu/chars/" + char.characterId}>
            <ListGroupItem>{char.character.name}</ListGroupItem>
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

function mapStateToProps({cthulhuCharacters, auth, selectedCthulhuChar}) {
    return {cthulhuCharacters, auth, selectedCthulhuChar}
}

export default connect(mapStateToProps, actions)(CharacterListView);