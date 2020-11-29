import React from 'react';
import {TextField, Grid, MenuItem, makeStyles} from "@material-ui/core";
import FileInput from "./FileInput";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    gridItem: {
        marginBottom: theme.spacing(3)
    }
}))

const FormElement = ({
    name,
    type,
    value,
    changed,
    changedFile,
    error,
    label,
    select,
    multiline,
    data,
    rows,
    rowsMax
}) => {
    const classes = useStyles();
    let selectOptions;

    if(select) {
        selectOptions = data.map(option => <MenuItem
            key={option._id}
            value={option._id}
        >
            {option.title}
        </MenuItem>);
    }



    return (
        <Grid item xs={12} className={classes.gridItem}>
            {type !== 'file' ? <TextField
                fullWidth
                type={type}
                name={name}
                value={value}
                onChange={changed}
                variant='outlined'
                autoComplete={name}
                error={!!error}
                helperText={error}
                label={label}
                select={!!select}
                multiline={!!multiline}
                rows={rows}
                rowsMax={rowsMax}
            >
                {selectOptions}
            </TextField> : <FileInput
                name={name}
                changedFile={changedFile}
                label={label}
                error={error}
            />}
        </Grid>
    );
};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    changed: PropTypes.func,
    changedFile: PropTypes.func,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    select: PropTypes.bool,
    multiline: PropTypes.bool,
    data: PropTypes.array,
    rows: PropTypes.number,
    rowsMax: PropTypes.number
};

export default FormElement;