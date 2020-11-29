import React, {useState} from 'react';
import {CssBaseline, Container, Typography, makeStyles, Button} from "@material-ui/core";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FormElement from "../../components/UI/FormElement/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {createNewCategory} from "../../store/actions/categoriesActions";

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
}))

const CreateNewCategory = () => {
    const classes = useStyles();
    const {categoriesError, categoriesLoading} = useSelector(state => state.categories);
    const [newCategory, setNewCategory] = useState({
        title: ''
    });
    const dispatch = useDispatch();

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNewCategory(prevState => ({
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
        dispatch(createNewCategory(newCategory));
        setNewCategory({title: ''});
    }

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
                        Новая категория
                    </Typography>
                    <FormElement
                        label='Наименование категории'
                        name='title'
                        type='text'
                        changed={e => onChangeField(e)}
                        value={newCategory.title}
                        error={getFieldError('title')}
                    />
                    <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={categoriesLoading}
                    >
                        Создать
                    </Button>
                </form>
                <ToastContainer autoClose={3000} />
            </Container>
        </>
    );
};

export default CreateNewCategory;