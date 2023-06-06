import React from "react";
import { VscUnmute, VscMute } from "react-icons/vsc";

const Questions = ({
  questionsAnswers,
  currentQuestion,
  answersArray,
  confirmAnswerHandler,
  isTimeOut,
  index,
  classes,
  message,
  amountWon,
  setIsStoped,
  isStoped,
}) => {
  const muteHandler = () => {
    setIsStoped(true);
  };

  const unmuteHandler = () => {
    setIsStoped(false);
  };

  let arr = ["A)", "B)", "C)", "D)"];

  return (
    <div className="current-question__container">
      {!isStoped && <VscUnmute onClick={muteHandler} className="mute" />}
      {isStoped && <VscMute onClick={unmuteHandler} className="mute" />}
      <p className="msg">{message}</p>
      <div className="current-question">
        {questionsAnswers[currentQuestion - 1]?.question}
      </div>

      <div className="answers">
        {answersArray?.map((answer, ind) => (
          <button
            disabled={isTimeOut ? true : false}
            key={ind}
            onClick={() => confirmAnswerHandler(answer, ind)}
            className={isTimeOut && ind === index ? classes : "answer"}
          >
            <span>{arr[ind]}</span>
            <span>{answer.answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
