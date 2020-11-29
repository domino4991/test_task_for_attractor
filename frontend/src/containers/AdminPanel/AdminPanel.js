import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, makeStyles, Grid, ButtonGroup, CircularProgress} from '@material-ui/core';
import {deleteArticle, getAllArticles} from "../../store/actions/articlesActions";
import {deleteCategory, getAllCategories} from "../../store/actions/categoriesActions";
import {deleteUser, getAllUsers} from "../../store/actions/usersActions";
import Table from "../../components/UI/Table/Table";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
    buttonsGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    buttonActive: {
        backgroundColor: '#303f9f'
    },
    spinner: {
        margin: '0 auto',
        display: 'block'
    }
}));

const AdminPanel = () => {
    const classes = useStyles();
    const {categories, categoriesError, categoriesLoading} = useSelector(state => state.categories);
    const {articles, articlesError, articlesLoading} = useSelector(state => state.articles);
    const {users, usersError, usersLoading} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [isActiveIndex, setIsActiveIndex] = useState(1);

    useEffect(() => {
        dispatch(getAllArticles());
        dispatch(getAllCategories());
        dispatch(getAllUsers());
    }, [dispatch]);

    const onHandlerClick = newIndex => {
        setIsActiveIndex(newIndex);
    };

    return (
        <Grid container
              direction='column'
        >
            <Grid
                item
                lg={12}
                className={classes.buttonsGrid}
            >
                <ButtonGroup
                    variant="contained"
                    color="inherit"
                    aria-label="contained inherit button group"
                >
                    <Button
                        onClick={() => onHandlerClick(1)}
                        color={isActiveIndex === 1 ? 'primary' : 'inherit'}
                    >
                        Категории
                    </Button>
                    <Button
                        color={isActiveIndex === 2 ? 'primary' : 'inherit'}
                        onClick={() => onHandlerClick(2)}
                    >
                        Новости
                    </Button>
                    <Button
                        color={isActiveIndex === 3 ? 'primary' : 'inherit'}
                        onClick={() => onHandlerClick(3)}
                    >
                        Юзеры
                    </Button>
                </ButtonGroup>
            </Grid>
            <Grid
                item
                lg={12}
            >
                {categoriesLoading
                &&
                articlesLoading
                &&
                usersLoading
                &&
                <CircularProgress
                    className={classes.spinner}
                />}
                {categories && !categoriesError ?
                    isActiveIndex === 1 &&
                    <Table
                        data={categories}
                        title='Категории'
                        pathToEdit='/edit-category/'
                        deleteFunc={deleteCategory}
                        loading={categoriesLoading}
                    /> : <p style={{textAlign: 'center'}}>{categoriesError}</p>}
                {articles && !articlesError ?
                    isActiveIndex === 2 &&
                    <Table
                        data={articles}
                        title='Новости'
                        pathToEdit='/edit-article/'
                        deleteFunc={deleteArticle}
                        pathToView='/article/'
                        loading={articlesLoading}
                    /> : <p style={{textAlign: 'center'}}>{articlesError}</p>}
                {users && !usersError ?
                    isActiveIndex === 3 &&
                    <Table
                        users={true}
                        data={users}
                        title='Пользователи'
                        pathToEdit='/edit-user/'
                        deleteFunc={deleteUser}
                        loading={usersLoading}
                    /> : <p style={{textAlign: 'center'}}>{usersError}</p>}
            </Grid>
            <ToastContainer autoClose={3000} />
        </Grid>
    );
};

export default AdminPanel;