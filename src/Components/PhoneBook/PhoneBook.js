import React from 'react';
import {Link} from 'react-router-dom';

import './PhoneBook.scss';
import PhoneContact from "../PhoneContact/PhoneContact";
import SearchField from "../SearchField/SearchField";
import FilterSelect from "../FilterSelect/FilterSelect";

export default class PhoneBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
        }
    }

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        contacts && this.setState({
                items: contacts
            });
    }

    deleteContact = id => () => {
        const filteredContacts = this.state.items.filter(item => item.id !== id);

        this.setState({
            items: filteredContacts
        });
        localStorage.setItem('contacts', JSON.stringify(filteredContacts))
    };

    onHandleSearch = (value) => {
        if (value === '') {
            const contacts = JSON.parse(localStorage.getItem('contacts'));

            this.setState({
                items: contacts,
            });

            return;
        } else if (!!parseInt(value) || value[0] === '+') {
            const contacts = JSON.parse(localStorage.getItem('contacts'));
            const findResult = contacts.filter(item => item.phones.some(phone => phone.value.includes(value)));

            this.setState({
                items: findResult
            });
            return;
        }

        const findResult = this.state.items.filter(item => item.fullname.includes(value));

        this.setState({
            items: findResult
        })
    };

    onSelectGroup = (value) => {
        const contacts = JSON.parse(localStorage.getItem('contacts'));

        if (value === 'None') {
            this.setState({
                items: contacts,
            });

            return;
        }

        const filterFroup = contacts.filter(item => item.status === value);

        this.setState({
            items: filterFroup
        })
    };

    render() {
        const items = this.state.items;
        return (
            <div className="PhoneBook GlobalIndent">
                {<SearchField onSearch={this.onHandleSearch}/>}
                <div className="ControlPanel">
                    <h1 className="Title">Contacts <span>({this.state.items.length})</span></h1>
                    <FilterSelect onSelect={this.onSelectGroup}/>
                </div>
                {!items.length && <span className='EmptyContacts'>Your phone book empty. <Link to='create-account'>add contact</Link></span>}
                <div className="ContactItems">
                    {items.map(item => <PhoneContact value={item}
                                                     key={item.id}
                                                     deleteContact={this.deleteContact}
                    />)}
                </div>
            </div>
        )
    }
}