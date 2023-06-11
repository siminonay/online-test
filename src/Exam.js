import React, { useState } from 'react';

let questions = [
  {
    question: 'What is the capital of Turkey?',
    options: ['Istanbul', 'London', 'Berlin', 'Madrid'],
    answer: 'Istanbul',
  },
  {
    question: 'Which is the largest planet in our solar system?',
    options: ['Mars', 'Jupiter', 'Earth', 'Saturn'],
    answer: 'Jupiter',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Salvador Dali'],
    answer: 'Leonardo da Vinci',
  },
];

let OnlineExam = () => {
  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [selectedOption, setSelectedOption] = useState('');
  let [score, setScore] = useState(0);
  let [showResult, setShowResult] = useState(false);

  let handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  let handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption('');
    setCurrentQuestion(currentQuestion + 1);
  };

  let handleFinishExam = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  let renderQuestions = () => {
    let question = questions[currentQuestion];

    return (
      <div>
        <h2>{question.question}</h2>
        <ul>
          {question.options.map((option, index) => (
            <li key={index} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
        <button onClick={handleNextQuestion} disabled={!selectedOption}>
          Next
        </button>
      </div>
    );
  };

  let renderResult = () => {
    return (
      <div>
        <h2>Exam Result</h2>
        <p>Your score: {score}/{questions.length}</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Online Examination</h1>
      {!showResult && renderQuestions()}
      {showResult && renderResult()}
      {!showResult && currentQuestion === questions.length - 1 && (
        <button onClick={handleFinishExam} disabled={!selectedOption}>
          Finish Exam
        </button>
      )}
    </div>
  );
};

export default OnlineExam;
