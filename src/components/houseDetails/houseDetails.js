import React, {Component} from 'react';
import gotService from '../../services/gotService';

const Field = ({house, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{house[field]}</span>
        </li>
    )
}

export {Field};

export default class HouseDetails extends Component {

    gotService = new gotService();

    state = {
        house: null
    }

    componentDidMount() {
        this.updateHouse();
    }

    componentDidUpdate(prevProps) {
        if(this.props.houseId !== prevProps.houseId) {
            this.updateHouse();
        }
    }

    updateHouse() {
        const {houseId} = this.props;
        if(!houseId) {
            return;
        }

        this.gotService.getHouse(houseId)
            .then((house) => {
                this.setState({house})
            })
    }

    render() {

        if(!this.state.house) {
            return <span className='select-error'>Please select a character</span>
        }
        const {house} = this.state;
        const {name} = house;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {house})
                        })
                    }
                </ul>
            </div>
        );
    }
}