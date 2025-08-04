import React from "react";
import type { JSX } from "react";

//Components
import Intro from "./components/Intro.tsx";
import QuestionSection from "./components/QuestionSection.tsx";
import CheckAnswerCom from "./components/CheckAnswer.tsx";

// Custom Types
type Quiz = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
type QuizApiResponse = {
  response_code: number;
  results: Quiz[];
};

export default function App(): JSX.Element {
  const [quiz, setQuestion] = React.useState<Quiz[]>([]);
  const [start, isStart] = React.useState<boolean>(false);
  const [guessAnswer, setQuessAnswer] = React.useState<string[]>([]);
  const [check, isCheck] = React.useState<boolean>(false);
  const [showBtn, setShowBtn] = React.useState<boolean>(false);
  const [questionCount, setCount] = React.useState<number>(0);
  const [category, setCategory] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState<boolean>(false);
  const [statusCode, setStatusCode] = React.useState<number>(200);

  const allAnswers: string[][] = quiz.map((ques: Quiz): string[] =>
    [...ques.incorrect_answers, ques.correct_answer].flat()
  );
  const correctAnswer: string[] = quiz.map(
    (ques: Quiz): string => ques.correct_answer
  );
  const question: string[] = quiz.map((ques: Quiz): string => ques.question);
  const checkAllAnswer: boolean =
    guessAnswer.length === correctAnswer.length &&
    guessAnswer.every((guess: string): boolean => guess !== "");
  const trueAnswered: string[] = correctAnswer.filter(
    (correct: string): boolean => guessAnswer.includes(correct)
  );
  const answerScore: string = `You scored ${trueAnswered.length} / ${correctAnswer.length} `;
  const startOrNot: boolean = questionCount > 0 && category > 0;

  async function fetchApi() {
    try {
      const response: Response = await fetch(
        `https://opentdb.com/api.php?amount=${questionCount}&category=${category}&difficulty=medium&type=multiple`
      );

      const data: QuizApiResponse = await response.json();
      setStatus(response.ok);
      setStatusCode(response.status);

      if (response.status > 200) {
        alert(
          "Network error. Please check your internet connection and try again."
        );
      }
      if (!response.ok) {
        alert(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setQuestion(data.results);

        // I initialized an array of strings to match the number of questions.
        // Without this, if the user answers only the last question, the guessedArray
        // would contain empty values for the previous questions, and only the last index
        // would hold a selected answer. This ensures the array has consistent length and indexing.

        setQuessAnswer(Array(data.results.length).fill(""));
      }
    } catch (err) {
      console.error("Fetch Err", err);
    } finally {
      setLoading(false);
      setShowBtn(true);
    }
  }

  function startQuiz(): void {
    if (startOrNot) {
      isStart((preV) => !preV);
      setLoading(true);

      fetchApi();
    } else {
      alert(
        "Please select the quiz category (e.g., General Knowledge).\n Also, select how many questions you want to answer."
      );
    }
  }

  function playAgain(): void {
    isStart((preV) => !preV);
    setQuessAnswer([]);
    isCheck((preV) => !preV);
    setCategory(0);
    setCount(0);
    setQuestion([]);

    //fetchApi()
  }

  function handleClick(event: React.ChangeEvent<HTMLInputElement>): void {
    setCount(Number(event.target.value));
  }

  function checkCategory(event: React.ChangeEvent<HTMLInputElement>): void {
    setCategory(Number(event.target.value));
  }

  function getAnswers(answer: string, index: number): void {
    setQuessAnswer((preV: string[]): string[] => {
      const updated: string[] = [...preV];

      updated[index] = answer;
      return updated;
    });
  }

  function checkAnswer(): void {
    isCheck((preV) => !preV);
  }

  return (
    <main>
      <Intro
        start={start}
        onChange={handleClick}
        startQuiz={startQuiz}
        checkCategory={checkCategory}
        loading={loading}
        startOrNot={startOrNot}
        status={status}
        statusCode={statusCode}
      />

      <QuestionSection
        check={check}
        question={question}
        guessAnswer={guessAnswer}
        allAnswers={allAnswers}
        correctAnswer={correctAnswer}
        getAnswers={getAnswers}
        trueAnswered={trueAnswered}
        start={start}
      />

      <CheckAnswerCom
        start={start}
        check={check}
        checkAllAnswer={checkAllAnswer}
        answerScore={answerScore}
        playAgain={playAgain}
        checkAnswer={checkAnswer}
        showBtn={showBtn}
        loading={loading}
        question={question}
      />
    </main>
  );
}
