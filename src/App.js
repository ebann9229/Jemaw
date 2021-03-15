import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import axios from 'axios';

import Home from './pages/home';
import User from './pages/user';
import Login from './pages/login';
import Signup from './pages/signup';
import Navbar from './components/navbar';
import AuthRoute from './util/authRoute';
import { storeContext } from './context/store';

export default function App() {
  const [ state, dispatch ] = useContext(storeContext);
  let authenticated = state.authenticated;
  const token = localStorage.getItem('authToken');
  if(token) {
    authenticated = true;
  }
  useEffect(()=>{
    if(token) {
      dispatch({type: 'loading_user'});
      axios.defaults.headers.common['Authorization'] = token;
      dispatch({ type: 'set_authenticated'})
      axios.get('http://localhost:8000/api/user')
        .then(res => {
          dispatch({ type: 'set_user', payload: res.data.user});
          dispatch({ type: 'set_notifications', payload: res.data.notifications});
          dispatch({ type: 'set_likes', paload: res.data.likes});
        }).catch(err => console.log(err));
    } else {
      dispatch({type: 'set_unauthenticated'});
    }
  },[dispatch, token]);

    return (
      <Router>
        <div className="App">
        <Navbar />
          <Switch>
            <AuthRoute path="/users/:name" component={User} authenticated={authenticated} />
            <AuthRoute exact path="/" component={Home} authenticated={authenticated}/>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>    
    
  );
}


