import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-blue-50 to-blue-100 px-4">
        <div className="text-center max-w-2xl bg-white p-10 rounded-2xl shadow-2xl border border-gray-100">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            TraQuiz Platformuna Hoş Geldiniz 
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Gerçek zamanlı sınavlar oluşturun, katılın ve sonuçlarınızı takip edin.
          </p>

          {!isAuthenticated ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
              >
                Kayıt Ol
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
            >
              Dashboard'a Git
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
