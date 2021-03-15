import React, { useContext } from 'react';
import {storeContext} from '../context/store';
import dayjs from 'dayjs';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import EditProfile from '../pages/editProfile';

import UserMarkup from '../markup/userMarkup';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#07145a',
    color: '#fff',
    position: 'fixed',
    left: 0,
    width: '20%',
    height: '100%',
    textAlign: 'center',
    wordWrap: 'break-word',
    paddingTop: '10px',
    '@media (max-width: 425px)' : {
      display: 'none',
    }
  },
  profilePicture: {
    width: '80%',
    height: 'auto',
    marginLeft: '10%',
  }
});

export default function Sidebar(props) {
  const classes = useStyles();
  const [state, dispatch] = useContext(storeContext);

    const view = !props.user.name
      ? <UserMarkup /> 
      : <div><Avatar src={"/images/starboy.jpg"} className={classes.profilePicture} />
          <h2>{props.user.name}</h2>
          <h4>{props.user.email}</h4>
          <p>Joined {dayjs(props.user.created_at).format('dd-MM-YY')}</p> 
          { 
            state.user.name === props.user.name && 
              <EditProfile />
            }
          </div>
    return (
        <Paper className={classes.root}>
          {view}
        </Paper>
    )
}