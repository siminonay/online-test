import React, { Component } from 'react';
import './App.css';
import { makeCall } from './WrappedApp';
import { makeFailCall } from './WrappedAppFail';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: null,
      currentQuestion: 0,
      score: 0,
      timeLeft: 5,
      timerRunning: false,
      questions: [
  {
    question: 'What is the capital of Turkey?',
    options: ['Ankara', 'London', 'Berlin', 'Madrid'],
    answer: 0,
  },
  {
    question: 'Which one is the largest planet in our solar system?',
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
    this.setState({intervalId:this.timer})
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

  clearInterval(this.state.intervalId);

  this.setState({
    intervalId: null,
    currentQuestion: currentQuestion + 1,
    score: newScore,
    timeLeft: 5,
    timerRunning: currentQuestion === questions.length - 1 ? true : false
  });
  this.startTimer();
};

checkScore = () => {
  if(this.state.score === this.state.questions.length) {
    makeCall();
  } else {
    makeFailCall();
  }
}

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
          <button className='button' onClick={this.checkScore}>Done</button>
        </div>
      )}
    </div>
  );
}
}

export default App;
