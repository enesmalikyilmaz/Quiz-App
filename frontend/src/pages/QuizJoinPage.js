import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { listQuizzes } from '../services/api';

const QuizJoinPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await listQuizzes();
        const list = res.data.quizzes; 

        console.log("API'den gelen:", res.data);

      setQuizzes(Array.isArray(res.data) ? res.data : []);

        if (list.length === 1) {
          //  Sadece 1 quiz varsa otomatik yönlendir
          navigate(`/play/${list[0]._id}`);
        } else {
          setQuizzes(list);
        }
      } catch (err) {
        console.error('Quiz listesi alınamadı:', err);
        alert('Quiz listesi alınamadı.');
        setQuizzes([]);
      }
    };

    fetchQuizzes();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">Quiz'e Katıl</h1>

          {quizzes.length === 0 ? (
            <p className="text-center text-gray-600">Şu anda katılabileceğiniz bir quiz bulunmamaktadır.</p>
          ) : (
            <ul className="grid gap-4">
              {quizzes.map((quiz) => (
                <li
                  key={quiz._id}
                  className="border border-purple-200 p-4 rounded-lg shadow hover:shadow-md flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-purple-800">{quiz.title}</h2>
                    <p className="text-gray-600 text-sm">
                      Oluşturan: {quiz.creator?.username || 'Bilinmiyor'}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/play/${quiz._id}`)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                  >
                    Katıl
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizJoinPage;
