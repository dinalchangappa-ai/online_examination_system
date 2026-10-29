# Examly — Online Examination System

A beginner-friendly React website for student registration, timed multiple-choice exams, automatic results, and administrator exam management. Demo accounts, exams, questions, and results are stored in the browser's `localStorage`; no backend is required.

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Run in the VS Code terminal

1. Open this project folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

To create and preview a production build, run `npm run build` and then `npm run preview`.

## Try the website

- Create a student account from **Get started**, or log in using an existing account created in this browser.
- Administrator demo login: **admin@exam.com** / **admin123**.
- Students can start an exam, navigate questions, see answered-question status, and submit early or when the timer runs out.
- The admin panel can create, edit, and delete exams and questions, view results, and export results as CSV.
- Sample exams are added automatically the first time the app runs.

## Project layout

```text
src/
  components/
    AdminDashboard.jsx
    AuthPage.jsx
    ExamPage.jsx
    Header.jsx
    Home.jsx
    ResultPage.jsx
    StudentDashboard.jsx
  App.jsx
  data.js
  main.jsx
  storage.js
  styles.css
```

`data.js` contains the sample exams. `storage.js` contains the small localStorage helpers. `App.jsx` connects login, exam, and result state; each page is a separate component.

> This is a student-project demo. Account credentials are kept in localStorage and are not suitable for real-world authentication or sensitive data.
