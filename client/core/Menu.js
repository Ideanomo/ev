
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.light
    }
}))

const isActive = (path) => {
    let location = useLocation();

    if (location.pathname === path) {
        return {color: '#ff4081'}
    } else {
        return {color: '#ffffff'}
    }
}

const Menu = () => {
    const classes = useStyles();
    let navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                <Link to="/">
                    <IconButton aria-label="Home" style={isActive("/")}>
                        <HomeIcon/>
                    </IconButton>
                </Link>
                <Link to="/clients">
                    <Button style={isActive("/clients")}>Show Clients</Button>
                </Link>
                {!auth.isAuthenticated() && (<span>
              <Link to="/signup">
                <Button style={isActive("/signup")}>Sign up
                </Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive("/signin")}>Sign In
                </Button>
              </Link>
            </span>)}
                {auth.isAuthenticated() && (<span>
                    <Button color="inherit" onClick={() => { auth.clearJWT(() => navigate('/'))}}>
                        Sign out
                    </Button>
                </span>)}
            </Toolbar>
        </AppBar>
    )
}

export default Menu