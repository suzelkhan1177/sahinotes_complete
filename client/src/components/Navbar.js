import React from 'react'
import { Link } from 'react-router-dom';
import ApiFunction from '../api/ApiFunction';


const Navbar = () => {
  const api = ApiFunction();
  return (
    <>
 <nav className ="navbar navbar-expand-lg navbar-light bg-light">
  <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className ="navbar-toggler-icon"></span>
  </button>
  <div className ="collapse navbar-collapse" id="navbarTogglerDemo01">
    <ul className ="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className ="nav-item active">
        <Link className ="nav-link" to="/">Home</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/signin">/signin</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/signup">Signup</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/users/profile">Profile</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/forget_password">/forget_password</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/update_password">/update_password</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/users/upload_notes">upload_notes</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/users/mobile_verify">/mobile_verify</Link>
      </li>
      <li className ="nav-item">
        <Link className ="nav-link" to="/users/view_notes">/view_notes</Link>
      </li>
      
      <button onClick={ () => { api.logout(); }}>LogOut</button>

    </ul>
  </div>
</nav>

    </>
  )
}

export default Navbar;