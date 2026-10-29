import { initialExams } from './data.js';

const keys = {
  users: 'examly_users',
  exams: 'examly_exams',
  results: 'examly_results',
};

function read(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Could not read ${key} from localStorage.`, error);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${key} to localStorage.`, error);
    throw new Error('Your browser could not save this change. Check available storage and try again.');
  }
}

export function getUsers() {
  return read(keys.users, []);
}

export function saveUsers(users) {
  write(keys.users, users);
}

export function getExams() {
  const exams = read(keys.exams, null);
  if (Array.isArray(exams)) return exams;
  write(keys.exams, initialExams);
  return initialExams;
}

export function saveExams(exams) {
  write(keys.exams, exams);
}

export function getResults() {
  return read(keys.results, []);
}

export function saveResults(results) {
  write(keys.results, results);
}
