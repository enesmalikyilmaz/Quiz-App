import React, { useEffect, useState } from 'react';
import API from '../services/api';

const ResultHistoryPage = () => {
  const [results, setResults] = useState([]);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/user/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data.results);
      } catch (err) {
        console.error('Sonuçlar alınamadı:', err);
      }
    };

    fetchResults();
  }, [token]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-emerald-50 via-white to-emerald-100 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-emerald-700 mb-6">
            Quiz Geçmişiniz
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Merhaba <span className="font-semibold text-emerald-800">{username}</span>, daha önce katıldığınız quizlerin sonuçları aşağıda listelenmiştir.
          </p>

          {results.length === 0 ? (
            <p className="text-center text-gray-500">Henüz hiç quiz geçmişiniz bulunmamaktadır.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-100 text-emerald-800">
                    <th className="py-2 px-4 border-b">Quiz Başlığı</th>
                    <th className="py-2 px-4 border-b">Puan</th>
                    <th className="py-2 px-4 border-b">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, index) => (
                    <tr key={index} className="hover:bg-emerald-50 transition">
                      <td className="py-2 px-4 border-b">{r.quiz?.title || 'Bilinmeyen'}</td>
                      <td className="py-2 px-4 border-b">{r.score}</td>
                      <td className="py-2 px-4 border-b">
                        {new Date(r.date).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultHistoryPage;
