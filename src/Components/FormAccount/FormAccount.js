import React from 'react';
import {withRouter} from 'react-router-dom';

import './FormAccount.scss';

import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, DatePicker} from 'material-ui-pickers';
import ImageUploader from 'react-images-upload';
import Icon from '@material-ui/core/Icon';
import ReactPhoneInput from 'react-phone-input-2';
import Button from "@material-ui/core/Button/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const selectGender = ['Man', 'Woman'];
const status = ['Family', 'Best Friends', 'Work', 'Another'];
const PHONE_OBJ = {value: ''};

class FormAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            fullname: '',
            birthDate: Date.now(),
            avatar: '',
            sex: 'Man',
            status: 'Another',
            email: '',
            skype: '',
            phones: [{value: ''}],
        }
    }

    componentDidMount () {
        const isEdit = this.props.match.params.id;
        if(isEdit) {
            const data = JSON.parse(localStorage.getItem('contacts'));
            const editContact = data.filter(item => parseInt(item.id) === +isEdit);

            this.setState({
                ...editContact[0],
                id: isEdit,
                open: false,
            });
        }
    }

    handleChange = (name) => event => {
        this.setState({
            [name]: event.target ? event.target.value : event,
        });
    };

    handleImageChange(e) {
        let reader = new FileReader();
        let file = e[0];

        reader.onloadend = () => {
            this.setState({
                avatar: reader.result
            });
        };

        reader.readAsDataURL(file);
    };

    deleteAvatar = () => {
        this.setState({
            avatar: null
        })
    };

    handleChangePhone = (name, index) => value => {
        const newPhone = this.state.phones;
        newPhone[index].value = value;
        this.setState({
            phones: [...newPhone]
        })
    };

    initPhoneInputs = () => {
        return this.state.phones.map((item, index) => {
            return <div className="PhoneField" key={index}>
                <ReactPhoneInput
                    className="PhoneInput"
                    defaultCountry='ua'
                    value={this.state.phones[index].value}
                    onChange={this.handleChangePhone('phones', index)}
                    onlyCountries={['ua', 'ru', 'pl']}
                />
                {
                    item.optional &&
                    <Icon
                        onClick={this.deletePhoneNumber(index)}
                        className="DeletePhone"
                        color="primary">
                        add_circle
                    </Icon>
                }
            </div>
        })
    };

    deletePhoneNumber = index => () => {
        let newData = this.state.phones;
        newData.splice(index, 1);

        this.setState({
            phones: [...newData]

        })
    };

    handleAddPhone = () => {
        const newPhone = this.state.phones;

        if (newPhone.length !== 4) {
            newPhone.push({...PHONE_OBJ, optional: true});
            this.setState({
                phones: [...newPhone]
            })
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
        this.props.history.push("/phone-book");
    };

    onHandleAddContact = () => (e) => {
        e.preventDefault();

            const contactId = Date.now();
            const contact = this.state;
            const currentContacts = JSON.parse(localStorage.getItem('contacts'));

            this.setState({
                open: true
            });

            if(currentContacts) {
                contact.id = contactId;
                currentContacts.push(contact);
                localStorage.setItem('contacts', JSON.stringify(currentContacts));
            } else {
                contact.id = contactId;
                localStorage.setItem('contacts', JSON.stringify([contact]));
            }
    };

    onEditContact = (e) => {
        e.preventDefault();
        const editId = this.props.match.params.id;
        const data = JSON.parse(localStorage.getItem('contacts'));

        const contactIndex = data.findIndex(element => element.id = editId);

        data.splice(contactIndex, 1, this.state);

        localStorage.setItem('contacts', JSON.stringify(data));

        this.setState({
            open: true,
        })
    };

    render() {
        const editId = this.props.match.params.id;
        return (
            <div className="FormAccount GlobalIndent">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <h1 className="Title">Create new Contact</h1>
                    <form onSubmit={editId ? this.onEditContact : this.onHandleAddContact()}>
                        <div>
                            <div className="AvatarControl">
                                <div className="LogoWrapper">
                                    <img src={this.state.avatar ? this.state.avatar : '/empty_avatar.jpg'}
                                         className="Avatar" alt="avatar"/>
                                    {
                                        this.state.avatar &&
                                        <Icon
                                            onClick={this.deleteAvatar}
                                            className="DeleteAvatar"
                                            color="primary">
                                            add_circle
                                        </Icon>
                                    }
                                </div>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose avatar'
                                    singleImage={true}
                                    onChange={this.handleImageChange.bind(this)}
                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                    maxFileSize={5242880}
                                />
                            </div>
                        </div>
                        <div className="PersonInfo">
                            <TextField
                                id="outlined-name"
                                type="text"
                                label="Full Name"
                                value={this.state.fullname}
                                onChange={this.handleChange('fullname')}
                                margin="normal"
                                variant="outlined"
                                helperText="Enter Full name"
                                required
                            />
                        <DatePicker
                                margin="normal"
                                variant="outlined"
                                value={this.state.birthDate}
                                onChange={this.handleChange('birthDate')}
                                label="Date of Birth"
                                helperText="Enter Date of birth"
                            />
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Choose Gender"
                                value={this.state.sex}
                                onChange={this.handleChange('sex')}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select your Gender"
                                margin="normal"
                                variant="outlined"
                            >
                                {selectGender.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-select-currency-native"
                                select
                                label="Group of Contact"
                                value={this.state.status}
                                onChange={this.handleChange('status')}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Please select Group of Contact"
                                margin="normal"
                                variant="outlined"
                            >
                                {status.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="email"
                                label="Email"
                                type="email"
                                required
                                value={this.state.email}
                                onChange={this.handleChange('email')}
                                margin="normal"
                                variant="outlined"
                                helperText="Enter email"
                            />
                            <TextField
                                id="outlined-name"
                                label="Skype"
                                value={this.state.skype}
                                onChange={this.handleChange('skype')}
                                margin="normal"
                                variant="outlined"
                                helperText="Enter skype"
                            />
                        </div>
                        <div className="PhonesRow">
                            {this.initPhoneInputs()}
                        </div>
                        <div className="ContorlButtons">
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={this.state.phones.length === 4}
                                onClick={this.handleAddPhone}
                                className="PhoneControl">
                                Add phone number
                            </Button>
                            <Button variant="contained" type="submit" color="primary">
                                Save Contact
                            </Button>
                        </div>
                    </form>
                </MuiPickersUtilsProvider>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Contact successfully add to phone book!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

export default withRouter(FormAccount);