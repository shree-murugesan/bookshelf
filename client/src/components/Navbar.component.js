import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Bookmarks, AddCircle, ViewModule, NavigateNext } from '@material-ui/icons';
import { Toolbar, AppBar, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Navbar.css';

const style = {
  marginLeft: 'auto',
};

class Navbar extends Component {
  render() {
    return (
      <AppBar position="sticky" color="white" className="app-bar" style={style}>
        <Toolbar>
          <IconButton edge="start" component={Link} to="/" size="large">
            <Bookmarks color="primary" fontSize="large" />
          </IconButton>
          <Button className="button" style={style} startIcon={<AddCircle color="action" />} component={Link} to="/add" size="large" >Add Book</Button>
          <Button className="button" startIcon={<ViewModule color="action" />} component={Link} to="/view" size="large" >View Books</Button>
          <Button className="button" startIcon={<NavigateNext color="action" />} component={Link} to="/next" size="large" >Pick Next Book</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
