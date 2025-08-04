import type { JSX } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import React from "react";

//Custom Types
type IntroPros = {
  start: boolean;
  loading: boolean;
  startOrNot: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  startQuiz: () => void;
  checkCategory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  status: boolean;
  statusCode: number;
};

export default function Intro({
  start,
  loading,
  startOrNot,
  onChange,
  startQuiz,
  checkCategory,
  status,
  statusCode,
}: IntroPros): JSX.Element {
  React.useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const checkStatusCode: boolean = statusCode > 400 || !status;
  return (
    <>
      {start && checkStatusCode && !loading && (
        <h2>
          Network error. Please check your internet connection and try again.
        </h2>
      )}
      {loading && (
        <div id="showLoading">
          <p>Loading </p>
          <div className="spinner"></div>
        </div>
      )}

      {!start && (
        <section className="intro" data-aos="zoom-in">
          <h1>Quizzical</h1>
          <p>
            {" "}
            Ready to test your knowledge? Select a category and the number of
            questions you want to attempt, then click "Start Quiz" to get going!
          </p>

          <form id="topicQuestion">
            <label htmlFor="science">
              <input
                type="radio"
                id="science"
                name="topic"
                value={18}
                onChange={checkCategory}
              />{" "}
              Science : Computers
            </label>

            <label htmlFor="history">
              <input
                type="radio"
                id="history"
                name="topic"
                value={23}
                onChange={checkCategory}
              />{" "}
              History
            </label>

            <label htmlFor="sports">
              <input
                type="radio"
                id="sports"
                name="topic"
                value={21}
                onChange={checkCategory}
              />{" "}
              Sports
            </label>

            <label htmlFor="generalKnowledge">
              <input
                type="radio"
                id="generalKnowledge"
                name="topic"
                value={9}
                onChange={checkCategory}
              />{" "}
              General Knowledge
            </label>

            <label htmlFor="politics">
              <input
                type="radio"
                id="politics"
                name="topic"
                value={24}
                onChange={checkCategory}
              />
              Politics
            </label>

            <label htmlFor="vehicles">
              <input
                type="radio"
                id="vehicles"
                name="topic"
                value={28}
                onChange={checkCategory}
              />
              Vehicles
            </label>

            <label htmlFor="animals">
              <input
                type="radio"
                id="animals"
                name="topic"
                value={27}
                onChange={checkCategory}
              />
              Animals
            </label>
          </form>

          <p>Pick how many questions you want to answer:</p>

          <form id="quantityQuestion">
            <label htmlFor="fiveQuestions">
              <input
                type="radio"
                id="fiveQuestions"
                name="questionQuantity"
                value={5}
                onChange={onChange}
              />{" "}
              Five
            </label>

            <label htmlFor="tenQuestions">
              <input
                type="radio"
                id="tenQuestions"
                name="questionQuantity"
                value={10}
                onChange={onChange}
              />{" "}
              Ten
            </label>

            <label htmlFor="fifteenQuestions">
              <input
                type="radio"
                id="fifteenQuestions"
                name="questionQuantity"
                value={15}
                onChange={onChange}
              />{" "}
              Fifteen
            </label>
          </form>

          {startOrNot && <button onClick={startQuiz}>Start Quiz</button>}
        </section>
      )}
    </>
  );
}
