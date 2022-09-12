import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};
export default AuthLayout;
