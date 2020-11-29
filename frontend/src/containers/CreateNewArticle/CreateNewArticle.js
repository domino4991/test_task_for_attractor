import React, {useEffect, useState} from 'react';
import {CssBaseline, Container, Typography, Button, makeStyles} from "@material-ui/core";
import FormElement from "../../components/UI/FormElement/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../store/actions/categoriesActions";
import {createNewArticle} from "../../store/actions/articlesActions"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles(theme => ({
    form: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fafafa',
        boxShadow: '0 0 5px 1px rgba(38, 50, 56, 0.2)',
        borderRadius: '5px'
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}))

const CreateNewArticle = () => {
    const classes = useStyles();
    const {articlesError, articlesLoading} = useSelector(state => state.articles);
    const {categories} = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const [newArticle, setNewArticle] = useState({
        title: '',
        description: '',
        category: '',
        image: ''
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNewArticle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onChangeFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setNewArticle(prevState => ({
            ...prevState,
            [name]: file
        }));
    };

    const getFieldError = fieldName => {
        try {
            return articlesError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newArticle).forEach(key => {
            formData.append(key, newArticle[key]);
        });
        dispatch(createNewArticle(formData));
        setNewArticle({
            title: '',
            description: '',
            category: '',
            image: ''
        });
    };

    return (
        <>
            <CssBaseline />
            <Container>
                <form
                    autoComplete='off'
                    className={classes.form}
                    onSubmit={e => onSubmittedForm(e)}
                >
                    <Typography
                        variant='h5'
                        component='h5'
                        className={classes.title}
                    >
                        Новая новость
                    </Typography>
                    <FormElement
                        label='Заголовок'
                        error={getFieldError('title')}
                        changed={e => onChangeField(e)}
                        value={newArticle.title}
                        name='title'
                        type='text'
                    />
                    <FormElement
                        label='Текст новости'
                        changed={e => onChangeField(e)}
                        value={newArticle.description}
                        name='description'
                        type='text'
                        error={getFieldError('description')}
                        multiline={true}
                        rows={7}
                        rowsMax={20}
                    />
                    <FormElement
                        label='Изображение'
                        changedFile={e => onChangeFile(e)}
                        name='image'
                        type='file'
                        error={getFieldError('image')}
                    />
                    {categories && <FormElement
                        label='Категории'
                        name='category'
                        type='select'
                        value={newArticle.category}
                        select={true}
                        changed={e => onChangeField(e)}
                        data={categories}
                        error={getFieldError('category_id')}
                    />}
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                        disabled={articlesLoading}
                    >
                        Создать
                    </Button>
                </form>
                <ToastContainer autoClose={3000} />
            </Container>
        </>
    );
};

export default CreateNewArticle;