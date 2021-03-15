import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Skeleton from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import Markup from '../components/markup';
import Post from '../components/post';
import Sidebar from '../components/sidebar';
import data from '../posts.json';
import { storeContext } from '../context/store';

const useStyles = makeStyles ({
  homeContainer: {
    display: 'grid',
    gridGap: '10px',
    marginTop: '70px',
    width: '100%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    right: 0,
  },
  newPost: {
    gridColumn: '2/6',
    backgroundColor: '#e6e9fc',
    paddingLeft: '20px',
    paddingBottom: '10px',
    '@media (max-width: 425px)' : {
      gridColumn: '1/6',
    },
  },
  newPostInput: {
    width: '50%',
    backgroundColor: '#ffffff',
    marginRight: '20px',
  },

  icons: {
    width: '40%',
    height: '50%',
    paddingBottom: 0,
  },
  itemsSection: {
    paddingLeft: '20px',
    gridColumn: '2/6',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    '@media (max-width: 700px)' : {
      gridTemplateColumns: '1fr',
    },
    '@media (max-width: 425px)' : {
        gridTemplateColumns: '1fr',
        gridColumn: '1/6',
    },
  },
  button: {
    marginTop: 20,
    position: 'relative',
    backgroundColor: '#07145a',
    color: '#fff',
  },

  progress: {
      position: 'absolute'
  }

})

export default function Home () {
  const [state, dispatch] = useContext(storeContext);
  const posts = state.posts;
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const postSize = posts.length;
  const classes = useStyles();

  useEffect(() => { 
    if (postSize === 0) {
      dispatch({type: 'loading_data'});
    const headers = {
      'Authorization' : localStorage.getItem('authToken')
    }
      axios.get('http://localhost:8000/api/posts', { headers })
        .then(res => {
          dispatch({
            type: 'set_data',
            payload: res.data
            })
        }).catch(err =>{
          console.log(err);
        }); 
      }
  },[dispatch, postSize]);

  const handleChange = (e) => {
    setNewPost(e.target.value);
  }

  const handleSubmit = (e) => {
    const postData = {
      'body': newPost
    }
    dispatch({type: 'loading_ui'});
    axios.post('http://localhost:8000/api/posts',postData)
      .then(res => {
        console.log(res.data);
        dispatch({
          type: 'set_post',
          payload: res.data
        })
        setNewPost('');
      }).catch(err => {
        if(err.response){
          dispatch({
            type: 'set_errors',
            payload: err.response.data
          })
        }else {
          console.log("redirect to 500 page")
        }
      });
  }

  const postMarkUp = state.loadingData ? Array.from({ length: 4},(_, index) => <Markup key={index} />) : posts.map((post) => <Post key={post.id} post={post} /> );
  return (
    <div className={classes.homeContainer}>
      <Sidebar className={classes.sidebar} user={state.user}/>
      <Paper className={classes.newPost}>
        <h3>What's On Your Mind?</h3>
        <TextField 
          variant="outlined"
          name="post"
          multiline
          rows={3}
          value={newPost}
          className={classes.newPostInput}
          onChange={handleChange}
          />
        <Button 
              type="submit" 
              variant="contained" 
              className={classes.button}
              onClick={handleSubmit}
              disabled={state.loading}
          >
              Post
              {state.loading && (
                  <CircularProgress size={20} className={classes.progress}/>
              )}
          </Button>
      </Paper>

      
      <div className={classes.itemsSection}>
        {postMarkUp}
      </div>
      </div>
      )
}

