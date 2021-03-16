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

import Notification from './notification'
import { storeContext } from '../context/store';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    backgroundColor: '#07145a'
  },
  notification: {
    position: 'absolute',
    right: '20px'
  },
  logo: {
    textDecoration: 'none',
    color: '#fff',
  }
})

export default function Navbar () {
  const [state, dispatch] = useContext(storeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const showNotificationIcons = state.authenticated 
      ? <Badge badgeContent={state.notifications.length} color="secondary">
          <NotificationsIcon onClick={handleClick} className={classes.icon} />
        </Badge>    
      :
      "";
  
	return (
		<AppBar className={classes.root}>
			<Toolbar>
        <Typography component={Link} to="/" variant="h4" className={classes.logo}>
          Jemaw
        </Typography>
        <div className={classes.notification}>
          {showNotificationIcons}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
              {state.notifications.map(not => (
                <MenuItem 
                  key={not.id} 
                  >
                    <Notification not={not} handleClose={handleClose}/>
                  </MenuItem>
              ))}
            </Menu>
        </div>
			</Toolbar>            
		</AppBar>
	)
}