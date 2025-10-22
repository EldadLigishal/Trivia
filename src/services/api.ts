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

export enum Category {
  Sports = '21',
  General = '9',
  History = '10',
}

export const fetchTriviaQuestions = async (
  amount: number,
  diffculty: Difficulty,
  category: Category
): Promise<QuestionState[]> => {
  //https://opentdb.com/api.php?amount=10&category=23
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${diffculty}`;
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
