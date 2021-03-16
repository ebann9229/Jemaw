import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/core/styles'
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import Comments from '../pages/comments';
import { storeContext } from '../context/store';
import PostDetails from './postDetails';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    padding: '20px',
    margin: '20px',
    backgroundColor: '#e6e9fc',
    '@media (max-width: 700px)' : {
      margin: '10px 10px 0 0',
      padding: '10px',
      paddingRight: '0',
    },
  },
  user: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr 3fr 2fr',
    '& p, h3': {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    gridRow: '1/4'
  },
  body: {
    gridRow: '4/11',
  },
  profileAvatar: {
    marginRight: '10px',
  },
  username: {
    textDecoration: 'none',
    color: '#07145a',
  },
  reactions: {
    display: 'flex',
    gridRow: '11/12',
  },
  icons: {
    padding: '0 20px',
    '& p' : {
      marginBlockStart: 0,
      marginBlockEnd: 0
    },
    display: 'flex',
  }
});

export default function Post(props) {

    const [state, dispatch] = useContext(storeContext);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const classes = useStyles();
    const { post } = props;

    const handleOpen = () => {
      setDetailsOpen(true);
    }
    
    const handleClose = () => {
      setDetailsOpen(false);
    }

    const handleLike = () => {
      const likeData = {
        'post_id': post.id,
      }
      axios.post('http://localhost:8000/api/likes',likeData)
        .then(res => {
          console.log(res.data);
          dispatch({
            type: 'like_post',
            payload: res.data
          })
        }).catch(err => {
          console.log(err.response.data);
        })
    }

    const handleUnlike = () => {
        axios.delete(`http://localhost:8000/api/likes/${post.id}`)
        .then(res => {
          dispatch({
            type: 'unlike_post',
            payload: res.data
          })
        }).catch(err => {
          console.log(err.response.data);
        });
    }

    const likedPost = () => {
      if (state.likes && state.likes.find((like) => like.post_id === post.id))
        return true;
      else
        return false;
    }
    const likeButton = !likedPost()
      ? 
      <FavoriteBorder  onClick={handleLike}/>
      :
      <FavoriteIcon onClick={handleUnlike}/>

      const showDetails = detailsOpen ? 
      <PostDetails open={detailsOpen} post={post} handleClose={handleClose} />
      :
      '';
    const postTime = dayjs(post.created_at).format('dddd, hh:mm');

    return (
      <Paper className={classes.root}>
        <div className={classes.user}>
          <Avatar src={"/images/starboy.jpg"} variant="rounded" className={classes.profileAvatar} />
          <span className={classes.username}>
              <Link to={`/users/${post.user.name}`} className={classes.username}>
              <h3> {post.user.name.toUpperCase()}</h3>
              </Link>
            </span>
          <span className={classes.time}>
            <p> {postTime}</p>
          </span>
        </div>
        <div className={classes.body}>
          <h3>{post.body}</h3>
        </div>
        <div className={classes.reactions}>
        <span className={classes.icons}>
              <CommentIcon onClick={handleOpen} />
              {showDetails}
              <p> {post.comments_count}</p>
            </span>
            <span className={classes.icons}>
            {likeButton}
              <p> {post.likes_count}</p>
            </span>
        </div>
      </Paper>
    )
}

