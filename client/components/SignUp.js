import React, { useState }from 'react';
import { create } from './api-clients';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 700,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(6),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
}))

export default function Signup () {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: "",
        password: "",
        email: "",
        company: "",
        open: false,
        error: "",
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }

    const clickSubmit = () => {
        const client = {
            name: values.name || undefined,
            company: values.company || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(client).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error})
            } else {
                setValues({ ...values, error: '', open: true})
            }
        })
    }

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant={"h6"} className={classes.title}>
                        Sign Up
                    </Typography>
                    <TextField
                        id="name"
                        label={"Name"}
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange('name')}
                        margin={"normal"} />
                    <br/>
                    <TextField
                        id="company"
                        label={"Company"}
                        className={classes.textField}
                        value={values.company}
                        onChange={handleChange('company')}
                        margin={"normal"} />
                    <br/>
                    <TextField
                        id="email"
                        label={"Email"}
                        className={classes.textField}
                        value={values.email}
                        onChange={handleChange('email')}
                        margin={"normal"} />
                    <br/>
                    <TextField
                        id="password"
                        label={"Password"}
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        margin={"normal"} />
                    <br/>
                    {values.error && (<Typography
                        component="p"
                        color="error">
                        {values.error}
                    </Typography>)}
                </CardContent>
                <CardActions>
                    <Button
                    color="secondary"
                    variant="contained"
                    onClick={clickSubmit}
                    className={classes.submit}>
                        Submit
                    </Button>
                </CardActions>
            </Card>
            <Dialog open={values.open}
            disableBackdropClick={true}
            >
                <DialogTitle>New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New client account successfully created
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <Button
                            color="primary"
                            autoFocus="autoFocus"
                            variant="contained">
                            Sign In
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}