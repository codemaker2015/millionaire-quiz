import React from "react";

const FriendModal = ({
  questionsAnswers,
  currentQuestion,
  friendAnswer,
  closeFriendModalHandler,
  answerIndex,
}) => {
  let arr = ["A)", "B)", "C)", "D)"];
  let answer = questionsAnswers[currentQuestion - 1];
  return (
    <div className="friendModalOverlay">
      <div className="friendModalContent">
        <span>
          Me : Question goes like this
          {`"${answer.question}", A) ${answer.answers[0].answer}, B) ${answer.answers[1].answer}, C) ${answer.answers[2].answer}, D) ${answer.answers[3].answer}`}
        </span>
        <span>
          Friend: I think answer is {arr[answerIndex]} "{friendAnswer}"
        </span>
        ;
        <button onClick={closeFriendModalHandler} className="friendModalClose">
          X
        </button>
      </div>
    </div>
  );
};

export default FriendModal;
