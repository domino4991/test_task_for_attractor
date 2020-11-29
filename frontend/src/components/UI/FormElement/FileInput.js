import React, {createRef, useState} from 'react';
import {makeStyles, Grid, TextField, IconButton} from '@material-ui/core';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    fileInput: {
        display: 'none'
    },
    gridInput: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    }
}));

const FileInput = ({name, changedFile, label, error}) => {
    const classes = useStyles();
    const fileInputRef = createRef();

    const [filename, setFilename] = useState('');

    const onChangeFilename = e => {
        if(e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }
        changedFile(e);
    };

    return (
        <>
            <input
                type='file'
                name={name}
                className={classes.fileInput}
                ref={fileInputRef}
                onChange={e => onChangeFilename(e)}
            />
            <Grid
                container
                alignItems='center'
                direction='row'
            >
                <Grid
                    item
                    className={classes.gridInput}
                >
                    <TextField
                        fullWidth
                        variant='outlined'
                        value={filename}
                        label={label}
                        onClick={() => fileInputRef.current.click()}
                        disabled
                        error={!!error}
                        helperText={error}
                    />
                </Grid>
                <Grid item>
                    <IconButton onClick={() => fileInputRef.current.click()}>
                        <PhotoCameraIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    changedFile: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

export default FileInput;