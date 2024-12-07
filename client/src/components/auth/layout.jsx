import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.css';

function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
       <h1 className="text-center text-black  text-3xl mb-4 lg:mt-8" style={{ fontFamily: 'Inter' }}>
        Welcome to <span className='text-[#FE6262]'>Suparcart</span>
      </h1>
      <div className="w-full max-w-md px-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
