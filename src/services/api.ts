import { shuffleArray } from "./utills";
export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuestionState extends Question {
  answers: string[];
}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchTriviaQuestions = async (
  amount: number,
  diffculty: Difficulty
): Promise<QuestionState[]> => {
  const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${diffculty}`;
  const data = await (await fetch(url)).json();
  //   console.log(data);
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
