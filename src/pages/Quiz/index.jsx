import { useContext, useEffect } from "react";
import { QuizContext } from "../../context/quiz";
import { Question } from "../../component/Question";

export const Quiz = () => {
  const { state, dispatch } = useContext(QuizContext);

  const quizData = state.quizData;
  const currentQuestionIndex = state.currentQuestionIndex;
  const showResults = state.showResults;
  const correctAnswer = state.correctAnswer;
  const timer = state.timer;

  useEffect(() => {
    let timerInterval;

    if (!showResults) {
      timerInterval = setInterval(() => {
        if (timer > 0) {
          dispatch({ type: "DECREASE_TIMER" });
        } else {
          dispatch({ type: "SHOW_RESULTS" });
          clearInterval(timerInterval);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, showResults, dispatch]);

  // console.log(quizData);

  return (
    <>
      {showResults && (
        <div className="container flex justify-center">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Congratulations!!
              </h5>
            </a>
            <div className="result-info my-3">
              <div className="">You Have Completed the Question</div>
              <div className="">
                You Have Got {correctAnswer} of {quizData.length}
              </div>
            </div>
            <button
              type="button"
              className="mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => dispatch({ type: "RESTART" })}
            >
              Restart
            </button>
          </div>
        </div>
      )}
      {!showResults && (
        <div>
          <div className="timer mb-4 font-bold italic">Time left: {timer} seconds</div>
          <div className="score mb-4 font-bold italic">
            Question {currentQuestionIndex + 1} / {quizData.length}
          </div>
          <Question />
        </div>
      )}
    </>
  );
};
