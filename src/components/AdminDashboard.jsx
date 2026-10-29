import React, { useMemo, useState } from 'react';

const blankQuestion = () => ({ text: '', options: ['', '', '', ''], answer: 0 });

export default function AdminDashboard({ exams, setExams, results, users }) {
  const [tab, setTab] = useState('exams');
  const [selectedExamId, setSelectedExamId] = useState(exams[0]?.id || '');
  const [examForm, setExamForm] = useState(null);
  const [questionForm, setQuestionForm] = useState(null);
  const [message, setMessage] = useState('');
  const students = users.filter((user) => user.role === 'student');
  const selectedExam = exams.find((exam) => exam.id === selectedExamId);
  const sortedResults = useMemo(() => [...results].reverse(), [results]);

  function flash(text) {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 3500);
  }
  function updateExamList(nextExams, successMessage) {
    try {
      setExams(nextExams);
      flash(successMessage);
    } catch (error) {
      flash(error.message);
    }
  }
  function saveExam(event) {
    event.preventDefault();
    if (!examForm.title.trim() || !examForm.duration || !examForm.passMarks || !examForm.marks) return flash('Please provide a title and valid exam settings.');
    if (examForm.passMarks > examForm.marks) return flash('Passing marks cannot exceed total marks.');
    const exam = { ...examForm, title: examForm.title.trim(), id: examForm.id || `exam-${Date.now()}`, questions: examForm.questions || [] };
    const next = exams.some((item) => item.id === exam.id) ? exams.map((item) => item.id === exam.id ? exam : item) : [...exams, exam];
    setSelectedExamId(exam.id);
    setExamForm(null);
    updateExamList(next, 'Examination saved.');
  }
  function removeExam(exam) {
    if (!window.confirm(`Delete "${exam.title}" and all of its questions? Existing results will be kept.`)) return;
    const next = exams.filter((item) => item.id !== exam.id);
    setSelectedExamId(next[0]?.id || '');
    updateExamList(next, 'Examination deleted.');
  }
  function saveQuestion(event) {
    event.preventDefault();
    if (!selectedExam || !questionForm.text.trim() || questionForm.options.some((option) => !option.trim())) return flash('Enter a question and all four answer options.');
    const question = { ...questionForm, id: questionForm.id || `q-${Date.now()}`, text: questionForm.text.trim(), options: questionForm.options.map((option) => option.trim()), answer: Number(questionForm.answer) };
    const questions = selectedExam.questions.some((item) => item.id === question.id) ? selectedExam.questions.map((item) => item.id === question.id ? question : item) : [...selectedExam.questions, question];
    const marks = Math.max(questions.length, 1);
    const updatedExam = { ...selectedExam, questions, marks, passMarks: Math.min(selectedExam.passMarks || 1, marks) };
    setQuestionForm(null);
    updateExamList(exams.map((item) => item.id === updatedExam.id ? updatedExam : item), 'Question saved.');
  }
  function removeQuestion(question) {
    if (!window.confirm('Delete this question?')) return;
    const questions = selectedExam.questions.filter((item) => item.id !== question.id);
    const marks = Math.max(questions.length, 1);
    const updated = { ...selectedExam, questions, marks, passMarks: Math.min(selectedExam.passMarks || 1, marks) };
    updateExamList(exams.map((item) => item.id === updated.id ? updated : item), 'Question deleted.');
  }
  function exportResults() {
    const header = ['Student', 'Student ID', 'Exam', 'Score', 'Total marks', 'Correct', 'Incorrect', 'Passed', 'Date'];
    const rows = results.map((item) => [item.studentName, item.studentId, item.examTitle, item.score, item.totalMarks, item.correctAnswers, item.incorrectAnswers, item.passed ? 'Yes' : 'No', new Date(item.date).toLocaleString()]);
    const csv = [header, ...rows].map((row) => row.map((field) => `"${String(field ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'examly-results.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-page admin-page"><section className="dashboard-welcome"><div><span className="eyebrow"><span className="eyebrow-dot" /> ADMINISTRATION</span><h1>Admin dashboard <span className="wave">✳</span></h1><p>Manage your exams, questions, and student results.</p></div><button className="button button-primary" onClick={() => { setTab('exams'); setExamForm({ title: '', category: 'General', description: '', duration: 10, marks: 1, passMarks: 1, questions: [] }); }}>＋ New examination</button></section>
      <section className="stat-grid admin-stats"><article className="stat-card"><span className="stat-icon blue-icon">▣</span><div><span>EXAMINATIONS</span><strong>{exams.length}</strong></div></article><article className="stat-card"><span className="stat-icon mint-icon">♙</span><div><span>REGISTERED STUDENTS</span><strong>{students.length}</strong></div></article><article className="stat-card"><span className="stat-icon peach-icon">✓</span><div><span>EXAMS COMPLETED</span><strong>{results.length}</strong></div></article></section>
      {message && <div className="admin-notice" role="status">{message}</div>}
      <section className="admin-panel"><div className="admin-tabs"><button className={tab === 'exams' ? 'selected' : ''} onClick={() => setTab('exams')}>Examinations <span>{exams.length}</span></button><button className={tab === 'results' ? 'selected' : ''} onClick={() => setTab('results')}>Student results <span>{results.length}</span></button></div>
        {tab === 'exams' ? <div className="admin-exam-content">
          {examForm && <form className="admin-form" onSubmit={saveExam}><div className="admin-form-heading"><div><span className="eyebrow">{examForm.id ? 'EDIT EXAMINATION' : 'NEW EXAMINATION'}</span><h3>{examForm.id ? 'Update exam details' : 'Create an examination'}</h3></div><button type="button" className="icon-button" aria-label="Close form" onClick={() => setExamForm(null)}>×</button></div><div className="admin-form-grid"><label>Exam title<input required value={examForm.title} onChange={(event) => setExamForm({ ...examForm, title: event.target.value })} placeholder="e.g. Biology essentials" /></label><label>Category<input required value={examForm.category} onChange={(event) => setExamForm({ ...examForm, category: event.target.value })} placeholder="e.g. Science" /></label><label className="full-field">Description<input required value={examForm.description} onChange={(event) => setExamForm({ ...examForm, description: event.target.value })} placeholder="A short description for students" /></label><label>Duration (minutes)<input required type="number" min="1" value={examForm.duration} onChange={(event) => setExamForm({ ...examForm, duration: Number(event.target.value) })} /></label><label>Total marks<input required type="number" min="1" value={examForm.marks} onChange={(event) => setExamForm({ ...examForm, marks: Number(event.target.value) })} /></label><label>Passing marks<input required type="number" min="1" value={examForm.passMarks} onChange={(event) => setExamForm({ ...examForm, passMarks: Number(event.target.value) })} /></label></div><div className="form-actions"><button type="button" className="button button-outline" onClick={() => setExamForm(null)}>Cancel</button><button className="button button-primary">Save examination</button></div></form>}
          {exams.length === 0 ? <div className="empty-state"><h3>No examinations yet</h3><p>Create an exam to get started.</p></div> : <><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>EXAMINATION</th><th>QUESTIONS</th><th>DURATION</th><th>RESULTS</th><th>ACTIONS</th></tr></thead><tbody>{exams.map((exam) => <tr key={exam.id}><td><strong>{exam.title}</strong><small>{exam.category} · Pass mark {exam.passMarks}/{exam.marks}</small></td><td>{exam.questions.length}</td><td>{exam.duration} min</td><td>{results.filter((result) => result.examId === exam.id).length}</td><td className="table-actions"><button onClick={() => { setSelectedExamId(exam.id); setExamForm({ ...exam }); }}>Edit exam</button><button className="danger-text" onClick={() => removeExam(exam)}>Delete</button></td></tr>)}</tbody></table></div><div className="question-manager"><div className="question-manager-heading"><div><span className="eyebrow">QUESTION BANK</span><h3>Manage questions</h3></div><select aria-label="Select examination" value={selectedExam?.id || ''} onChange={(event) => setSelectedExamId(event.target.value)}>{exams.map((exam) => <option value={exam.id} key={exam.id}>{exam.title}</option>)}</select></div>
            {selectedExam && <><div className="question-admin-list">{selectedExam.questions.map((question, index) => <div className="question-admin-row" key={question.id}><span className="question-admin-index">{String(index + 1).padStart(2, '0')}</span><div><strong>{question.text}</strong><small>Correct answer: {question.options[question.answer]}</small></div><div><button onClick={() => setQuestionForm({ ...question })}>Edit</button><button className="danger-text" onClick={() => removeQuestion(question)}>Delete</button></div></div>)}</div><button className="button button-outline add-question-button" onClick={() => setQuestionForm(blankQuestion())}>＋ Add a question</button></>}
          </div></>}
          {questionForm && selectedExam && <div className="modal-backdrop" role="presentation"><form className="question-form-modal" onSubmit={saveQuestion} role="dialog" aria-modal="true" aria-labelledby="question-form-heading"><div className="admin-form-heading"><div><span className="eyebrow">{questionForm.id ? 'QUESTION BANK' : 'NEW QUESTION'}</span><h3 id="question-form-heading">{questionForm.id ? 'Edit question' : 'Add a question'}</h3></div><button type="button" className="icon-button" aria-label="Close form" onClick={() => setQuestionForm(null)}>×</button></div><label>Question text<textarea required rows="3" value={questionForm.text} onChange={(event) => setQuestionForm({ ...questionForm, text: event.target.value })} placeholder="Write the question here..." /></label><span className="options-label">ANSWER OPTIONS <small>Choose the correct answer</small></span><div className="question-edit-options">{questionForm.options.map((option, index) => <label className="question-edit-option" key={index}><input type="radio" name="correctAnswer" checked={Number(questionForm.answer) === index} onChange={() => setQuestionForm({ ...questionForm, answer: index })} aria-label={`Set option ${String.fromCharCode(65 + index)} as correct`} /><span>{String.fromCharCode(65 + index)}</span><input required value={option} onChange={(event) => { const options = [...questionForm.options]; options[index] = event.target.value; setQuestionForm({ ...questionForm, options }); }} placeholder={`Answer option ${String.fromCharCode(65 + index)}`} /></label>)}</div><div className="form-actions"><button type="button" className="button button-outline" onClick={() => setQuestionForm(null)}>Cancel</button><button className="button button-primary">Save question</button></div></form></div>}
        </div> : <div className="results-content"><div className="results-heading"><div><h3>All student results</h3><p>Review completed examinations and scores.</p></div><button className="button button-outline button-small" onClick={exportResults} disabled={!results.length}>↓ Export CSV</button></div>{results.length === 0 ? <div className="empty-state"><h3>No results to show</h3><p>Completed student exams will appear here.</p></div> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>STUDENT</th><th>EXAMINATION</th><th>SCORE</th><th>ANSWERS</th><th>RESULT</th></tr></thead><tbody>{sortedResults.map((item) => <tr key={item.id}><td><strong>{item.studentName}</strong><small>{item.studentId} · {item.studentEmail}</small></td><td>{item.examTitle}</td><td><strong>{item.score}/{item.totalMarks}</strong> <small>({item.percentage}%)</small></td><td>{item.correctAnswers} correct · {item.incorrectAnswers} incorrect</td><td><span className={`attempt-badge ${item.passed ? 'passed' : 'needs-work'}`}>{item.passed ? 'Passed' : 'Failed'}</span></td></tr>)}</tbody></table></div>}</div>}
      </section>
    </main>
  );
}
