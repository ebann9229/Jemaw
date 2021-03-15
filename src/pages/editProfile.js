import React,{ useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import { storeContext } from '../context/store';

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

const Comments = (props) => {
  const [state, dispatch] = useContext(storeContext);
  const [form, setForm] = useState({
    email: state.user.email,
    name: state.user.name,
    bio: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userId = props.userId;
  const classes = useStyles();

  const handleChange = ({currentTarget: { name, value }}) => {
    setForm((state) => ({ ...state, [name]: value}))
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = () => {
    setLoading(true);
    axios.patch(`http://localhost:8000/api/users/${userId}`, form)
      .then(res => {
        dispatch({
          type: 'set_user',
          payload: 'res.data'
        });
        setLoading(false);
      }).catch(err => {
        setErrors(err.response.data);
        setLoading(false);
      });

  }

  return (
    <div>
      <Tooltip title='Edit Profile' aria-label="Edit">
        <EditIcon onClick={handleOpen} />
      </Tooltip>
      <Dialog open={isOpen} className={classes.dialogContainer}>
        <DialogTitle className={classes.title}>
        <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          <h3>Edit your profile</h3>
        </DialogTitle>
        <DialogContent>
        <TextField 
            variant='standard'
            value={form.name}
            onChange={handleChange}
            name='name'
            label='Name'
            className={classes.input}
            fullWidth
            />
            <TextField 
            variant='standard'
            value={form.email}
            onChange={handleChange}
            name='email'
            label='Email'
            className={classes.input}
            fullWidth
            />
            <TextField 
            variant='standard'
            value={form.bio}
            onChange={handleChange}
            name='bio'
            label='Bio'
            className={classes.input}
            fullWidth
            />
            <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            onClick = {handleSubmit}
            className={classes.button}
            disabled={loading}
        >
            Submit
            {loading && (
                <CircularProgress size={20} className={classes.progress}/>
            )}
        </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Comments;