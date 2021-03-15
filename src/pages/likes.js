import React,{ useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

import data from '../profile.json';
import Profile from '../components/profile';

const useStyles = makeStyles ({
  root: {
    backgroundColor: '#ffffff',
    maxWidth: '400px',
  },
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

const Likes = (props) => {

  const [profiles, setProfiles] = useState(data);
  const classes = useStyles();
  return (
    <Grid container className= {classes.root}>
      <Grid item sm />
      <Grid item sm >
        <Dialog open={props.isOpen}  >
          <DialogTitle className={classes.title}>
          <CloseIcon className={classes.closeIcon} onClick={props.handleClose} />
            {profiles.length} People liked this post 
              </DialogTitle>
          <DialogContent className={classes.comments}>
            {profiles.map((profile) => <Profile key={profile.id} profile={profile} />)}
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Likes;