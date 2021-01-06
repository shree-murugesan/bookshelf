import React, { Component } from "react";
import { Link } from 'react-router-dom';
import {Bookmarks, AddCircle, ViewModule, NavigateNext} from '@material-ui/icons';
import { Toolbar, AppBar } from '@material-ui/core';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
    //     <nav className="navbar">
    //     <Link to="/" className="nav-link"><Bookmarks className="nav-icon" color="primary" fontSize="large"/> BookShelf </Link>
    //     <Link to="/add" className="nav-link"><AddCircle className="nav-icon" color="action" />Add Book</Link>
        
        
    //   </nav>

        // <div className="nav-wrapper">
        //     <Link to="/" className="nav-link"><Bookmarks className="nav-icon" color="primary" fontSize="large"/> BookShelf </Link>
        //     <ul className="right hide-on-med-and-down">
        //         <li><Link to="/add" className="nav-link"><AddCircle className="nav-icon" color="action" />Add Book</Link></li>
        //     </ul>
        // </div>

        <AppBar position="static" color="black">
        <Toolbar>
            <Link to="/" className="nav-link"><Bookmarks className="nav-icon" color="primary" fontSize="large"/> BookShelf </Link>
            <Link to="/add" className="nav-link"><AddCircle className="nav-icon" color="action" />Add Book</Link>
            <Link to="/view" className="nav-link"><ViewModule className="nav-icon" color="action" />View Books</Link>
            <Link to="/next" className="nav-link"><NavigateNext className="nav-icon" color="action" />Pick Next Book</Link>
        </Toolbar>
        </AppBar>
    );
  }
}

export default Navbar;
