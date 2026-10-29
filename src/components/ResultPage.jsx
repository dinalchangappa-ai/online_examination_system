import React from 'react';

export default function ResultPage({ result, setPage }) {
  const circumference = 2 * Math.PI * 53;
  const progress = (result.percentage / 100) * circumference;
  return (
    <main className="result-page"><div className="result-back"><button className="text-button" onClick={() => setPage('dashboard')}>← Back to dashboard</button></div><section className="result-card"><div className={`result-status-icon ${result.passed ? 'pass-icon' : 'fail-icon'}`}>{result.passed ? '✓' : '↻'}</div><span className="eyebrow">{result.passed ? 'WELL DONE — YOU DID IT' : 'EVERY ATTEMPT IS PROGRESS'}</span><h1>{result.passed ? 'You passed!' : 'Keep going!'}</h1><p className="result-subtitle">{result.passed ? 'A great result. Take a moment to be proud of yourself.' : 'You’re learning every time. Review the material and give it another go.'}</p>
        <div className="score-ring"><svg viewBox="0 0 120 120" aria-label={`${result.percentage} percent`}><circle className="ring-track" cx="60" cy="60" r="53" /><circle className="ring-progress" cx="60" cy="60" r="53" strokeDasharray={`${progress} ${circumference}`} /></svg><div className="score-ring-value"><strong>{result.percentage}%</strong><span>YOUR SCORE</span></div></div>
        <div className="result-summary"><div><span>MARKS OBTAINED</span><strong>{result.score} <small>/ {result.totalMarks}</small></strong></div><div><span>CORRECT ANSWERS</span><strong>{result.correctAnswers} <small>/ {result.totalQuestions}</small></strong></div><div><span>INCORRECT ANSWERS</span><strong>{result.incorrectAnswers} <small>/ {result.totalQuestions}</small></strong></div></div>
        <div className={`pass-banner ${result.passed ? '' : 'fail-banner'}`}><span>{result.passed ? '✦' : '↗'}</span><p><strong>{result.passed ? 'Passing marks achieved' : 'Passing marks not reached'}</strong><small>Required: {result.passMarks} out of {result.totalMarks} marks</small></p><span className="pass-value">{result.score}/{result.totalMarks}</span></div>
        <button className="button button-primary result-button" onClick={() => setPage('dashboard')}>Back to dashboard <span aria-hidden="true">→</span></button><p className="result-exam-name">{result.examTitle}</p></section></main>
  );
}
