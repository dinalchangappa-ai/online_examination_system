import React, { useEffect, useState } from 'react';

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export default function ExamPage({ exam, user, onSubmit }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(exam.duration * 60);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const question = exam.questions[current];

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) onSubmit(answers, exam);
  }, [seconds, answers, exam, onSubmit]);

  useEffect(() => {
    function preventClose(event) {
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', preventClose);
    return () => window.removeEventListener('beforeunload', preventClose);
  }, []);

  if (!question) return <main className="app-page"><div className="empty-state"><h2>This exam has no questions.</h2><p>Ask an administrator to add questions before taking this exam.</p></div></main>;
  const answeredCount = Object.keys(answers).length;
  const timeLow = seconds < 60;

  return (
    <main className="exam-page">
      <div className="exam-topbar"><div><span className="exam-mini-logo">E</span><div><strong>{exam.title}</strong><small>Signed in as {user.name}</small></div></div><div className={`countdown ${timeLow ? 'countdown-low' : ''}`} aria-live="polite"><span>◷</span><div><small>TIME REMAINING</small><strong>{formatTime(seconds)}</strong></div></div></div>
      <div className="exam-layout"><aside className="question-sidebar"><div className="sidebar-heading"><span>QUESTIONS</span><strong>{answeredCount}/{exam.questions.length} answered</strong></div><div className="question-numbers">{exam.questions.map((item, index) => <button key={item.id} className={`question-number ${index === current ? 'current' : ''} ${answers[item.id] !== undefined ? 'answered' : ''}`} onClick={() => setCurrent(index)} aria-label={`Question ${index + 1}${answers[item.id] !== undefined ? ', answered' : ', unanswered'}`}>{String(index + 1).padStart(2, '0')}</button>)}</div><div className="question-legend"><span><i className="legend-dot answered-dot" /> Answered</span><span><i className="legend-dot" /> Not answered</span><span><i className="legend-dot current-dot" /> Current</span></div><div className="sidebar-progress"><div className="sidebar-progress-label"><span>YOUR PROGRESS</span><strong>{Math.round((answeredCount / exam.questions.length) * 100)}%</strong></div><div className="preview-progress"><span style={{ width: `${(answeredCount / exam.questions.length) * 100}%` }} /></div></div></aside>
        <section className="question-area"><div className="question-card"><div className="question-card-meta"><span className="eyebrow">QUESTION {String(current + 1).padStart(2, '0')} <span>OF {String(exam.questions.length).padStart(2, '0')}</span></span><span className="marks-label">✦ &nbsp;1 mark</span></div><div className="question-progress"><span style={{ width: `${((current + 1) / exam.questions.length) * 100}%` }} /></div><h1>{question.text}</h1><p className="choose-hint">Choose one answer</p><div className="answer-options">{question.options.map((option, index) => <button className={`answer-option ${answers[question.id] === index ? 'selected' : ''}`} key={option} onClick={() => setAnswers({ ...answers, [question.id]: index })}><span className="option-letter">{String.fromCharCode(65 + index)}</span><span>{option}</span><span className="option-check">{answers[question.id] === index ? '✓' : ''}</span></button>)}</div><div className="question-navigation"><button className="button button-outline" disabled={current === 0} onClick={() => setCurrent(current - 1)}>← Previous</button>{current < exam.questions.length - 1 ? <button className="button button-primary" onClick={() => setCurrent(current + 1)}>Next question →</button> : <button className="button button-primary" onClick={() => setConfirmSubmit(true)}>Submit exam ✓</button>}</div></div><p className="exam-footnote"><span>◈</span> Your answers are saved automatically as you go.</p></section>
      </div>
      {confirmSubmit && <div className="modal-backdrop" role="presentation"><section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="submit-title"><span className="modal-icon">↗</span><h2 id="submit-title">Ready to finish?</h2><p>You’ve answered <strong>{answeredCount} of {exam.questions.length}</strong> questions. {answeredCount < exam.questions.length ? 'Unanswered questions will be marked incorrect.' : 'You’ve answered everything.'}</p><div className="modal-actions"><button className="button button-outline" onClick={() => setConfirmSubmit(false)}>Keep reviewing</button><button className="button button-primary" onClick={() => onSubmit(answers, exam)}>Submit exam</button></div></section></div>}
    </main>
  );
}
