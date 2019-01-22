import React, {Component} from 'react';
import './App.css';

import Header from "./Components/Header/Header";
import {Main} from "./Components/Main/Main";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="Wrapper">
                    <Main/>
                </div>
            </div>
        );
    }
}

export default App;
