import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    minHeight: '200px',
    minWidth: '80%',
    backgroundColor: '#eeeeee',
    borderRadius: '10px',
    margin: '20px',
  },
  
  body: {
    width: '80%',
    marginLeft: '15%',
    height: '25px',
    visibility: 'visible',
  },
  profileAvatar: {
    margin: '10px 0 10px 10px',
    width: '60px',
    height: '60px',
    visibility: 'visible',
  },
  reactions: {
    height: '30px',
    width: '50%',
    marginLeft: '20%',
    marginTop: '15px',
    marginBottom: '10px',
    visibility: 'visible',
  },
  profile: {
    display: 'flex',
  },
  user: {
    marginLeft: '10px',
    width: '100px',
    height: '20px',
    marginTop: '20px',
    visibility: 'visible',
  },
  date: {
    marginLeft: '10px',
    width: '70px',
    height: '20px',
    marginTop: '20px',
    visibility: 'visible',
  }

  
});
  

export default function Markup () {
  const classes = useStyles();

  return (
    <Skeleton className={classes.root} animation="wave" variant="rect">
      <div className={classes.profile}>
      <Skeleton className={classes.profileAvatar} animation="wave" variant="circle"/>
      <Skeleton className={classes.user} animation="wave" variant="text" />
      <Skeleton className={classes.date} animation="wave" variant="text" />
      </div>
      <Skeleton className={classes.body} variant="text" animation="wave"/>
      <Skeleton className={classes.body} variant="text" animation="wave"/>
      <Skeleton className={classes.body} variant="text" animation="wave"/>
      <Skeleton className={classes.reactions} variant="rect" animation="wave"/>
    </Skeleton>
  )
}