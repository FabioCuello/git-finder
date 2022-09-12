import React, { useState, useCallback, useEffect } from 'react';
import useProfile from '../hooks/useProfile';
import { post } from '../helpers/request';
import { Link } from 'react-router-dom';

const RegisterView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const { handleCheckProfile } = useProfile();
  const isDisabled = email === '' || password === '' || rePassword === '';

  useEffect(() => {
    handleCheckProfile({ redirectOnSuccess: true }, { success: '/' });
  }, [handleCheckProfile]);

  const handleOnChange = (e, setFunction) => {
    const value = e.target.value;
    setFunction(value);
  };

  const handleRegister = useCallback(async () => {
    if (password !== rePassword) {
      return alert('Las contraseñas deben coincidir');
    }

    try {
      await post('/api/register', { email, password });
      handleCheckProfile({ redirectOnSuccess: true }, { success: '/' });
    } catch (err) {}
  }, [email, password, rePassword, handleCheckProfile]);

  return (
    <section className='vh-100'>
      <div className='container py-5 h-100'>
        <div className='row d-flex align-items-center justify-content-center h-100'>
          <div className='col-md-7 col-lg-5 col-xl-5 offset-xl-1'>
            <form>
              <div className='d-flex align-items-center mb-3 pb-1'>
                <i class='fa-brands fa-github fa-2x me-3'></i>
                <span className='h1 fw-bold mb-0'>
                  Regístrate y empieza tu búsqueda
                </span>
              </div>
              <h5
                className='fw-normal mb-3 pb-3'
                style={{ 'letter-spacing': '1px;' }}
              >
                Crea una cuenta
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

              <div className='form-outline mb-4'>
                <input
                  onChange={(e) => handleOnChange(e, setRePassword)}
                  value={rePassword}
                  label='password'
                  type='password'
                  className='form-control form-control-lg'
                />
                <label className='form-label' for='form1Example23'>
                  Ingresa de nuevo tu contraseña
                </label>
              </div>

              <button
                type='button'
                disabled={isDisabled}
                onClick={handleRegister}
                className='btn btn-primary btn-lg btn-block'
              >
                Registrarse!
              </button>
              <div className='d-flex justify-content-around align-items-center mb-4'>
                <Link to='/login'>Ya tengo cuenta</Link>
              </div>
            </form>
          </div>

          <div className='col-md-8 col-lg-7 col-xl-6'>
            <img
              src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
              className='img-fluid'
              alt='asd'
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default RegisterView;
