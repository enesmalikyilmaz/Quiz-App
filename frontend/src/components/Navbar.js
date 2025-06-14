import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token') !== null;
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center border-b border-gray-200">
      <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
        TraQuiz 
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-gray-600 text-sm hidden sm:inline">Merhaba, <span className="font-semibold">{username}</span></span>
            <Link to="/dashboard" className="text-blue-600 hover:underline text-sm">
              Dashboard
            </Link>
            <Link to="/results" className="text-blue-600 hover:underline text-sm">
              Sonuçlar
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm shadow"
            >
              Çıkış
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 hover:underline text-sm">
              Giriş Yap
            </Link>
            <Link to="/register" className="text-blue-600 hover:underline text-sm">
              Kayıt Ol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
