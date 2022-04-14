import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
// import {Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        textAlign: 'left',
        padding: '0 8px'
    },
    container: {
        minWidth: '100%',
        paddingBottom: '14px'
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        width: '100%'
    },
    promptTitle: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
        paddingLeft: theme.spacing(3),
    },
    profile: theme.mixins.gutters({
        padding: theme.spacing(3),
        margin: 'auto',
        marginBottom: '10px',
        marginTop: theme.spacing(5),
        width: 300,
        position: 'relative'
    }),
    closeIcon: {
        position: 'absolute',
        left: '300px',
        bottom: '160px'
    }
}))

export default function SearchResults({results, searched, onClick}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {results.length > 0 ?
                (<div className={classes.container}>
                    <Paper className={classes.profile} elevation={4}>
                        <Typography variant="h6" className={classes.title}>
                            Profile
                        </Typography>
                        <CloseIcon
                            className={classes.closeIcon}
                            aria-label="close"
                            onClick={onClick}
                        />
                        <List dense>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={results[0].name} secondary={results[0].email}/>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={"Joined: " + results[0].createdDate}/>
                            </ListItem>
                        </List>
                    </Paper>
                </div>) : searched && (<Typography className={classes.title}>No clients found! :(</Typography>)}
        </div>)
}

SearchResults.propTypes = {
    results: PropTypes.array.isRequired,
    searched: PropTypes.bool.isRequired
}