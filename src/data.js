export const initialExams = [
  {
    id: 'web-basics',
    title: 'Web Development Basics',
    category: 'Technology',
    description: 'Test your knowledge of HTML, CSS, and the web.',
    duration: 10,
    marks: 5,
    passMarks: 3,
    questions: [
      { id: 'web-1', text: 'What does HTML stand for?', options: ['Hyper Trainer Marking Language', 'HyperText Markup Language', 'HighText Machine Language', 'Hyperlink and Text Markup Language'], answer: 1 },
      { id: 'web-2', text: 'Which CSS property changes the text color?', options: ['font-style', 'text-color', 'color', 'background-color'], answer: 2 },
      { id: 'web-3', text: 'Which HTML element is used for the largest heading?', options: ['<heading>', '<h6>', '<head>', '<h1>'], answer: 3 },
      { id: 'web-4', text: 'Which language adds interactivity to a web page?', options: ['JavaScript', 'SQL', 'XML', 'C'], answer: 0 },
      { id: 'web-5', text: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Creative Style System', 'Cascading Style Sheets', 'Colorful Style Sheets'], answer: 2 },
    ],
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    category: 'Programming',
    description: 'A quick assessment of JavaScript essentials.',
    duration: 8,
    marks: 5,
    passMarks: 3,
    questions: [
      { id: 'js-1', text: 'Which keyword declares a block-scoped variable that can be reassigned?', options: ['const', 'let', 'static', 'define'], answer: 1 },
      { id: 'js-2', text: 'What is the result of typeof [] in JavaScript?', options: ['"array"', '"object"', '"list"', '"undefined"'], answer: 1 },
      { id: 'js-3', text: 'Which method adds an item to the end of an array?', options: ['push()', 'shift()', 'pop()', 'unshift()'], answer: 0 },
      { id: 'js-4', text: 'How do you write a single-line comment?', options: ['<!-- comment -->', '# comment', '// comment', '** comment'], answer: 2 },
      { id: 'js-5', text: 'Which value represents an intentional absence of any object value?', options: ['0', 'false', 'undefined', 'null'], answer: 3 },
    ],
  },
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    category: 'General',
    description: 'Explore a few interesting facts from around the world.',
    duration: 6,
    marks: 5,
    passMarks: 3,
    questions: [
      { id: 'gk-1', text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], answer: 1 },
      { id: 'gk-2', text: 'What is the capital city of Japan?', options: ['Seoul', 'Bangkok', 'Tokyo', 'Beijing'], answer: 2 },
      { id: 'gk-3', text: 'How many sides does a hexagon have?', options: ['Five', 'Six', 'Seven', 'Eight'], answer: 1 },
      { id: 'gk-4', text: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
      { id: 'gk-5', text: 'What is the process by which plants make food using sunlight?', options: ['Respiration', 'Photosynthesis', 'Evaporation', 'Fermentation'], answer: 1 },
    ],
  },
];

export const ADMIN_EMAIL = 'admin@exam.com';
export const ADMIN_PASSWORD = 'admin123';
