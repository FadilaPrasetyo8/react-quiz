import { useContext } from "react";
import { QuizContext } from "../../context/quiz";
import { Answer } from "../Answer";

export const Question = () => {
  const { state, dispatch } = useContext(QuizContext);
  const quizData = state.quizData;
  const currentQuestion = quizData[state.currentQuestionIndex];
  const answers = state.answers;

  // console.log(currentQuestion.correct_answer);

  return (
    <>
      <div>
        <div className="question bg-white text-black font-bold text-3xl py-10 uppercase">
          {currentQuestion?.question}
        </div>
        <div className="answers grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
          {answers.map((answer, index) => (
            <Answer
              answerText={answer}
              key={index}
              index={index}
              onSelectAnswer={(answerText) =>
                dispatch({ type: "NEXT_QUESTION", payload: answerText })
              }
            />
          ))}
        </div>
      </div>
    </>
  );
};
