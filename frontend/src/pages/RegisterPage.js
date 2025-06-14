import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      console.log("Kayıt yanıtı:", res);

      if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('userId', res.data.user.id);
        navigate('/dashboard');
      } else {
        alert('Sunucudan beklenen veri gelmedi.');
      }
    } catch (err) {
      console.error("Kayıt hatası:", err);
      alert('Kayıt başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-50 to-blue-100 px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Kayıt Ol</h2>
          <p className="text-center text-gray-500 text-sm mb-6">Platforma katılmak için bilgilerinizi girin.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
              <input
                name="username"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                name="role"
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Öğrenci</option>
                <option value="teacher">Öğretmen</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow"
            >
              Kayıt Ol
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Zaten bir hesabınız var mı?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
