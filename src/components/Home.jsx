import React from 'react';

export default function Home({ setPage }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
          <h1>Show what you<br /> <span>know.</span> Anywhere.</h1>
          <p className="hero-description">A calmer, smarter way to take online exams. Focus on the questions — we’ll take care of the rest.</p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => setPage('login')}>Start an exam <span aria-hidden="true">→</span></button>
            <button className="text-button" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>See how it works <span aria-hidden="true">↓</span></button>
          </div>
          <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>M</span><span>J</span><span>+</span></div><p><strong>Easy to use.</strong> Made for learners like you.</p></div>
        </div>
        <div className="hero-visual" aria-label="Preview of the examination dashboard">
          <div className="decor decor-one" /><div className="decor decor-two" />
          <div className="exam-preview">
            <div className="preview-top"><span className="preview-dot" /><span className="preview-dot" /><span className="preview-dot" /><span className="preview-label">EXAM PREVIEW</span><span className="preview-menu">···</span></div>
            <div className="preview-body">
              <div className="preview-tag">WEB DEVELOPMENT <span>● LIVE</span></div>
              <h3>HTML &amp; CSS<br />Fundamentals</h3>
              <p>Question 3 of 10</p>
              <div className="preview-progress"><span /></div>
              <div className="preview-question">Which tag creates a hyperlink in HTML?</div>
              <div className="preview-option selected"><i>A</i> &lt;a&gt; <b>✓</b></div>
              <div className="preview-option"><i>B</i> &lt;link&gt;</div>
              <div className="preview-option"><i>C</i> &lt;href&gt;</div>
              <div className="preview-bottom"><span>← Previous</span><button>Next question →</button></div>
            </div>
          </div>
          <div className="floating-card timer-float"><span className="float-icon">◷</span><div><strong>09:42</strong><small>Time remaining</small></div><span className="timer-pulse" /></div>
          <div className="floating-card score-float"><span className="score-check">✓</span><div><strong>You’re doing great!</strong><small>Keep up the momentum</small></div></div>
        </div>
        <div className="hero-bottom-line"><span>01 — 03</span><span className="bottom-line" /><span>TAKE THE NEXT STEP</span></div>
      </section>
      <section className="features-section" id="how-it-works">
        <div className="section-heading"><span className="eyebrow">A BETTER WAY TO LEARN</span><h2>Everything you need.<br /><span>Nothing in your way.</span></h2></div>
        <div className="feature-grid">
          <article className="feature-card"><span className="feature-icon blue-icon">◷</span><h3>At your own pace</h3><p>Clear timers and simple navigation help you stay focused from the first question to the last.</p><span className="feature-number">01</span></article>
          <article className="feature-card"><span className="feature-icon mint-icon">✓</span><h3>Results, right away</h3><p>Finish your exam and get your score, correct answers, and feedback instantly.</p><span className="feature-number">02</span></article>
          <article className="feature-card"><span className="feature-icon peach-icon">⌘</span><h3>Made for everyone</h3><p>A clean, friendly experience that works smoothly on your phone, tablet, or computer.</p><span className="feature-number">03</span></article>
        </div>
      </section>
      <footer className="site-footer"><a className="brand footer-brand" href="#" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><span className="brand-mark">E</span><span>examly<span className="brand-dot">.</span></span></a><span>Learning, one question at a time.</span><span>© 2025 Examly</span></footer>
    </main>
  );
}
