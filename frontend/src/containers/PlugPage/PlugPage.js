import React from 'react';
import {
    makeStyles,
    Container,
    CssBaseline,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@material-ui/core';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(() => ({
    list: {
        textAlign: 'center'
    }
}));

const PlugPage = () => {
    const classes = useStyles();
    return (
        <section>
            <CssBaseline />
            <Container>
                <Typography variant='h5' component='h5' align='center'>
                    Это страница заглушка!
                </Typography>
                <Typography variant="body1" component='p' align='center'>
                    Для того, чтобы войти в админ панель нужен аккаунт с правами админа.
                </Typography>
                <Typography variant="body1" component="p" align="center">
                    Или воспользоваться уже готовым аккаунтом
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText className={classes.list} primary="Логин: john" />
                    </ListItem>
                    <ListItem>
                        <ListItemText className={classes.list} primary="Пароль: testpass" />
                    </ListItem>
                </List>
            </Container>
            <ToastContainer autoClose={4000} />
        </section>
    );
};

export default PlugPage;