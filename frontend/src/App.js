import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Home from './components/signIn'
import SignUp from './components/SignUp'
import "bootstrap/dist/css/bootstrap.min.css";
import NavLoginBar from './components/navbar';

function App() {
    return (

        <Router>

            <div>
                <div className="">
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <a className="navbar-brand" href=" " target="_blank" rel="noopener noreferrer">
                            <img src={logo} width="30" height="30" alt="Sri Lanka Railways"/>
                        </a>
                        <Link to="/" className="navbar-brand">TRENO</Link>
                        <div className="collpase navbar-collapse" style={{marginLeft: "780px"}}>
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item" style={{paddingLeft: '100px '}}>
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <NavLoginBar isLogged={false}/>
                            </ul>
                        </div>
                    </nav>
                    <Route path="/" exact component={Home}/>
                    <Route path="/register" exact component={SignUp}/>
                </div>
            </div>

        </Router>
    );
}

export default App;

