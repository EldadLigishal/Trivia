import { AnswerObj } from "../App";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

interface Props {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => (
  <Wrapper>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <ButtonWrapper
          key={answer}
          $correct={userAnswer?.correctAns === answer}
          $userClicked={userAnswer?.answer === answer}
        >
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
