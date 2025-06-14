import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { createQuiz } from '../services/api';
import { useNavigate } from 'react-router-dom';

const QuizCreatePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'text' || field === 'correctAnswer') {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
    const res = await createQuiz({ title, questions }, token);
    console.log('Oluşan Quiz:', res.data); 
    alert('Quiz oluşturuldu!');
    console.log('Gönderilen veriler:', { title, questions });
    console.log('Oluşturulan Quiz:', res.data);

    navigate('/dashboard');
  } catch (err) {
    console.error('Quiz oluşturma hatası:', err.response?.data || err);
    alert('Quiz oluşturuldu');
  }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-white to-blue-50 px-4 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Yeni Quiz Oluştur
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Quiz Başlığı"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border p-3 rounded-md"
            />

            {questions.map((q, i) => (
              <div key={i} className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h2 className="font-semibold mb-2">Soru {i + 1}</h2>
                <input
                  type="text"
                  placeholder="Soru metni"
                  value={q.text}
                  onChange={(e) =>
                    handleQuestionChange(i, 'text', e.target.value)
                  }
                  required
                  className="w-full mb-2 p-2 border rounded"
                />
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    type="text"
                    placeholder={`Seçenek ${j + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleQuestionChange(i, j, e.target.value)
                    }
                    required
                    className="w-full mb-2 p-2 border rounded"
                  />
                ))}
                <input
                  type="text"
                  placeholder="Doğru cevap"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(i, 'correctAnswer', e.target.value)
                  }
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
            >
              Soru Ekle
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
            >
              Quiz Oluştur
            </button>
          </form>
        </div>
      </div>
    </>
  ); 
};

export default QuizCreatePage;
