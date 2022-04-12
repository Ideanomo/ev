import React, { useState } from 'react';
import { listClient } from './api-clients';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person'


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
    }
}))

export default function Search () {
    const classes = useStyles();
    const [value, setValue] = useState({
        name: '',
        details: [],
        searched: false
    })

    const handleChange = name => event => {
        setValue({
            ...value,
            [name]: event.target.value,
            details: []
        })
    }

    const search = () => {
        if (value.name) {
            listClient(value.name).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValue(value => ({
                        ...value,
                        details: data,
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
        <div>
            <Paper className={classes.root} elevation={1}>
                <InputBase
                    id="search"
                    className={classes.input}
                    placeholder="Enter client"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('name')}
                />
                <IconButton
                    className={classes.iconButton}
                    onClick={search}
                    aria-label="Search"
                >
                    <SearchIcon/>
                </IconButton>
            </Paper>

            {(value.details.length === 0) ?
                <Paper className={classes.root} elevation={4}>
                    <Typography component="p" className={classes.promptTitle}>
                        No profile. Please search for client
                    </Typography>
                </Paper> :
                <Paper className={classes.profile} elevation={4}>
                    <Typography variant="h6" className={classes.title}>
                        Profile
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={value.details[0].name} secondary={value.details.email}/>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary={"Joined: " + value.details[0].createdDate}/>
                        </ListItem>
                    </List>
                </Paper>}
        </div>
    )
}