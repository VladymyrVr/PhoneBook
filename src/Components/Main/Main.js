import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PhoneBook from "../PhoneBook/PhoneBook";
import FormAccount from "../FormAccount/FormAccount";

export const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={PhoneBook}/>
            <Route path='/phone-book' component={PhoneBook}/>
            <Route exact path='/create-account' component={FormAccount}/>
            <Route path='/create-account/:id' component={FormAccount}/>
        </Switch>
    </main>
);