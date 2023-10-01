import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto">
        <div className="text-white font-bold text-4xl">Are You Ready to Take the Quiz?</div>
        <button
          type="button"
          className="mt-4 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => navigate("/quiz")}
        >
          START
        </button>
      </div>
    </>
  );
};
