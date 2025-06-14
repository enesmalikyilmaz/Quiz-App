import React from 'react';

const AdminPanel = () => {
  const username = localStorage.getItem('username');

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-white via-yellow-50 to-yellow-100 px-4 py-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-yellow-700 mb-6">
            Yönetici Paneli
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Hoş geldiniz <span className="font-semibold text-yellow-800">{username}</span>. Quiz platformunu buradan yönetin.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">Kullanıcıları Yönet</h2>
              <p className="text-gray-600">Kayıtlı kullanıcıları görüntüleyin veya kaldırın.</p>
            </div>

            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">Quiz Veritabanı</h2>
              <p className="text-gray-600">Tüm quizleri yönetin ve düzenleyin.</p>
            </div>

            <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6 shadow hover:shadow-md transition">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">İstatistikler</h2>
              <p className="text-gray-600">Sistem genel performans bilgilerini inceleyin.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
