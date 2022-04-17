import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users" className="nav-item nav-link">User</NavLink>
                <NavLink to="/products" className="nav-item nav-link">Product</NavLink>
                <NavLink to="/outlets" className="nav-item nav-link">Outlet</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Order</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 