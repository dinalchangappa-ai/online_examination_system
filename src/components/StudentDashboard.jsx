import React from 'react';

export default function StudentDashboard({ user, exams, results, startExam }) {
  const mine = results.filter((result) => result.studentEmail === user.email);
  return (
    <main className="app-page">
      <section className="dashboard-welcome"><div><span className="eyebrow"><span className="eyebrow-dot" /> STUDENT SPACE</span><h1>Good to see you, {user.name.split(' ')[0]} <span className="wave">✦</span></h1><p>Pick up where you left off, or take on something new.</p></div><div className="welcome-date"><span>YOUR STUDENT ID</span><strong>{user.studentId}</strong></div></section>
      <section className="stat-grid">
        <article className="stat-card"><span className="stat-icon blue-icon">▣</span><div><span>AVAILABLE EXAMS</span><strong>{exams.length}</strong></div></article>
        <article className="stat-card"><span className="stat-icon mint-icon">✓</span><div><span>EXAMS COMPLETED</span><strong>{mine.length}</strong></div></article>
        <article className="stat-card"><span className="stat-icon peach-icon">↗</span><div><span>BEST SCORE</span><strong>{mine.length ? `${Math.max(...mine.map((item) => item.percentage))}%` : '—'}</strong></div></article>
      </section>
      <section className="exam-list-section"><div className="list-heading"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Your examinations</h2></div><span className="exam-count">{exams.length} available</span></div>
        {exams.length === 0 ? <div className="empty-state"><span>✳</span><h3>No exams just yet</h3><p>Your next challenge will show up here.</p></div> : <div className="exam-grid">{exams.map((exam, index) => {
          const previous = mine.find((item) => item.examId === exam.id);
          return <article className="exam-card" key={exam.id}><div className="exam-card-top"><span className={`category-pill category-${index % 3}`}>{exam.category || 'General'}</span><span className="exam-card-symbol">{['⌘', '◈', '✳'][index % 3]}</span></div><h3>{exam.title}</h3><p>{exam.description}</p><div className="exam-meta"><span>◷ &nbsp;{exam.duration} min</span><span>▤ &nbsp;{exam.questions.length} questions</span><span>✦ &nbsp;{exam.marks} marks</span></div><div className="exam-card-bottom">{previous && <span className={`attempt-badge ${previous.passed ? 'passed' : 'needs-work'}`}>{previous.passed ? '✓ Passed' : '↻ Attempted'}</span>}<button className="button button-primary" disabled={exam.questions.length === 0} onClick={() => startExam(exam)}>{previous ? 'Try again' : 'Start exam'} <span aria-hidden="true">→</span></button></div></article>;
        })}</div>}
      </section>
      {mine.length > 0 && <section className="history-section"><div className="list-heading"><div><span className="eyebrow">YOUR PROGRESS</span><h2>Recent results</h2></div></div><div className="history-list">{mine.slice().reverse().slice(0, 5).map((result) => <div className="history-row" key={result.id}><span className="history-mark">{result.passed ? '✓' : '↻'}</span><strong>{result.examTitle}</strong><span>{result.correctAnswers}/{result.totalQuestions} correct</span><span className={`attempt-badge ${result.passed ? 'passed' : 'needs-work'}`}>{result.percentage}% · {result.passed ? 'Passed' : 'Try again'}</span></div>)}</div></section>}
    </main>
  );
}
