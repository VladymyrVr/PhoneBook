import React from 'react';
import {Link} from 'react-router-dom';

import './PhoneContact.scss';

import moment from 'moment'
import Button from "@material-ui/core/Button/Button";

export default class PhoneContact extends React.Component {
    render() {
        return (
            <div className="ContactCard">
                <div className="ContactItem">
                    <div className="ImageAvatar">
                        <img src={this.props.value.avatar ? this.props.value.avatar : '/empty_avatar.jpg'}
                             alt={this.props.value.fullname}
                             className="AvatarContact"
                        />
                    </div>
                    <div className="ContactInfo">
                        <p>Full Name: <span>{this.props.value.fullname}</span></p>
                        <p>Date of birth: <span>{moment(this.props.value.birthDate).format('DD/MM/YYYY')}</span></p>
                        <p>State: <span>{this.props.value.sex}</span></p>
                    </div>
                    <div className="PhoneInfo">
                        {this.props.value.phones.map((item, index) => {
                            return <p key={index}>{`${item.optional ? 'Optional' : 'Main'} phone`} <span>{item.value}</span></p>
                        })}
                    </div>
                    <div className="AdditionalInfo">
                        {
                            this.props.value.status !== "Another" &&
                            <p>Group: <span>{this.props.value.status}</span></p>
                        }
                        <p>Email: <span>{this.props.value.email}</span></p>
                        <p className="SkypeField">Skype: <span className="SkypeField">
                        <img src="/skype.png" alt="skype icon"/>
                            {this.props.value.skype}
                        </span></p>
                    </div>
                </div>
                <div className="ContactButtons">
                    <Button variant="contained" className="EditContact" color="primary">
                        <Link className="Link Edit"
                              to={`create-account/${this.props.value.id}`}>
                            Edit Contact
                        </Link>
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.props.deleteContact(this.props.value.id)}
                    >
                        Delete Contact
                    </Button>
                </div>
            </div>
        )
    }
}