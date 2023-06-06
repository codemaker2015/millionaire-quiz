import React from "react";

const ConfirmAnswer = ({
  exitConfirmModalHandler,
  checkCorrectHandler,
  id,
  index,
  setConfirmModal,
}) => {
  const nextQuestionHandler = () => {
    checkCorrectHandler(id, index);
    setConfirmModal(null);
  };

  return (
    <div className="confirmModalOverlay">
      <div className="confirmModalContent">
        <span>Are You Sure?</span>
        <div>
          <span onClick={nextQuestionHandler}>Yes</span>
          <span onClick={exitConfirmModalHandler}>No</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAnswer;
