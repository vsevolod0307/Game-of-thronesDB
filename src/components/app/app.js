import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../page/characterPage';
import GotService from '../../services/gotService';
import BookPage from '../page/bookPage';
import HousePage from '../page/housePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggleCharacter = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if(this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <button 
                                className="button-toggle" 
                                onClick={this.onToggleCharacter}>Toggle random character</button>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/books' component={BookPage}/>
                        <Route path='/houses' component={HousePage}/>
                    </Container>
                </div>
            </Router>
        );
    }
};