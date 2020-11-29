import React, {useEffect} from 'react';
import {
    makeStyles,
    CssBaseline,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardHeader, CircularProgress
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getArticle} from "../../store/actions/articlesActions";
import {apiUrl} from "../../constants";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: '845px',
        margin: '0 auto',
        backgroundColor: '#fafafa',
        border: 'none',
        boxShadow: '0 0 7px 1px rgba(38, 50, 56, 0.2)'
    },
    media: {
        width: '100%',
        maxWidth: '845px',
        height: 'auto',
    },
    spinner: {
        margin: '0 auto',
        display: 'block'
    }
}));

const SingleArticlePage = (props) => {
    const classes = useStyles();
    const {article, articlesError, articlesLoading} = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getArticle(id));
    }, [dispatch, id]);

    return (
        <>
            <CssBaseline />
            <Container>
                <Grid container>
                    <Grid item lg={12}>
                        {articlesLoading && <CircularProgress className={classes.spinner}/>}
                        {articlesError && <p style={{textAlign: 'center'}}>{articlesError}</p>}
                        {article && <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={apiUrl + '/uploads/' + article.image}
                                title={article.title}
                                component='img'
                            />
                            <CardHeader
                                title={`Автор: ${article.user_id.username}`}
                                subheader={`Категория: ${article.category_id.title}`}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {article.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {article.description}
                                </Typography>
                            </CardContent>
                        </Card>}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default SingleArticlePage;