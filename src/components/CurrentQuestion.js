import React from "react";

const CurrentQuestion = ({ questions, currentQuestion }) => {
  return (
    <div className="questions">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={
            currentQuestion === question.id ? "question active" : "question"
          }
        >
          <span className="question-number">{question.id}</span>
          <span className="question-amount">₹{question.amount}</span>
        </div>
      ))}
    </div>
  );
};

export default CurrentQuestion;
