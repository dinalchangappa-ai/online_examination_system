import React from 'react';

export default function Header({ user, page, setPage, onLogout }) {
  return (
    <header className="site-header">
      <a className="brand" href="#" onClick={(event) => { event.preventDefault(); setPage(user ? (user.role === 'admin' ? 'admin' : 'dashboard') : 'home'); }}>
        <span className="brand-mark">E</span>
        <span>examly<span className="brand-dot">.</span></span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        {!user ? (
          <>
            <button className={`nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => setPage('home')}>Home</button>
            <a className="nav-link" href="#how-it-works">How it works</a>
            <button className="button button-outline button-small" onClick={() => setPage('login')}>Log in</button>
            <button className="button button-primary button-small" onClick={() => setPage('register')}>Get started <span aria-hidden="true">→</span></button>
          </>
        ) : (
          <>
            <button className={`nav-link ${page === 'dashboard' ? 'active' : ''}`} onClick={() => setPage(user.role === 'admin' ? 'admin' : 'dashboard')}>{user.role === 'admin' ? 'Admin panel' : 'Dashboard'}</button>
            <span className="header-user"><span className="avatar">{(user.name || 'A').charAt(0).toUpperCase()}</span><span className="header-user-name">{user.name}</span></span>
            <button className="nav-link logout-link" onClick={onLogout}>Log out</button>
          </>
        )}
      </nav>
    </header>
  );
}
