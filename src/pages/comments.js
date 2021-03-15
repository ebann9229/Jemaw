import React,{ useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { storeContext } from '../context/store';
import CommentMarkup from '../markup/commentMarkup';
import Comment from '../components/comment';

const useStyles = makeStyles ({
  title: {
    display: 'grid',
    gridTemplateRows: '1fr'
  },
  input: {
    margin: '10px 0',
    backgroundColor: '#eeeeee',
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

const Comments = ({postId, count}) => {
  const [state, dispatch] = useContext(storeContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState();
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    axios.get(`http://localhost:8000/api/comments/post/${postId}`)
      .then(res => {
        if (isMounted)
          setComments(res.data)
          setLoading(false);
        })
      .catch(err => {
        console.log(err);
      });
      return () => {
        isMounted = false;
      }
        }, [postId]);

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
      "post_id": postId,
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

  const markup = loading ? Array.from({ length: count},(_, index) => <CommentMarkup key={index} />) : comments.map((comment) => <Comment key={comment.id} comment={comment} />)


  return (
      <div>
        <CommentIcon onClick={handleOpen} />
        <Dialog open={open}  >
          <DialogTitle className={classes.title}>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          <span className={classes.modalTitle}>Comments</span>
            <div>
            <TextField 
              variant='outlined'
              multiline
              value={newComment}
              onChange={handleChange}
              rows={3}
              name='comment'
              label='Comment here'
              className={classes.input}
              fullWidth
              />
            </div>
            <div>
              <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              onClick = {handleSubmit}
              className={classes.button}
              disabled={state.loading}
          >
              Comment
              {state.loading && (
                  <CircularProgress size={20} className={classes.progress}/>
              )}
          </Button>
              </div>
              {comments.length} Comments 
              </DialogTitle>
          <DialogContent className={classes.comments}>
            {markup}
          </DialogContent>
        </Dialog>
      </div>
  )
}

export default Comments;