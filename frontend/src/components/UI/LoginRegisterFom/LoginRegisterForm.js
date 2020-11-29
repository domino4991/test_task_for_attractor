import React from 'react';
import {TextField, makeStyles, Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(2),
        },
        maxWidth: '450px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fafafa',
        boxShadow: '0 0 5px 1px rgba(38, 50, 56, 0.2)',
        borderRadius: '5px'
    },
    button: {
        display: 'block',
        marginLeft: 'auto'
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}));

const LoginRegisterForm = ({
    username,
    password,
    getFieldError,
    changed,
    submitted,
    btnLabel,
    title
}) => {
    const classes = useStyles();
    return (
        <form
            className={classes.root}
            autoComplete='off'
            onSubmit={submitted}
        >
            <Typography
                variant='h5'
                component='h5'
                className={classes.title}
            >
                {title}
            </Typography>
            <TextField
                variant='outlined'
                name="username"
                value={username}
                onChange={changed}
                error={!!getFieldError('username')}
                helperText={getFieldError('username')}
                id='username'
                label='Username'
                fullWidth
            />
            <TextField
                variant='outlined'
                name='password'
                type='password'
                value={password}
                onChange={changed}
                error={!!getFieldError('password')}
                helperText={getFieldError('password')}
                id='password'
                label='Password'
                fullWidth
            />
            <Button
                variant='contained'
                color='primary'
                type='submit'
                className={classes.button}
            >{btnLabel}</Button>
        </form>
    );
};

LoginRegisterForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    getFieldError: PropTypes.func.isRequired,
    changed: PropTypes.func.isRequired,
    submitted: PropTypes.func.isRequired,
    btnLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

export default LoginRegisterForm;