import { createContext, useEffect, useReducer } from "react";
import { UseApi } from "../api";
import { shuffleAnswers } from "../helpers";

const { getApi } = UseApi();

const initialState = {
  quizData: [],
  currentQuestionIndex: 0,
  showResults: false,
  correctAnswer: 0,
  answers: [],
  currentAnswers: "",
  timer: 60,
};

const reducer = (state, action) => {
  // console.log("reducer", state, action);
  switch (action.type) {
    case "SHOW_RESULTS": {
      return {
        ...state,
        showResults: true,
      };
    }
    case "DECREASE_TIMER": {
      const newTimer = state.timer - 1;
      return {
        ...state,
        timer: newTimer,
      };
    }
    case "NEXT_QUESTION": {
      const selectedAnswer = action.payload;
      const correctAnswer = state.quizData[state.currentQuestionIndex].correct_answer;

      const isCorrect = selectedAnswer === correctAnswer;

      const updatedCorrectAnswer = isCorrect ? state.correctAnswer + 1 : state.correctAnswer;
      const showResults = state.currentQuestionIndex === state.quizData.length - 1;
      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;
      const answers = showResults ? [] : shuffleAnswers(state.quizData[currentQuestionIndex]);
      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswers: selectedAnswer,
        correctAnswer: updatedCorrectAnswer,
      };
    }
    case "RESTART": {
      const initialAnswers = shuffleAnswers(state.quizData[0]);
      return {
        ...state,
        currentQuestionIndex: 0,
        showResults: false,
        correctAnswer: 0,
        answers: initialAnswers, // Perbarui jawaban saat restart
        currentAnswers: "",
        timer: 60,
      };
    }
    case "SET_QUIZ_DATA":
      const initialAnswers = shuffleAnswers(action.payload[0]);
      return { ...state, quizData: action.payload, answers: initialAnswers };
    default:
      return state;
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Ambil data dari API menggunakan getApi() dan simpan ke dalam initialState
    getApi()
      .then((data) => {
        // Dispatch action untuk mengatur quizData
        dispatch({ type: "SET_QUIZ_DATA", payload: data.results });
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []); // Empty dependency array agar useEffect hanya dijalankan sekali saat komponen dimount

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>;
};
