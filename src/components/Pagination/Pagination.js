import React from "react";
import "./Pagination.css";

const Pagination = ({ questions, questionNumber, setQuestionNumber }) => {
  return (
    <div className="paginationBtns">
      {questions.map((q, index) => {
        return (
          <button
            className={`paginationBtn ${
              index === questionNumber && "active-btn"
            }`}
            key={q.id}
            onClick={() => setQuestionNumber(index)}
          >
            {q.id}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
