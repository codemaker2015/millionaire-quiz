import React from "react";

const PeopleModal = ({
  percentages,
  closePeopleModalHandler,
  correctAnswerIndex,
}) => {
  return (
    <div className="friendModalOverlay">
      <div className="graph-container">
        <div className="graph-percentages">
          <span>{percentages.A}%</span>
          <span>{percentages.B}%</span>
          <span>{percentages.C}%</span>
          <span>{percentages.D}%</span>

          <button
            onClick={closePeopleModalHandler}
            className="friendModalClose"
          >
            X
          </button>
        </div>
        <div className="graph">
          <div
            style={{
              height: `${percentages.A}%`,
            }}
          ></div>
          <div
            style={{
              height: `${percentages.B}%`,
            }}
          ></div>
          <div
            style={{
              height: `${percentages.C}%`,
            }}
          ></div>
          <div
            style={{
              height: `${percentages.D}%`,
            }}
          ></div>
        </div>

        <div className="graph-desc">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
        </div>
      </div>
    </div>
  );
};

export default PeopleModal;
