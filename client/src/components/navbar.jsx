import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
    return ( <>
    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">myAi</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/login">login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/">home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/profile">profile</Link>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href='/login' aria-disabled="false">profile</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
   
    </div>
    </> );
}

export default Navbar;