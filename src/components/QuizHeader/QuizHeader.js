import React from "react";
import { numberWithCommas } from "../../utils/numberWithCommas";
import "./QuizHeader.css";

const QuizHeader = ({ id, question, unit, value }) => {
  return (
    <div className="quiz-header">
      <div className="quiz-header-question">
        <p>Question {id}</p>
        <p>{question}</p>
      </div>
      <div className="quiz-header-value">
        <span className="question-value">{numberWithCommas(value)}</span>
        <p>{unit}</p>
      </div>
    </div>
  );
};

export default QuizHeader;
