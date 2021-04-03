import React, { Component } from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import BookDetails from '../bookDetails/bookDetails';
import { Field } from '../bookDetails/bookDetails';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

export default class BookPage extends Component {

    gotService = new GotService();

    state = {
        selectedBook: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render () {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={(item) => item.name}/>
        )

        const bookDetails = (
            <BookDetails bookId={this.state.selectedBook}>
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publiser' label='Publiser'/>
                <Field field='released' label='Released'/>
            </BookDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}