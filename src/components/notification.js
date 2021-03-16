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
import PostDetails from './postDetails';

const useStyles = makeStyles({
});

export default function Notification ({not, handleClose}) {
  const [detailsOpen, setDetailsOpen] = useState(null);
  const [state, dispatch] = useContext(storeContext);
  const classes = useStyles();
  const post = state.posts.filter(post => post.id === not.post_id )[0];
  const handleOpen = () => {
    setDetailsOpen(true);
  }

  const handleDetailsClose = () => {
    handleClose();
    // setDetailsOpen(false);
  }
  const showDetails = detailsOpen ? 
      <PostDetails open={detailsOpen} post={post} handleClose={handleDetailsClose} />
      :
      '';
  console.log(detailsOpen);
	return (
      <Typography
       variant="subtitle2"
       onClick={handleOpen}
       > {showDetails}
       {not.sender} {not.type === 'like' ? 'liked' : 'commented on'} your post</Typography> 
	)
}