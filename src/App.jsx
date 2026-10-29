import React, { useCallback, useState } from 'react';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from './data.js';
import { getExams, getResults, getUsers, saveExams, saveResults, saveUsers } from './storage.js';
import AdminDashboard from './components/AdminDashboard.jsx';
import AuthPage from './components/AuthPage.jsx';
import ExamPage from './components/ExamPage.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import ResultPage from './components/ResultPage.jsx';
import StudentDashboard from './components/StudentDashboard.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [exams, setExamState] = useState(() => getExams());
  const [results, setResults] = useState(() => getResults());
  const [activeExam, setActiveExam] = useState(null);
  const [latestResult, setLatestResult] = useState(null);

  function persistExams(nextExams) {
    saveExams(nextExams);
    setExamState(nextExams);
  }
  function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ name: 'Administrator', email: ADMIN_EMAIL, role: 'admin' });
      setPage('admin');
      return;
    }
    const found = getUsers().find((item) => item.email.toLowerCase() === normalizedEmail && item.password === password);
    if (!found) throw new Error('We couldn’t find an account with those details. Check your email and password.');
    setUser(found);
    setPage('dashboard');
  }
  function register(values) {
    const users = getUsers();
    const email = values.email.trim().toLowerCase();
    if (email === ADMIN_EMAIL || users.some((item) => item.email.toLowerCase() === email)) throw new Error('An account with this email already exists. Please log in instead.');
    if (users.some((item) => item.studentId.toLowerCase() === values.studentId.trim().toLowerCase())) throw new Error('This student ID is already registered.');
    const newUser = { name: values.name.trim(), email, password: values.password, studentId: values.studentId.trim(), role: 'student' };
    saveUsers([...users, newUser]);
    setUser(newUser);
    setPage('dashboard');
  }
  function logout() {
    setUser(null);
    setActiveExam(null);
    setPage('home');
  }
  function beginExam(exam) {
    if (!exam.questions.length) return;
    setActiveExam(exam);
    setPage('exam');
  }
  const submitExam = useCallback((answers, exam) => {
    if (!user || !exam) return;
    const correctAnswers = exam.questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);
    const totalQuestions = exam.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * exam.marks);
    const result = {
      id: `result-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      examId: exam.id,
      examTitle: exam.title,
      studentName: user.name,
      studentId: user.studentId,
      studentEmail: user.email,
      score,
      totalMarks: exam.marks,
      passMarks: exam.passMarks,
      correctAnswers,
      incorrectAnswers: totalQuestions - correctAnswers,
      totalQuestions,
      percentage: Math.round((score / exam.marks) * 100),
      passed: score >= exam.passMarks,
      date: new Date().toISOString(),
    };
    try {
      const nextResults = [...getResults(), result];
      saveResults(nextResults);
      setResults(nextResults);
      setLatestResult(result);
      setActiveExam(null);
      setPage('result');
    } catch (error) {
      window.alert(error.message);
    }
  }, [user]);

  return <><Header user={user} page={page} setPage={setPage} onLogout={logout} />
    {!user && page === 'home' && <Home setPage={setPage} />}
    {!user && (page === 'login' || page === 'register') && <AuthPage mode={page} setPage={setPage} onLogin={login} onRegister={register} />}
    {user?.role === 'student' && page === 'dashboard' && <StudentDashboard user={user} exams={exams} results={results} startExam={beginExam} />}
    {user?.role === 'student' && page === 'exam' && activeExam && <ExamPage key={activeExam.id} exam={activeExam} user={user} onSubmit={submitExam} />}
    {user?.role === 'student' && page === 'result' && latestResult && <ResultPage result={latestResult} setPage={setPage} />}
    {user?.role === 'admin' && page === 'admin' && <AdminDashboard exams={exams} setExams={persistExams} results={results} users={getUsers()} />}
    <footer className="app-footer"><span>© 2025 Examly</span><span>Made for curious minds <span className="footer-heart">✦</span></span></footer>
  </>;
}
