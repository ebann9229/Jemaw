import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '2fr 10fr',
    gridGap: 20,
    '& h3, p': {
      marginBlockEnd: 0,
      marginBlockStart: 0,
    },
    margin: '20px 10px',
  },
  avatar: {
    height: '60px',
    width: '60px',
  },
  divider: {
    gridColumnStart: 1,
    gridColumnEnd: 3
  }
})

export default function Comment (props) {
  const classes = useStyles();
  const comment = props.comment;
  return (
    <div className={classes.root}>
      <Divider className={classes.divider}/>
      <Avatar src={"/images/starboy.jpg"} className={classes.avatar}/>
      <span>
      <h3>{comment.user.name}</h3>
      <p>{comment.body}</p>
      </span>
    </div>
  )
}
