import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log("Login yanıtı:", res);

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('userId', res.data.user.id);
        navigate('/dashboard');
      } else {
        alert('Sunucudan veri gelmedi.');
      }
    } catch (err) {
      console.error("Giriş hatası:", err);
      alert('Giriş başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Giriş Yap</h2>
          <p className="text-sm text-gray-500 mb-6">Lütfen hesabınıza giriş yapın</p>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow transition"
            >
              Giriş Yap
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Hesabınız yok mu?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Kayıt Olun
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
