import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">Home</Link>
                    </div>
                    <div className="app-branding">
                        <nav className="app-nav">
                            {this.props.authenticated && (
                                <ul>
                                    <li>
                                        <NavLink to="/person">Person</NavLink>
                                    </li>
                                </ul>
                            )}
                        </nav>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                            {this.props.authenticated ? (
                                <ul>
                                    <li>
                                        <NavLink to="/profile">Profile</NavLink>
                                    </li>
                                    <li>
                                        <a href="#" onClick={this.props.onLogout}>Logout</a>
                                    </li>
                                </ul>
                            ) : (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">Login</NavLink>
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;