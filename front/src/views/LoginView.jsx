import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProfile from '../hooks/useProfile';
import { post } from '../helpers/request';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleCheckProfile } = useProfile();

  const handleOnChange = (e, setFunction) => {
    const value = e.target.value;
    setFunction(value);
  };

  const handleLogin = useCallback(async () => {
    try {
      await post('/api/login', { email, password });
      handleCheckProfile({ redirectOnSuccess: true }, { success: '/' });
    } catch (err) {
      alert('Credenciales no válidas');
    }
  }, [email, password, handleCheckProfile]);

  const isDisabled = email === '' || password === '';
  useEffect(() => {
    handleCheckProfile({ redirectOnSuccess: true }, { success: '/' });
  }, [handleCheckProfile]);

  return (
    <section className='vh-100'>
      <div className='container py-5 h-100'>
        <div className='row d-flex align-items-center justify-content-center h-100'>
          <div className='col-md-8 col-lg-7 col-xl-6'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
              className='img-fluid'
              alt='asd'
            />
          </div>
          <div className='col-md-7 col-lg-5 col-xl-5 offset-xl-1'>
            <form>
              <div className='d-flex align-items-center mb-3 pb-1'>
                <i class='fa-brands fa-github fa-2x me-3'></i>
                <span className='h1 fw-bold mb-0'>
                  Buscador de repositorios
                </span>
              </div>
              <h5
                className='fw-normal mb-3 pb-3'
                style={{ 'letter-spacing': '1px;' }}
              >
                Logeate dentro de tu cuenta!
              </h5>
              <div className='form-outline mb-4'>
                <input
                  onChange={(e) => handleOnChange(e, setEmail)}
                  value={email}
                  label='usuario'
                  type='text'
                  className='form-control form-control-lg'
                />
                <label className='form-label' for='form1Example13'>
                  Usuario
                </label>
              </div>

              <div className='form-outline mb-4'>
                <input
                  onChange={(e) => handleOnChange(e, setPassword)}
                  value={password}
                  label='password'
                  type='password'
                  className='form-control form-control-lg'
                />
                <label className='form-label' for='form1Example23'>
                  Constraseña
                </label>
              </div>

              <div className='d-flex justify-content-around align-items-center mb-4'>
                <Link to='/register'>Crea una cuenta</Link>
              </div>

              <button
                type='button'
                disabled={isDisabled}
                onClick={handleLogin}
                className='btn btn-primary btn-lg btn-block'
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginView;
