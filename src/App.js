import "./App.css";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import CurrentQuestion from "./components/CurrentQuestion";
import LifeLines from "./components/LifeLines";
import PeopleModal from "./components/PeopleModal";
import FriendModal from "./components/FriendModal";
import Questions from "./components/Questions";
import PlayAgainModal from "./components/PlayAgainModal";
import wrongAnswer from "./assets/wrongAnswer.mp3";
import split from "./assets/split.mp3";
import correctAnswer from "./assets/correctAnswer.mp3";
import ConfirmAnswer from "./components/ConfirmAnswer";
import win from "./assets/Win.mp3";
import data from "./assets/questions.json";

const questions = [
  { id: 1, amount: 1000 },
  { id: 2, amount: 2000 },
  { id: 3, amount: 4000 },
  { id: 4, amount: 8000 },
  { id: 5, amount: 16000 },
  { id: 6, amount: 32000 },
  { id: 7, amount: 64000 },
  { id: 8, amount: 125000 },
  { id: 9, amount: 250000 },
  { id: 10, amount: 500000 },
  { id: 11, amount: 1000000 },
].reverse();

function App() {
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [id, setId] = useState(null);
  const [index, setIndex] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [amountWon, setAmountWon] = useState(0);
  const [gameState, setGameState] = useState("");
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [splitDisabled, setSplitDisabled] = useState(null);
  const [friendModal, setFriendModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [friendAnswer, setFriendAnswer] = useState("");
  const [askPeopleModal, setAskPeopleModal] = useState(null);
  const [percentages, setPercentages] = useState({});
  const [classes, setClasses] = useState("answer");
  const [message, setMessage] = useState("");
  const [playWrong, { stop: stopWrong }] = useSound(wrongAnswer);
  const [playCorrect, { stop: stopCorrect }] = useSound(correctAnswer);
  const [playSplit] = useSound(split);
  const [playWin, { stop }] = useSound(win);
  const [isStoped, setIsStoped] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const allQuestions = data.map(
        ({ id, question, correctAnswer, incorrectAnswers }) => {
          return {
            id,
            question,
            answers: [...incorrectAnswers]
              .map((answ) => {
                return { answer: answ, correct: false };
              })
              .concat({ answer: correctAnswer, correct: true })
              .sort(() => Math.random() - 0.5),
          };
        }
      );

      setQuestionsAnswers([...allQuestions]);
      setAnswersArray(allQuestions[currentQuestion - 1].answers);
    };

    fetchQuestions();
  }, [currentQuestion, gameState]);

  const askPeopleHandler = () => {
    setAskPeopleModal(true);

    let aRandom = Math.floor(Math.random() * 100);
    let bRandom = Math.floor(Math.random() * 100);
    let cRandom = Math.floor(Math.random() * 100);
    let dRandom = Math.floor(Math.random() * 100);

    let total = aRandom + bRandom + cRandom + dRandom;

    let aRandomPerc = (aRandom / total) * 100;
    let bRandomPerc = (bRandom / total) * 100;
    let cRandomPerc = (cRandom / total) * 100;
    let dRandomPerc = (dRandom / total) * 100;

    let percentages = {
      A: aRandomPerc.toFixed(),
      B: bRandomPerc.toFixed(),
      C: cRandomPerc.toFixed(),
      D: dRandomPerc.toFixed(),
    };

    setPercentages(percentages);
  };

  const closePeopleModalHandler = () => {
    setAskPeopleModal(false);
  };

  const playAgainHandler = () => {
    setIsGameOver(false);
    setAmountWon(0);
    setGameState("");
    setCurrentQuestion(1);
    setFriendModal(null);
    setSplitDisabled(false);
    setAskPeopleModal(null);
    setAnswersArray(questionsAnswers[0].answers);
    setIsTimeOut(false);
    stop();
  };

  const phoneFriendHandler = () => {
    setFriendModal(true);
    let random = Math.floor(Math.random() * 10);

    let answerIndex = questionsAnswers[currentQuestion - 1].answers.findIndex(
      (answer) => answer.correct === true
    );

    let incorrectAnswerIndex = questionsAnswers[
      currentQuestion - 1
    ].answers.findIndex((answer) => answer.correct === false);

    if (random < 8) {
      let answer = questionsAnswers[currentQuestion - 1].answers[answerIndex];

      setFriendAnswer(answer.answer);
      setAnswerIndex(answerIndex);
    } else {
      let answer =
        questionsAnswers[currentQuestion - 1].answers[incorrectAnswerIndex];

      setFriendAnswer(answer.answer);
      setAnswerIndex(incorrectAnswerIndex);
    }
  };

  const closeFriendModalHandler = () => {
    setFriendModal(false);
  };

  const fiftyFiftyHandler = () => {
    setSplitDisabled(true);
    if (isStoped !== true) {
      playSplit();
    }

    let correct = answersArray.find((answer) => answer.correct === true);
    let incorrectArr = answersArray.filter((answer) => answer.correct !== true);
    let incorrect = incorrectArr.splice(
      Math.floor(Math.random() * incorrectArr.length),
      1
    );

    let newArr = [correct, ...incorrect];

    setAnswersArray(newArr);
  };

  const checkCorrectHandler = (answer, index) => {
    setIndex(index);
    setIsTimeOut(true);

    let amount = questions.find(
      (question) => question.id === currentQuestion
    ).amount;

    if (answer.correct === true) {
      setAmountWon(amount);
      setTimeout(() => {
        setClasses("answer");
      }, 4000);

      setTimeout(() => {
        setClasses("answer correct");
        setMessage(`Correct! amount won ${amount}₹`);
        if (isStoped !== true) {
          playCorrect();
        }
      }, 6000);
      setTimeout(() => {
        setMessage("");
        setIsTimeOut(false);
        setClasses("answer");
        stopCorrect();

        if (currentQuestion < questionsAnswers.length) {
          setCurrentQuestion((previous) => previous + 1);
          setAnswersArray(questionsAnswers[currentQuestion].answers);
        } else {
          setIsGameOver(true);
          setGameState("win");
          if (isStoped !== true) {
            playWin();
          }
        }
      }, 9000);
    } else {
      setTimeout(() => {
        setClasses("answer");
      }, 4000);
      setTimeout(() => {
        setClasses("answer false");
        if (isStoped !== true) {
          playWrong();
        }
      }, 6000);

      setTimeout(() => {
        setIsTimeOut(false);
        setClasses("answer");
        setGameState("lose");
        setIsGameOver(true);
        setCurrentQuestion(1);
        stopWrong();
      }, 9000);
    }
  };

  const confirmAnswerHandler = (id, index) => {
    setClasses("answer active");
    setConfirmModal(true);
    setId(id);
    setIndex(index);
  };

  const exitConfirmModalHandler = () => {
    setConfirmModal(false);
    setIndex(null);
  };

  return (
    <div className="App">
      {confirmModal && (
        <ConfirmAnswer
          setConfirmModal={setConfirmModal}
          exitConfirmModalHandler={exitConfirmModalHandler}
          checkCorrectHandler={checkCorrectHandler}
          id={id}
          index={index}
        />
      )}
      {askPeopleModal && (
        <PeopleModal
          percentages={percentages}
          closePeopleModalHandler={closePeopleModalHandler}
        />
      )}
      {friendModal && (
        <FriendModal
          answerIndex={answerIndex}
          questionsAnswers={questionsAnswers}
          currentQuestion={currentQuestion}
          friendAnswer={friendAnswer}
          closeFriendModalHandler={closeFriendModalHandler}
        />
      )}
      <div className="left">
        {isGameOver && gameState === "win" && (
          <PlayAgainModal
            playAgainHandler={playAgainHandler}
            message="Congratulations you are a rapidster!"
            amountWon={amountWon}
          />
        )}
        {isGameOver && gameState === "lose" && (
          <PlayAgainModal
            playAgainHandler={playAgainHandler}
            message="Amount won"
            amountWon={amountWon}
          />
        )}
        {!isGameOver && (
          <Questions
            isStoped={isStoped}
            setIsStoped={setIsStoped}
            amountWon={amountWon}
            message={message}
            classes={classes}
            index={index}
            questionsAnswers={questionsAnswers}
            currentQuestion={currentQuestion}
            answersArray={answersArray}
            confirmAnswerHandler={confirmAnswerHandler}
            isTimeOut={isTimeOut}
          />
        )}
      </div>
      <div className="right">
        <LifeLines
          friendModal={friendModal}
          gameState={gameState}
          isTimeOut={isTimeOut}
          phoneFriendHandler={phoneFriendHandler}
          fiftyFiftyHandler={fiftyFiftyHandler}
          splitDisabled={splitDisabled}
          askPeopleModal={askPeopleModal}
          askPeopleHandler={askPeopleHandler}
        />
        <CurrentQuestion
          questions={questions}
          currentQuestion={currentQuestion}
        />
      </div>
    </div>
  );
}

export default App;
