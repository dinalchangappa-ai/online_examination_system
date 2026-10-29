import React, { useState } from 'react';

export default function AuthPage({ mode, setPage, onLogin, onRegister }) {
  const [values, setValues] = useState({ name: '', email: '', password: '', studentId: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const isRegister = mode === 'register';

  function update(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    setError('');
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return setError('Enter a valid email address.');
    if (values.password.length < 6) return setError('Password must be at least 6 characters.');
    if (isRegister && (!values.name.trim() || !values.studentId.trim())) return setError('Please complete every field.');
    setBusy(true);
    try {
      if (isRegister) onRegister(values);
      else onLogin(values.email, values.password);
    } catch (submissionError) {
      setError(submissionError.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <aside className="auth-aside"><span className="eyebrow"><span className="eyebrow-dot" /> YOUR LEARNING SPACE</span><h1>Big goals.<br /><span>One question</span><br />at a time.</h1><p>Log in, find your next exam, and show how far you’ve come.</p><div className="aside-note"><span>✦</span> A focused space to do your best work.</div></aside>
      <section className="auth-card">
        <div className="auth-card-top"><span className="auth-icon">{isRegister ? '✳' : '↗'}</span><span className="auth-step">{isRegister ? 'LET’S GET STARTED' : 'WELCOME BACK'}</span></div>
        <h2>{isRegister ? 'Create your account' : 'Sign in to Examly'}</h2><p className="auth-intro">{isRegister ? 'A few details and you’re ready to go.' : 'Your next great result is just around the corner.'}</p>
        <form onSubmit={submit} noValidate>
          {isRegister && <label>Full name<input name="name" value={values.name} onChange={update} placeholder="e.g. Alex Morgan" autoComplete="name" required /></label>}
          <label>Email address<input name="email" type="email" value={values.email} onChange={update} placeholder="you@example.com" autoComplete="email" required /></label>
          {isRegister && <label>Student ID<input name="studentId" value={values.studentId} onChange={update} placeholder="e.g. STU-2025-001" required /></label>}
          <label>Password<input name="password" type="password" value={values.password} onChange={update} placeholder="At least 6 characters" autoComplete={isRegister ? 'new-password' : 'current-password'} required minLength={6} /></label>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="button button-primary auth-submit" disabled={busy}>{isRegister ? 'Create account' : 'Log in'} <span aria-hidden="true">→</span></button>
        </form>
        <p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to Examly?'} <button onClick={() => setPage(isRegister ? 'login' : 'register')}>{isRegister ? 'Log in' : 'Create an account'}</button></p>
        {!isRegister && <div className="demo-hint">Admin demo: <strong>admin@exam.com</strong> / <strong>admin123</strong></div>}
        <button className="back-home" onClick={() => setPage('home')}>← Back to home</button>
      </section>
    </main>
  );
}
