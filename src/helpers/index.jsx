export const shuffleAnswers = (quizData) => {
  const unshuffledAnswers = [quizData.correct_answer, ...quizData.incorrect_answers];

  return unshuffledAnswers
    .map((answer) => ({ sort: Math.random(), value: answer }))
    .sort((a, b) => a.sort - b.sort)
    .map((obj) => obj.value);
};
