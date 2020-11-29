import React from 'react';
import {makeStyles, CssBaseline, Container, Typography, IconButton} from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {push} from 'connected-react-router';
import {useDispatch} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        height: '300px',
        width: '100%'
    },
    tableTitle: {
        marginBottom: theme.spacing(3)
    },
    iconBtn: {
        margin: '0 auto'
    },
    table: {
        backgroundColor: '#fafafa',
        border: 'none',
        boxShadow: '0 0 7px 1px rgba(38, 50, 56, 0.2)'
    }
}));

const Table = ({
    data,
    title,
    users,
    pathToEdit,
    deleteFunc,
    pathToView,
    loading
}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const columns = [
        {
            field: 'id',
            headerName: users ? '#' : 'ID',
            width: 250
        },
        {
            field: users ? 'username' : 'title',
            headerName: users ? 'Пользователь' : 'Наименование',
            width: 450
        },
        {
            field: 'edit',
            headerName: 'Редактирование',
            width: 150,
            renderCell: (params) => (
                <IconButton
                    size="medium"
                    onClick={() => dispatch(push( users ? pathToEdit + params.data.userId : pathToEdit + params.data.id))}
                    className={classes.iconBtn}
                >
                    <EditIcon />
                </IconButton>
            ),
        },
        {
            field: 'delete',
            headerName: 'Удаление',
            width: 100,
            renderCell: (params) => (
                <IconButton
                    size="medium"
                    onClick={() => dispatch(deleteFunc(users ? params.data.userId : params.data.id))}
                    className={classes.iconBtn}
                    color="secondary"
                >
                    <DeleteForeverIcon />
                </IconButton>
            ),
        }
    ];

    if(users) {
        columns.splice(columns.length - 2, 0, {
            field: 'role',
            headerName: 'Права',
            width: 100
        });
    }

    if(title === 'Новости') {
        columns.splice(columns.length - 1, 0, {
            field: 'view',
            headerName: 'Просмотр',
            width: 100,
            renderCell: (params) => (
                <IconButton
                    size="medium"
                    onClick={() => dispatch(push(pathToView + params.data.id))}
                    className={classes.iconBtn}
                >
                    <VisibilityIcon />
                </IconButton>
            ),
        });
    }

    const rows = users ? data.map((item, i) => ({
        id: i + 1,
        username: item.username,
        role: item.role,
        userId: item._id
    })) : data.map(item => ({
        id: item._id,
        title: item.title,
    }));

    return (
        <>
            <CssBaseline />
            <Container>
                <Typography
                    variant='h5'
                    component='h5'
                    align='center'
                    gutterBottom
                    className={classes.tableTitle}
                >
                    {title}
                </Typography>
                <div className={classes.root}>
                    <DataGrid
                        columns={columns.map(column => ({
                            ...column,
                            disableClickEventBubbling: true
                        }))}
                        rows={rows}
                        autoHeight
                        pageSize={25}
                        className={classes.table}
                        loading={loading}
                    />
                </div>
            </Container>
        </>
    );
};

Table.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    users: PropTypes.bool,
    deleteFunc: PropTypes.func.isRequired,
    pathToEdit: PropTypes.string.isRequired
};

export default Table;