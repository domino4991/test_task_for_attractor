import React, {useEffect, useState} from 'react';
import {CssBaseline, Container} from '@material-ui/core';
import LoginRegisterForm from "../../components/UI/LoginRegisterFom/LoginRegisterForm";
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {cleanUsersError, loginUser, registerUser} from "../../store/actions/usersActions";

const LoginRegister = (props) => {
    const {usersError} = useSelector(state => state.users);
    const dispatch = useDispatch();
    let path = props.match.url;
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    useEffect(() => {
        dispatch(cleanUsersError());
    }, [dispatch, path]);

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return usersError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        if(path === '/register') {
            dispatch(registerUser(user));
        } else if(path === '/login') {
            dispatch(loginUser(user));
        }
        setUser({
            username: '',
            password: ''
        });
    };
    return (
        <>
            <CssBaseline />
            <Container>
                {path === '/register' ?
                    <LoginRegisterForm
                        password={user.password}
                        getFieldError={getFieldError}
                        submitted={e => onSubmittedForm(e)}
                        changed={e => onChangeField(e)}
                        username={user.username}
                        btnLabel='Отправить'
                        title='Регистрация'
                    />
                    : path === '/login' &&
                    <LoginRegisterForm
                        password={user.password}
                        getFieldError={getFieldError}
                        submitted={e => onSubmittedForm(e)}
                        changed={e => onChangeField(e)}
                        username={user.username}
                        btnLabel='Вход'
                        title='Вход в систему'
                    />
                }
                <ToastContainer autoClose={4000} />
            </Container>
        </>
    );
};

export default LoginRegister;