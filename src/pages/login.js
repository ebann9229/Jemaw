import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
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
        margin: '10px auto 10px auto'
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

export default function Login(props) {
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useContext(storeContext);
    const classes = useStyles();
    const [errors, setErrors] = useState({});
    

    const handleChange = ({currentTarget: { name, value }}) => {
        setForm((state) => ({ ...state, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            email: form.email,
            password: form.password
        }
        setLoading(true);
        axios.post('http://localhost:8000/api/login', userData)
            .then(res => {
                console.log(res.data);
                const authToken =('Bearer ' + res.data);
                localStorage.setItem('authToken', authToken);
                dispatch({type: 'set_authenticated'})
                 setErrors({});
                 setLoading(false);
                props.history.push('/');
            })
            .catch(err => {
                if(err.response) {
                  setLoading(false);
                  setErrors(err.response.data);
                  dispatch({ type: 'set_errors'});     
                }else {
                  setLoading(false);
                  console.log("something went wrong");
                  dispatch({ type: 'set_errors'});
                }
            });
    }

    return (
        <Grid container className={classes.root}>
          <Grid item sm/>
          <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
          Login
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
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
          {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                  {errors.general}
              </Typography>
          )}
          <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button}
              disabled={loading}
          >
              Login
              {loading && (
                  <CircularProgress size={20} className={classes.progress}/>
              )}
          </Button>
          <br/>
          <small>Don't have an account ? Sign up <Link to="/signup">here</Link></small>
          </form>
          </Grid>
          
          <Grid item sm/>
        </Grid>

        );
}