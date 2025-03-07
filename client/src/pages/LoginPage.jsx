import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-220 bg-gray-100">
        <div className="px-8 py-6  bg-white shadow-lg rounded-lg max-w-md w-full">
          <h3 className="text-2xl font-bold text-center mb-4">Login to your account</h3>
          <LoginForm />
        </div>
      </div>
    );
}

export default LoginPage;