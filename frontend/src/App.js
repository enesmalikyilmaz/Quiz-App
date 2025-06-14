import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PlayQuizPage from './pages/PlayQuizPage';
import ResultHistoryPage from './pages/ResultHistoryPage';
import AdminPanel from './pages/AdminPanel';
import HomePage from './pages/HomePage';
import QuizCreatePage from './pages/QuizCreatePage';
import QuizJoinPage from './pages/QuizJoinPage';


const App = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/quiz/create" element={<QuizCreatePage />} />
        <Route path="/quiz/join" element={<QuizJoinPage />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/play/:quizId" element={isAuthenticated ? <PlayQuizPage /> : <Navigate to="/login" />} />
        <Route path="/results" element={isAuthenticated ? <ResultHistoryPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
