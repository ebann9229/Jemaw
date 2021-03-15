import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import makeStyles from '@material-ui/core/styles/makeStyles';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { storeContext } from '../context/store';

const useStyles = makeStyles({
  root: {
    marginTop: '70px',
    textAlign: 'center',
    padding: '20px',
  },
  pageTitle: {
      margin: '20px auto 20px auto'
  },
  textField: {
      margin: '20px auto 20px auto'
  },
  button: {
      marginTop: 20,
      position: 'relative'
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
  },
  progress: {
      position: 'absolute'
  }
});

export default function Signup (props) {
    const [state, dispatch] = useContext(storeContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
    });
    const [errors, setErrors] = useState({});
    const classes = useStyles();


    const handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: form.email,
            password: form.password,
            name: form.username,
            confirmPassword: form.confirmPassword

        }
        dispatch({ type: 'loading_ui'});
        axios.post('http://localhost:8000/api/register', newUserData)
            .then(res => {
              const authToken =('Bearer ' + res.data.token);
              localStorage.setItem('authToken', authToken);
              axios.defaults.headers.common['Authorization'] = authToken;
              dispatch({ type: 'clear_errors' });
              setErrors({});
              props.history.push('/');
            }).catch(err => {
                if (err.response){
                  console.log(err.response.data);
                    dispatch({
                        type: 'set_errors',
                        payload: err.response.data
                    });
                    setErrors(err.response.data);
                }else {
                    dispatch({
                        type: 'set_errors',
                        payload: {'general': 'Something went wrong!'}
                    });
                    setErrors({'general': 'Something went wrong!'});

                }
            });
        
        }

    const handleChange = ({currentTarget: { name, value }}) => {
        setForm((state) => ({ ...state, [name]: value}))
    }


    return (
        <Grid container className={classes.root}>
            <Grid item sm/>
            <Grid item sm>
            <Typography variant="h3" className={classes.pageTitle}>
            Signup
            </Typography>
            <form  onSubmit={handleSubmit}>
            <TextField 
                id="email" 
                name="email" 
                type="email" 
                label="Email" 
                className={classes.textField}
                value={form.email} 
                helperText={errors.email} 
                error={errors.email ? true : false } 
                onChange={handleChange} 
                fullWidth
            />
            <TextField 
                id="password" 
                name="password" 
                type="password" 
                label="password" 
                className={classes.textField}
                value={form.password} 
                helperText={errors.password} 
                error={errors.password ? true : false }
                onChange={handleChange} 
                fullWidth 
            />
            <TextField 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                label="Confirm Password" 
                className={classes.textField}
                value={form.confirmPassword} 
                helperText={errors.confirmPassword} 
                error={errors.confirmPassword ? true : false }
                onChange={handleChange} 
                fullWidth 
            />
            <TextField 
                id="username" 
                name="username" 
                type="text" 
                label="User Name" 
                className={classes.textField}
                value={form.username} 
                helperText={errors.username} 
                error={errors.username ? true : false }
                onChange={handleChange} 
                fullWidth 
            />
            
            {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                </Typography>
            )}

            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className="classes.button"
                disabled={state.loading}
            >
                Signup
                {state.loading && (
                    <CircularProgress size={20} className={classes.progress}/>
                )}
            </Button>
            <br/>
            <small>Already have an account ? Login <Link to="/login">here</Link></small>
            </form>
            </Grid>
            
            <Grid item sm/>
        </Grid>
    )}

