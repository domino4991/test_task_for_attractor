import React from 'react';
import {makeStyles, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {useSelector} from "react-redux";
import UserMenu from "../UI/UserMenu";
import AnonMenu from "../UI/AnonMenu";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(6)
    },
    title: {
        flexGrow: 1
    }
}));

const Header = () => {
    const {user} = useSelector(state => state.users);
    const classes = useStyles();
    return (
        <>
            <AppBar position="static" color='inherit' className={classes.root}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        News App
                    </Typography>
                    <IconButton
                        color='inherit'
                        component={NavLink}
                        to='/'
                        style={{marginRight: '20px'}}
                    >
                        <HomeIcon />
                    </IconButton>
                    {user ?
                        <UserMenu />
                        :
                        <AnonMenu />
                    }
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;