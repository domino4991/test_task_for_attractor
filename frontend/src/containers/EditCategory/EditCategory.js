import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editCategory, getCategory} from "../../store/actions/categoriesActions";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {makeStyles, CssBaseline, Container, Typography, Button, CircularProgress} from "@material-ui/core";
import FormElement from "../../components/UI/FormElement/FormElement";

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

const EditCategory = (props) => {
    const classes = useStyles();
    const {category, categoriesError, categoriesLoading} = useSelector(state => state.categories);
    const [editCategoryState, setEditCategoryState] = useState({
        title: ''
    });
    const id = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategory(id));
    }, [id, dispatch]);

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setEditCategoryState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return categoriesError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        dispatch(editCategory(id, editCategoryState));
        setEditCategoryState({title: ''});
    }


    return (
        <>
            <CssBaseline />
            <Container>
                {categoriesLoading && <CircularProgress className={classes.spinner}/>}
                {!categoriesError ? <form
                    className={classes.form}
                    onSubmit={e => onSubmittedForm(e)}
                    autoComplete='off'
                >
                    {category &&
                        <>
                            <Typography
                                variant='h5'
                                component='h5'
                                className={classes.title}
                            >
                                Редактирование категории "{category.title}"
                            </Typography>
                            <FormElement
                                label='Новое наименование категории'
                                name='title'
                                type='text'
                                changed={e => onChangeField(e)}
                                value={editCategoryState.title}
                                error={getFieldError('title')}
                            />
                            <Button
                                fullWidth
                                variant='contained'
                                type='submit'
                                color='primary'
                                disabled={categoriesLoading}
                            >
                                Редактировать
                            </Button>
                        </>
                    }
                </form> : <p style={{textAlign: 'center'}}>{categoriesError}</p>}
                <ToastContainer autoClose={3000} />
            </Container>
        </>
    );
};

export default EditCategory;