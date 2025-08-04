//Custom Types
import type { JSX } from "react";

type CheckAnswerProps = {
  start: boolean;
  check: boolean;
  checkAllAnswer: boolean;
  answerScore: string;
  playAgain: () => void;
  showBtn: boolean;
  checkAnswer: () => void;
  loading: boolean;
  question: string[];
};

export default function CheckAnswerCom({
  start,
  check,
  checkAllAnswer,
  answerScore,
  playAgain,
  showBtn,
  checkAnswer,
  loading,
  question,
}: CheckAnswerProps): JSX.Element {
  return (
    <>
      {start && (
        <section id="checkAnswer">
          {checkAllAnswer && (
            <div>
              {check && <p>{answerScore}</p>}
              {check && loading === false ? (
                <button className="playAgain" onClick={playAgain}>
                  Play again
                </button>
              ) : checkAllAnswer &&
                showBtn &&
                !loading &&
                question.length > 0 ? (
                <button onClick={checkAnswer}>Check Answer</button>
              ) : null}
            </div>
          )}
        </section>
      )}
    </>
  );
}
