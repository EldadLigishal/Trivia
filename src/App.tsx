import { useState } from "react";
import { GlobalStyle, Wrapper } from "./App.style";
import QuestionCard from "./components/QuestionCard";
import { fetchTriviaQuestions } from "./services/api";
import { Difficulty, QuestionState } from "./services/api";

const TOTAL = 10;
export interface AnswerObj {
  question: string;
  answer: string;
  correct: boolean;
  correctAns: string;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchTriviaQuestions(TOTAL, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setIndex(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;
      const correct = questions[index].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObj = {
        question: questions[index].question,
        answer,
        correct,
        correctAns: questions[index].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextQ = index + 1;

    if (nextQ === TOTAL) {
      setGameOver(true);
    } else {
      setIndex(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />{" "}
      <Wrapper>
        <div className="App">
          <h1>Trivia</h1>
          {gameOver || userAnswer.length === TOTAL ? (
            <>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                <option value={Difficulty.EASY}>Easy</option>
                <option value={Difficulty.MEDIUM}>Medium</option>
                <option value={Difficulty.HARD}>Hard</option>
              </select>
              <button className="start" onClick={startTrivia}>
                Start
              </button>
            </>
          ) : null}
          {!gameOver && <p className="score">Score: {score}</p>}
          {loading && <p>Loading Question...</p>}
          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={index + 1}
              totalQuestions={TOTAL}
              question={questions[index].question}
              answers={questions[index].answers}
              userAnswer={userAnswer ? userAnswer[index] : undefined}
              callback={checkAnswer}
            />
          )}
          {!gameOver &&
          !loading &&
          userAnswer.length === index + 1 &&
          index !== TOTAL ? (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          ) : null}
        </div>
      </Wrapper>
    </>
  );
}

export default App;
