import React from 'react';
import { post } from '../helpers/request';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await post('/api/logout');
      navigate('/login');
    } catch (err) {}
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-dark navbar-dark '>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-mdb-toggle='collapse'
            data-mdb-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i className='fas fa-bars'></i>
          </button>

          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/'>
                  <p className='nav-link'>
                    Buscador
                    <i className='fas fa-search'></i>
                  </p>
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/favorites'>
                  <p className='nav-link'>
                    Favoritos
                    <i class='fa-solid fa-star'></i>
                  </p>
                </Link>
              </li>
            </ul>
            <ul className='navbar-nav d-flex flex-row me-1'>
              <li className='nav-item me-3 me-lg-0'></li>
              <li className='nav-item me-3 me-lg-0'>
                <p
                  className='nav-link'
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  Logout <i class='fa-solid fa-right-from-bracket'></i>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};
export default NavBar;
