import React, {useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles, CssBaseline, Container, Typography, Button, CircularProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/FormElement/FormElement";
import {getAllCategories} from "../../store/actions/categoriesActions";
import {editArticle, getArticle} from "../../store/actions/articlesActions";

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
    spinner: {
        margin: '0 auto',
        display: 'block'
    }
}));

const EditArticle = (props) => {
    const classes = useStyles();
    const {article, articlesError, articlesLoading} = useSelector(state => state.articles);
    const {categories, categoriesError} = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const [editArticleState, setEditArticleState] = useState({
        title: '',
        description: '',
        image: '',
        category: ''
    });

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getArticle(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(article) {
            setEditArticleState({
                title: article.title,
                description: article.description,
                image: article.image,
                category: article.category_id._id
            });
        }
    }, [article]);

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setEditArticleState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onChangeFile = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setEditArticleState(prevState => ({
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
        Object.keys(editArticleState).forEach(key => {
            formData.append(key, editArticleState[key]);
        });
        dispatch(editArticle(id, formData));
        setEditArticleState({
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
                {articlesLoading && <CircularProgress className={classes.spinner}/>}
                <form
                    autoComplete='off'
                    className={classes.form}
                    onSubmit={e => onSubmittedForm(e)}
                >
                    {article &&
                    <>
                        <Typography
                            variant='h5'
                            component='h5'
                            className={classes.title}
                        >
                            Редактирование новости "{article.title}"
                        </Typography>
                            <FormElement
                                label='Заголовок'
                                error={getFieldError('title')}
                                changed={e => onChangeField(e)}
                                value={editArticleState.title}
                                name='title'
                                type='text'
                            />
                            <FormElement
                                label='Текст новости'
                                changed={e => onChangeField(e)}
                                value={editArticleState.description}
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
                        {categories && !categoriesError ? <FormElement
                            label='Категории'
                            name='category'
                            type='select'
                            value={editArticleState.category}
                            select={true}
                            changed={e => onChangeField(e)}
                            data={categories}
                            error={getFieldError('category_id')}
                            /> : <p style={{textAlign: 'center'}}>{categoriesError}</p>}
                            <Button
                                type='submit'
                                variant='contained'
                                color='primary'
                                fullWidth
                                disabled={articlesLoading}
                            >
                            Редактировать
                            </Button>
                    </>
                    }
                </form>
                <ToastContainer autoClose={3000} />
            </Container>
        </>
    );
};

export default EditArticle;