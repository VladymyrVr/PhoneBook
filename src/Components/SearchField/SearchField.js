import React from 'react';

import './SearchField.scss';

import TextField from '@material-ui/core/TextField';

class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        }
    }

    onHandleChange = (e) => {
        const name = e.target.name;
        const text = e.target.value;

        this.setState({
            [name]: text,
        });

        this.props.onSearch(text)
    };

    onClearSearchField= () => {
        this.setState({
            searchText: '',
        });

        this.props.onSearch('')
    };

    render() {
        return (
            <div className="SearchField">
                <TextField
                    id="filled-full-width"
                    style={{margin: 8}}
                    placeholder="Find"
                    fullWidth
                    name="searchText"
                    margin="normal"
                    value={this.state.searchText}
                    onChange={this.onHandleChange}
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <i className="material-icons ClearIcon"
                   onClick={this.onClearSearchField}
                >
                    clear
                </i>
                <i className="material-icons FindIcon">
                    search
                </i>
            </div>
        )
    }
}

export default SearchField;