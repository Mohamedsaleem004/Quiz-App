import type { JSX } from "react";
import { clsx } from "clsx";
import Confetti from "react-confetti";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

//Custom Types

type QuestionSectionProps = {
  check: boolean;
  start: boolean;
  question: string[];
  guessAnswer: string[];
  allAnswers: string[][];
  trueAnswered: string[];
  correctAnswer: string[];
  getAnswers: (answer: string, index: number) => void;
};

export default function QuestionSection({
  check,
  start,
  question,
  guessAnswer,
  allAnswers,
  trueAnswered,
  correctAnswer,
  getAnswers,
}: QuestionSectionProps): JSX.Element {
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const ifAllAnswersTrue: boolean =
    trueAnswered.length === correctAnswer.length;

  const getQuestions: JSX.Element[] = question.map(
    (ques: string, index: number): JSX.Element => {
      const selectedAnswer: string = guessAnswer[index];

      const getAns: JSX.Element[] = allAnswers[index]
        .sort()
        .map((ans: string): JSX.Element => {
          const isSelected: boolean = selectedAnswer === ans;

          const isCorrect: boolean = ans === correctAnswer[index] && check;
          const isIncorrect: boolean =
            isSelected && selectedAnswer !== correctAnswer[index] && check;
          const disabled: boolean = !isSelected && check;

          const style: string = clsx({
            correct: isCorrect,
            incorrect: isIncorrect,
            selected: isSelected && !check,
          });

          return (
            <button
              key={ans}
              className={style}
              onClick={() => getAnswers(ans, index)}
              disabled={disabled}
            >
              {ans}
            </button>
          );
        });

      return (
        <div className="questionAnswer" key={index} data-aos="zoom-in-left">
          <p>
            {" "}
            <span>{index + 1} - </span>
            {ques}
          </p>
          <div className="answer">{getAns}</div>
        </div>
      );
    }
  );

  return (
    <>
      <section className="quizPg">
        {ifAllAnswersTrue && check ? <Confetti /> : null}
        {ifAllAnswersTrue && check ? (
          <p className="checkStatus">
            Congratulations! All your answers are correct! 🥳🎉
          </p>
        ) : null}
        {trueAnswered.length >= correctAnswer.length - 2 &&
        !ifAllAnswersTrue &&
        check ? (
          <p className="checkStatus">Not bad — great effort! 😊</p>
        ) : null}
        {trueAnswered.length <= correctAnswer.length - 3 &&
        !ifAllAnswersTrue &&
        check ? (
          <p className="checkStatus">
            Keep practicing — your score was a bit low. 😔
          </p>
        ) : null}
        {check && <hr></hr>}
        {start && getQuestions}
      </section>
      {check && <hr></hr>}
    </>
  );
}
