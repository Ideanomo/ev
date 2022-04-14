import React, { useState, useRef} from 'react';
import { listClient } from './api-clients';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from './SearchResults';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    profile: theme.mixins.gutters({
        padding: theme.spacing(3),
        margin: 'auto',
        marginBottom: '10px',
        marginTop: theme.spacing(5),
        width: 300,
        position: 'relative'
    }),
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle
    },
    promptTitle: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
        paddingLeft: theme.spacing(3),
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10,
    },
    closeIcon: {
        position: 'absolute',
        left: '300px',
        bottom: '160px'
    }
}))

export default function Search () {
    const classes = useStyles();
    const inputRef = useRef();
    const [value, setValue] = useState({
        name: '',
        results: [],
        searched: false
    })

    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value,
            results: []
        })
    }

    const handleClose = () => {
        inputRef.current.value = '';
console.log('Input value: ', inputRef.current)

        if (value.searched) {
            setValue({
                ...value,
                results: [],
                name: '',
                searched: false
            })
        }
    };

    const search = () => {
        if (value.name) {
            listClient(value.name || undefined)
                .then((data) => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        setValue(value => ({
                            ...value,
                            results: data.filter(client => client.name === value.name),
                            searched: true
                        }))
                    }
            })
        }
    }

    const enterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            search()
        }
    }

    return (
        <>
            <Paper className={classes.root} elevation={1}>
                <TextField
                    id="search"
                    className={classes.input}
                    placeholder="Enter client"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('name')}
                    ref={inputRef}
                    variant="standard"
                />
                <IconButton
                    className={classes.iconButton}
                    onClick={search}
                    aria-label="Search"
                >
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <Divider/>
            <SearchResults
                results={value.results}
                searched={value.searched}
                onClick={handleClose}
            />
        </>
    )
}