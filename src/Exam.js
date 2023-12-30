import React, { Component } from 'react';

class OnlineExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      score: 0,
      timeLeft: 5,
      timerRunning: false,
      questions: [
  {
    question: 'What is the capital of Turkey?',
    options: ['Istanbul', 'London', 'Berlin', 'Madrid'],
    answer: 0,
  },
  {
    question: 'Which is the largest planet in our solar system?',
    options: ['Mars', 'Jupiter', 'Earth', 'Saturn'],
    answer: 1,
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Salvador Dali'],
    answer: 2,
  },
]
};
}

startTimer = () => {
  this.timer = setInterval(() => {
    clearInterval(this.timer);
    if (this.state.timerRunning) {
      return;
    }
    if (this.state.timeLeft <= 0) {
      clearInterval(this.timer);
      this.setState({
        timerRunning: false
      });
      this.handleAnswer(-1); // time's up, so choose the blank option
    } else {
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1
      }));
    }
  }, 1000);
};

componentDidMount() {
this.startTimer();
}

handleAnswer = (selectedOption) => {
  const { currentQuestion, score, questions } = this.state;
  const correctAnswer = questions[currentQuestion].answer;
  let newScore = score;

  if (selectedOption === correctAnswer) {
    newScore++;
  }

  clearInterval(this.timer);

  this.setState({
    currentQuestion: currentQuestion + 1,
    score: newScore,
    timeLeft: 5,
    timerRunning: currentQuestion === questions.length - 1 ? true : false
  });
};

render() {
  const { currentQuestion, score, questions, timeLeft  } = this.state;
  const currentQuestionObj = questions[currentQuestion];

  return (
    <div className="App">
      {currentQuestion < questions.length ? (
        <div>
          <h1>Question {currentQuestion + 1}:</h1>
          <h2>{currentQuestionObj.question}</h2>
          <h3>Time Left: {timeLeft === -1 ? 0 : timeLeft}</h3>
          <ul>
            {currentQuestionObj.options.map((option, index) => (
              <li key={index} onClick={() => this.handleAnswer(index)}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1>End Of Test!</h1>
          <h2>Score: {score}/{questions.length}</h2>
        </div>
      )}
    </div>
  );
}
}

export default OnlineExam;
