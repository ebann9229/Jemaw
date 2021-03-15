import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

import { storeContext } from '../context/store';
import Sidebar from '../components/sidebar';
import Markup from '../components/markup';
import Post from '../components/post';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridGap: '10px',
    marginTop: '70px',
    width: '100%',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    '@media (max-width: 425px)' : {
      width: '100%',
    },
    right: 0,
  },
  name: {
  gridColumn: '2/6',
  textAlign: 'center',
    color: '#000',
    paddingBottom: '10px',
    '@media (max-width: 425px)' : {
      gridColumn: '1/6',
    },
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
});


export default function User(props) {
  const [state, dispatch] = useContext(storeContext);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const username = props.match.params.name;
  const classes = useStyles();

  useEffect (() => {
    dispatch({ type: 'loading_ui' });
    axios.get(`http://localhost:8000/api/users/${username}`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data.posts);
        setUser(res.data.user);
        dispatch({ type: 'clear_errors'});
      }).catch(err => {
        dispatch({ type: 'set_errors', payload: 'err.response'});
        console.log(err);
      });
  }, [dispatch, username]);
  console.log(user, posts);
  console.log(state.loadingData);

  const postMarkUp = state.loading ? Array.from({ length: 4},(_, index) => <Markup key={index} />) : posts.map((post) => <Post key={post.id} post={post} /> );


  return (
    <div className={classes.container}>
      <Sidebar className={classes.sidebar} user={user}/>
      <span className={classes.name}>
        <h1>{username.toUpperCase()}'s posts</h1>
      </span>
      <div className={classes.itemsSection}>
        {postMarkUp}
      </div>
    </div>
  )
}
