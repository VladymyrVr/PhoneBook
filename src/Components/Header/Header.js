import React  from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

import './Header.scss';

export  default  function Header() {
    return <div className="Header">
        <div>
            <img src="/logo.png" alt="PhoneBook" className="Logo"/>
        </div>
        <nav>
            <Link to="/phone-book" className="Link">
                <Button variant="contained" color="primary">
                    PhoneBook
                </Button>
            </Link>
            <Link to="/create-account" className="Link">
                <Button variant="contained" color="primary">
                    Add Contact
                </Button>
            </Link>
        </nav>
    </div>
}