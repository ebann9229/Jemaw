import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send'
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { storeContext } from '../context/store';
import { Divider, InputAdornment } from '@material-ui/core';
import CommentMarkup from '../markup/commentMarkup';
import Comment from '../components/comment';

const useStyles = makeStyles ({
  title: {
    display: 'grid',
    gridTemplateRows: '1fr',
    '& h3': {
      marginBlockStart: '5px',
    }
  },
  postUser: {
    display: 'flex',
    '& a': {
      textDecoration: 'none',
      color: '#000',
      marginTop: '10px',
    }
  },
  avatar: {
    width: '60px',
    height: '60px',
    marginRight: '20px',
  },
  postReactions: {
    display: 'flex',
    margin: '10px 0',
    
  },
  commentsCount: {
    marginRight: '30px',
  },
  input: {
    // margin: '10px 0',
  },
  button: {
    marginBottom: '10px',
    position: 'relative',
  },
  progress: {
    position: 'absolute'
},
  comments: {
    padding: '10px',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  }
})
export default function PostDetails({post}) {
  const [state, dispatch] = useContext(storeContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const id = post.id;

  useEffect(() => {
    let isMounted = true;
    if(open) {
      axios.get(`http://localhost:8000/api/comments/post/${id}`)
        .then(res => {
          if (isMounted)
            setComments(res.data)
            setLoading(false);
          })
        .catch(err => {
          console.log(err);
        });
      }
      return () => {
        isMounted = false;
      }
        }, [id, open]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    const commentData = {
      "post_id": post.id,
      "body": newComment
    }
    dispatch({type: 'loading_ui'});
    axios.post(`http://localhost:8000/api/comments`, commentData)
      .then(res =>{ 
        console.log(res.data);
        const response = res.data.comment;
        response.user = state.user;
        const addedComment = [response, ...comments]
        setComments(addedComment);
        setNewComment('');
        dispatch({ type: 'clear_errors' })
      })
      .catch(err => {
        dispatch({type: 'set_errors', payload: err})
        console.log('Something went wrong', err);
      });
  }
  console.log(post.comment_count);
  const markup = loading ? Array.from({ length: post.comments_count},(_, index) => <CommentMarkup key={index} />) : comments.map((comment) => <Comment key={comment.id} comment={comment} />)


  return (
      <div>
        <CommentIcon onClick={handleOpen} />
        <Dialog open={open} maxWidth="xs">
          <DialogTitle className={classes.title}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            <div className={classes.postUser} >
            <Avatar src={"/images/starboy.jpg"} className={classes.avatar}/>
            <Typography
             variant="h6" 
             component={Link}
             to={`/users/${post.user.name}`}
             >{post.user.name}</Typography >
            </div>
            <Typography variant="h5">{post.body}</Typography>
            <Typography variant="overline">{dayjs(post.created_at).format('hh:mm . DD MMM YY')}</Typography>
            <Divider />           
            <div className={classes.postReactions}>
              <Typography variant="subtitle1" className={classes.commentsCount}>{post.comments_count} Comments</Typography>
              <Typography variant="subtitle1" className={classes.likesCount}>{post.likes_count} Likes</Typography>
            </div>
            <Divider />
          </DialogTitle>
          <DialogContent className={classes.comments}>
            {markup}
          </DialogContent>
          <div>
          <TextField 
              variant='filled'
              multiline
              value={newComment}
              onChange={handleChange}
              name='comment'
              label='Comment here'
              className={classes.input}
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                   <SendIcon onClick={handleSubmit}/>
                  </InputAdornment>
              }}
              fullWidth
              />
          </div>
        </Dialog>
      </div>
  )
}

