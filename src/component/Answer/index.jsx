export const Answer = ({ answerText, index, onSelectAnswer }) => {
  const letterMapping = ["A.", "B.", "C.", "D."];

  return (
    <>
      <button
        className={`flex justify-stretch text-lg bg-blue-500 hover:bg-blue-700 hover:border-blue-700 border-blue-500 text-white font-bold py-4 px-4 border rounded-lg }`}
        onClick={() => onSelectAnswer(answerText)}
      >
        <span className="answer-letter text-left">{letterMapping[index]}</span>
        <span className="answer-text uppercase mx-auto">{answerText}</span>
      </button>
    </>
  );
};
