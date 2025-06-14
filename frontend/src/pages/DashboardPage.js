import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-blue-50 to-blue-100 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-6">
          Hoş Geldiniz {username} 
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Rolünüz: <span className="font-semibold text-blue-800">{role}</span>
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {role === 'teacher' && (
            <div
              onClick={() => navigate('/quiz/create')}
              className="cursor-pointer bg-blue-100 border border-blue-200 rounded-lg p-6 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Quiz Oluştur</h2>
              <p className="text-gray-600">Yeni quizler oluşturun ve öğrencilerle paylaşın.</p>
            </div>
          )}

          {role === 'student' && (
            <div
              onClick={() => navigate('/quiz/join')}
              className="cursor-pointer bg-green-100 border border-green-200 rounded-lg p-6 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-green-800 mb-2">Quiz'e Katıl</h2>
              <p className="text-gray-600">Bir quiz oturumuna katılın ve yarışın.</p>
            </div>
          )}

          <div
            onClick={() => navigate('/results')}
            className="cursor-pointer bg-indigo-100 border border-indigo-200 rounded-lg p-6 shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-indigo-800 mb-2">Geçmiş Sonuçlar</h2>
            <p className="text-gray-600">Katıldığınız veya oluşturduğunuz quizlerin sonuçlarını görüntüleyin.</p>
          </div>

          <div
            onClick={handleLogout}
            className="cursor-pointer bg-red-100 border border-red-200 rounded-lg p-6 shadow hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-red-800 mb-2">Hesaptan Çık</h2>
            <p className="text-gray-600">Güvenli çıkış yapın ve oturumu kapatın.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
