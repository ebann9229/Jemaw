import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '2fr 10fr',
    gridGap: 20,
    margin: '20px 10px',
  },
  
  body: {
    width: '80%',
    height: '25px',
  },
  profileAvatar: {
    width: '60px',
    height: '60px',
  },
  user: {
    width: '150px',
    height: '40px',
  },
  divider: {
    gridColumnStart: 1,
    gridColumnEnd: 3
  }
});
  

export default function Markup () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <Skeleton className={classes.profileAvatar} animation="wave" variant="circle"/>
      <div className={classes.profile}>
        <Skeleton className={classes.user} animation="wave" variant="text" />        
        <Skeleton className={classes.body} variant="text" animation="wave"/>
        <Skeleton className={classes.body} variant="text" animation="wave"/>
      </div>
    </div>
      )
}