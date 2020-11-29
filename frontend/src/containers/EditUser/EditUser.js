import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles, CssBaseline, Container, Typography, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/FormElement/FormElement";
import {editUser, getUserInfo} from "../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(2)
    },
    form: {
        maxWidth: '350px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fafafa',
        boxShadow: '0 0 5px 1px rgba(38, 50, 56, 0.2)',
        borderRadius: '5px'
    },
}));

const EditUser = (props) => {
    const classes = useStyles();
    const {userInfo, usersError, user, usersLoading} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const [editUserState, setEditUserState] = useState({
        username: '',
        password: '',
        checkPassword: '',
        role: ''
    });

    useEffect(() => {
        dispatch(getUserInfo(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(userInfo) {
            setEditUserState(prevState => ({
                ...prevState,
                username: userInfo.username,
                role: userInfo.role
            }));
        }
    }, [userInfo]);

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setEditUserState(prevState => ({
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
        if(editUserState.password === editUserState.checkPassword) {
            dispatch(editUser(id, editUserState));
            setEditUserState({
                username: '',
                password: '',
                checkPassword: '',
                role: ''
            });
        } else {
            toast.success('Пароли не совпадают');
        }
    };

    return (
        <>
            <CssBaseline />
            <Container>
                <form
                    className={classes.form}
                    onSubmit={e => onSubmittedForm(e)}
                    autoComplete='off'
                >
                    <Typography
                        variant='h5'
                        component='h5'
                        className={classes.title}
                    >
                        Редактирование пользователя "{userInfo && userInfo.username}". Права: {userInfo && userInfo.role}
                    </Typography>
                    {(userInfo) && (user.username === userInfo.username) ?
                    <>
                        <FormElement
                            label='Username'
                            name='username'
                            type='text'
                            changed={e => onChangeField(e)}
                            value={editUserState.username}
                            error={getFieldError('username')}
                        />
                        <FormElement
                            label='Password'
                            name='password'
                            type='password'
                            changed={e => onChangeField(e)}
                            value={editUserState.password}
                            error={getFieldError('password')}
                        />
                        <FormElement
                            label='Check password'
                            name='checkPassword'
                            type='password'
                            changed={e => onChangeField(e)}
                            value={editUserState.checkPassword}
                        />
                    </>
                        :
                    user.role === 'admin' &&
                        <>
                            <FormElement
                                label='Права'
                                name='role'
                                type='select'
                                select={true}
                                changed={e => onChangeField(e)}
                                value={editUserState.role}
                                error={getFieldError('role')}
                                data={[{_id: 'admin', title: 'admin'}, {_id: 'user', title: 'user'}]}
                            />
                        </>
                    }
                    <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={usersLoading}
                    >
                        Редактировать
                    </Button>
                </form>
                <ToastContainer autoClose={3000} />
            </Container>
        </>
    );
};

export default EditUser;