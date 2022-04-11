import React, { useState } from 'react';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import auth from './auth-helper'
import { Navigate, useLocation } from 'react-router-dom'
import {signin} from './api-auth.js'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(20),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(6),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        color: theme.palette.primary.main
    }
}))

export default function Signin () {
    let location = useLocation();
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    })

    const handleSubmit = () => {
        const client = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(client).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToReferrer: true })
                })
            }
        })
        console.log('Click!');
    }

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const {from} = location.state || {
        from: {
            pathname: '/'
        }
    }

    const {redirectToReferrer} = values;
    if (redirectToReferrer) {
        return (<Navigate to={from}/>);
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Sign In
                </Typography>
                <TextField id="email" type="email" label="Email" className={classes.textField} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
                <TextField id="password" type="password" label="Password" className={classes.textField} value={values.password} onChange={handleChange('password')} margin="normal"/>
                <br/> {
                values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                </Typography>)
            }
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleSubmit} className={classes.submit}>Submit</Button>
            </CardActions>
        </Card>
    )
}