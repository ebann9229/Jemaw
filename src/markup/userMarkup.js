import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({ 
  email: {
    width: '60%',
    height: '25px',
    marginLeft: '20%',
    margin: '10px 0 10px 20%',
  },
  profileAvatar: {
    width: '80%',
    paddingTop: '80%',
    marginLeft: '10%',
    height: 'auto',
  },
  username: {
    width: '40%',
    height: '40px',
    marginLeft: '30%',
  },
  date: {
    width: '60%',
    height: '15px',
    marginLeft: '20%',
  }
});
  

export default function Markup () {
  const classes = useStyles();

  return (
    <Fragment>
      <Skeleton className={classes.profileAvatar} animation="wave" variant="circle"/>
      <Skeleton className={classes.username} animation="wave" variant="text" />        
      <Skeleton className={classes.email} variant="text" animation="wave"/>
      <Skeleton className={classes.date} variant="text" animation="wave"/>
    </Fragment>
      )
}