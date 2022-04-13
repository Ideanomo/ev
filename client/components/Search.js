import React, { useState, useRef} from 'react';
import { listClient } from './api-clients';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from './SearchResults';
import Typography from "@material-ui/core/Typography";

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
        searched: false,
        foundUser: false

    })
    const [open, setOpen] = React.useState(false);


    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value,
            results: []
        })
    }

    const handleClose = () => {
        inputRef.current.value = '';

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
            listClient(value.name || undefined).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else if(data[0].name === value.name) {
                     setValue(value => ({
                        ...value,
                        results: data,
                        searched: true,
                         foundUser: true
                    }))
                }
                else if (value.name !== data[0].name) {
                    setValue(() => ({
                        ...value,
                        foundUser: false
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
        <div>
            <Paper className={classes.root} elevation={1}>
                <InputBase
                    id="search"
                    className={classes.input}
                    placeholder="Enter client"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('name')}
                    ref={inputRef}
                />
                <IconButton
                    className={classes.iconButton}
                    onClick={search}
                    aria-label="Search"
                >
                    <SearchIcon/>
                </IconButton>
            </Paper>
            {(!value.foundUser) && (<Typography variant="h4" className={classes.title}>No clients found! :(</Typography>)}
            <Divider/>
            <SearchResults
                results={value.results}
                searched={value.searched}
                onClick={handleClose}
            />
        </div>
    )
}