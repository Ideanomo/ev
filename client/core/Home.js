import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
    media: {
        minHeight: 400
    },
    link: {
        color: theme.palette.secondary.dark
    }
}))

const Home = () => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <Typography variant="h6" className={classes.title}>
                Client Page
            </Typography>
            <CardContent>
                <Typography variant="body2" component="p">
                    Search for a single client
                </Typography>
                <Typography variant="body2" className={classes.link} component={Link} to={"/clients"}>
                    See all clients
                </Typography>
                <Typography variant="body2" className={classes.link} component={Link} to={"/signup"}>
                    Sign Up
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Home;