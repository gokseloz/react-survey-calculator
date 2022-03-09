import React from "react";
import "./Buttons.css";

export const NextButton = ({
  questionNumber,
  setQuestionNumber,
  questions,
}) => {
  const nextQuestion = () => {
    if (questionNumber === questions.length - 1) {
      setQuestionNumber(questions.length - 1);
    } else {
      setQuestionNumber((prevQuestion) => prevQuestion + 1);
    }
  };

  return (
    <button className="nextBtn" onClick={nextQuestion}>
      Next Question
    </button>
  );
};

export const PrevButton = ({ questionNumber, setQuestionNumber }) => {
  const prevQuestion = () => {
    if (questionNumber === 0) {
      setQuestionNumber(0);
    } else {
      setQuestionNumber((prevQuestion) => prevQuestion - 1);
    }
  };

  return (
    <button className="prevBtn" onClick={prevQuestion}>
      Previous Question
    </button>
  );
};
