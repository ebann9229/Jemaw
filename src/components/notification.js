import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { storeContext } from '../context/store';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    right: '20px'
  }
})

export default function Notification () {
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, dispatch] = useContext(storeContext);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }
       
	return (
        <div>
          <Badge badgeContent={state.notifications.length} color="secondary">
          <NotificationsIcon onClick={handleClick} className={classes.icon} />
        </Badge>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              {state.notifications.map(not => (
                <MenuItem 
                  key={not.id} 
                  onClick={handleClose}
                  >
                    {not.sender} {not.type === 'like' ? 'liked' : 'commented on'} your post
                  </MenuItem>
              ))}
            </Menu>
        </div>
	)
}