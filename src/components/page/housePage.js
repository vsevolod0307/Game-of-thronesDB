import React, { Component } from 'react';
import RowBlock from '../rowBlock';
import ItemList from '../itemList';
import HouseDetails from '../houseDetails/houseDetails';
import { Field } from '../houseDetails/houseDetails';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';

export default class HousePage extends Component {

    gotService = new GotService();

    state = {
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render () {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={(item) => item.name}/>
        )

        const bookDetails = (
            <HouseDetails houseId={this.state.selectedHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='AncestralWeapons'/>
            </HouseDetails>
        )

        return (
            <RowBlock left={itemList} right={bookDetails}/>
        )
    }
}