import React from "react";
import { BsTelephone, BsPeople } from "react-icons/bs";

const LifeLines = ({
  friendModal,
  gameState,
  isTimeOut,
  phoneFriendHandler,
  fiftyFiftyHandler,
  splitDisabled,
  askPeopleModal,
  askPeopleHandler,
}) => {
  return (
    <div className="lifeLines">
      <button
        disabled={
          friendModal === false ||
          gameState === "win" ||
          isTimeOut === true ||
          gameState === "lose"
            ? true
            : false
        }
        onClick={phoneFriendHandler}
        className="lifeLine"
      >
        <BsTelephone className="phoneIcon" />
      </button>
      <button
        disabled={
          splitDisabled ||
          gameState === "win" ||
          isTimeOut === true ||
          gameState === "lose"
            ? true
            : false
        }
        onClick={fiftyFiftyHandler}
        className="lifeLine"
      >
        <span>50:50</span>
      </button>
      <button
        disabled={
          askPeopleModal === false ||
          gameState === "win" ||
          isTimeOut === true ||
          gameState === "lose"
            ? true
            : false
        }
        onClick={askPeopleHandler}
        className="lifeLine"
      >
        <BsPeople className="peopleIcon" />
      </button>
    </div>
  );
};

export default LifeLines;
