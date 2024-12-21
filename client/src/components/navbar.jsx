import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">myAi</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">home</Link>
                                </li>
                                <li className="nav-item" style={{ marginLeft: '20px' }}>
                                    <button style={{ borderRadius: '10px' }}><Link className="nav-link active" to="/login">Login</Link></button>
                                </li>
                                <li className="nav-item" style={{ marginLeft: '20px' }}>
                                    <button style={{ borderRadius: '10px' }} ><Link className="nav-link active" to="/vaibhav">Sign In</Link></button>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
