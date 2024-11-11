import React from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-3 bg-black shadow">
      <img src={logo} alt="Logo" style={{ width: '80px', borderRadius: '8px' }} />

      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link btn btn-primary text-white mx-2"> Login <i class="fa-solid fa-user"></i>  </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link text-white mx-2 btn btn-warning">Register <i class="fa-solid fa-user"></i></Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link text-white mx-2 btn btn-success">Home <i class="fa-solid fa-house"></i></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
