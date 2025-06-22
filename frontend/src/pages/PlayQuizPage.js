import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import socket from '../socket';
import { listQuizzes } from '../services/api';

const PlayQuizPage = () => {
  const { quizId } = useParams();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const [quiz, setQuiz] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();


  // Quiz bilgilerini getir
  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await listQuizzes();
      const quizList = res.data.quizzes;
      const found = quizList.find((q) => q._id === quizId);

      if (found) {
        setQuiz(found);
        socket.emit('joinQuiz', {
          quizId,
          username,
          userId,
          totalQuestions: found.questions.length,
        });
      }
    };
    fetchQuiz();
  }, [quizId, username, userId]);

  // Skor güncellemesi
  useEffect(() => {
    socket.on('scoreUpdate', ({ scores }) => {
      setScores(scores);
    });

    socket.on('newQuestion', ({ questionIndex }) => {
      setQuestionIndex(questionIndex);
      setSelected('');
      setAnswered(false);
    });

    socket.on('quizEnded', () => {
      alert("Quiz bitti! Ana sayfaya yönlendiriliyorsunuz.");
      navigate('/dashboard'); 
    });


    return () => {
      socket.off('scoreUpdate');
      socket.off('newQuestion');

    };
  }, []);

  const handleAnswer = (option) => {
    if (answered || !quiz) return;
    setSelected(option);
    setAnswered(true);
    const correct = quiz.questions[questionIndex].correctAnswer === option;
    socket.emit('submitAnswer', { quizId, isCorrect: correct, userId });
  };

  if (!quiz) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-purple-50 text-xl text-gray-700">
          Quiz yükleniyor...
        </div>
      </>
    );
  }

  const question = quiz.questions[questionIndex];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-50 via-white to-purple-100 px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">{quiz.title}</h1>
          <h2 className="text-xl text-gray-800 mb-6 text-center">Soru {questionIndex + 1}:</h2>
          <p className="text-lg text-gray-700 font-medium mb-6 text-center">{question.text}</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                className={`px-4 py-3 rounded-lg shadow text-white font-semibold transition ${
                  selected === option
                    ? option === question.correctAnswer
                      ? 'bg-green-500'
                      : 'bg-red-500'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-purple-800 mb-2 text-center">Canlı Skor Tablosu</h3>
            <ul className="text-gray-700 text-center">
              {scores.map((entry, i) => (
                <li key={i}>
                  {entry.username}: {entry.score} puan
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayQuizPage;
