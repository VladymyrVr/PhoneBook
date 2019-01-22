import TextField from "@material-ui/core/TextField/TextField";
import React from "react";

const groupList = ['Family', 'Works', 'Best Friends', 'Another', 'None'];

class FilterSelect extends  React.Component{
    constructor(props) {
        super(props);

        this.state = {
            status: 'None'
        }
    }

    handleSelectGroup = (e) => {
        this.setState({
            status: e.target.value
        });

        this.props.onSelect(e.target.value);
    };

    render() {
        return (
            <TextField
                id="outlined-select-currency-native"
                select
                label="Filter by"
                value={this.state.status}
                onChange={this.handleSelectGroup}
                SelectProps={{
                    native: true,
                }}
                margin="normal"
                variant="outlined"
            >
                {groupList.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </TextField>
        )
    }
}

export default FilterSelect;
