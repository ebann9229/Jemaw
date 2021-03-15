import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  profile: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    padding: '10px',
    alignItems: 'center',
  }
})

export default function Profile (props) {
  const classes = useStyles();
  const profile = props.profile;
  return (
    <div className={classes.profile} >
      <span>
      <Avatar src={"/images/"+profile.profileImage} />
      </span>
      <span>
        {profile.username}
      </span>
    </div>
  )
}