import React, { useState, useEffect } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import Button from "../components/for_assessment/Button";
import AnswerList from "../components/for_assessment/AnswerList";
import Question from "../components/for_assessment/Question";
import ResultPage from "../components/for_assessment/ResultPage";
import Loader from "../components/for_assessment/Loader";

const api_url = "https://the-trivia-api.com/api/questions";

const objStructure = {
  category: "Sport & Leisure",
  correctAnswer: "Tennis",
  difficulty: "medium",
  id: "622a1c357cc59eab6f950020",
  incorrectAnswers: (3)[("Soccer", "Badminton", "Volleyball")],
  isNiche: false,
  question: "Within Which Sport Might You Encounter The Cyclops System?",
  regions: [],
  tags: (2)[("technology", "sport")],
  type: "Multiple Choice",
};

const exampleData = [
  {
    category: "Sport & Leisure",
    correctAnswer: "Tennis",
    difficulty: "medium",
    id: "622a1c357cc59eab6f950020",
    incorrectAnswers: ["Soccer", "Badminton", "Volleyball"],
    isNiche: false,
    question: "Within Which Sport Might You Encounter The Cyclops System?",
    regions: [],
    tags: ["technology", "sport"],
    type: "Multiple Choice",
  },
  {
    category: "Science & Nature",
    correctAnswer: "Photosynthesis",
    difficulty: "hard",
    id: "622a1c357cc59eab6f950021",
    incorrectAnswers: ["Respiration", "Transpiration", "Pollination"],
    isNiche: true,
    question:
      "What is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll?",
    regions: ["Global"],
    tags: ["biology", "botany"],
    type: "Multiple Choice",
  },
  // Add more example data entries here...
  {
    category: "Geography",
    correctAnswer: "Mount Everest",
    difficulty: "hard",
    id: "622a1c357cc59eab6f950030",
    incorrectAnswers: ["K2", "Kangchenjunga", "Lhotse"],
    isNiche: false,
    question: "What is the highest mountain in the world?",
    regions: ["Asia"],
    tags: ["geology", "mountaineering"],
    type: "Multiple Choice",
  },
  // Add more example data entries here...
];

const Assessment = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizNo, setQuizNo] = useState(0);
  const [choice, setChoice] = useState("");
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(true);

  const fetchData = async (url) => {
    try {
      const data = await exampleData;

      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const handleSelectAnswer = (answer) => setChoice(answer);

  const handleClickNext = () => {
    checkAnswer();
    setQuizNo(quizNo + 1);
  };

  const handleClickTry = () => {
    setIsloading(true);
    setScore(0);
    setChoice("");
    setQuizNo(0);
    fetchData(api_url).then((data) => {
      setQuizzes(data);
      setIsloading(false);
    });
  };

  useEffect(() => {
    fetchData(api_url).then((data) => {
      setQuizzes(data);
      setIsloading(false);
    });
  }, []);

  const currentQuiz = quizzes.length > 0 && quizzes[quizNo];
  const correctAnswer = currentQuiz?.correctAnswer;
  const incorrectAnswers = currentQuiz?.incorrectAnswers;
  const answers = correctAnswer &&
    incorrectAnswers && [correctAnswer, ...incorrectAnswers];

  const isCorrect = correctAnswer === choice;

  const checkAnswer = () => isCorrect && setScore(score + 1);

  const quizTitleStyle =
    " w-full text-slate-800 dark:text-slate-100 fixed top-0 left-0 p-5 tracking-widest flex items-center justify-between";

  return (
    <div className="bg-blue-100 h-screen grid">
      <div className=" w-full md:max-w-lg items-center justify-center mx-auto my-auto p-10 bg-white">
        <h1 className={quizTitleStyle}>Quizzes</h1>

        {quizzes.length === 0 || isloading ? (
          <Loader />
        ) : quizNo === quizzes.length ? (
          <ResultPage
            score={score}
            quizzes={quizzes}
            onClickTry={handleClickTry}
          />
        ) : (
          <div>
            <div className=" flex justify-between mb-3">
              <span>{currentQuiz?.category}</span>
              <span>
                {quizNo + 1}/{quizzes.length}
              </span>
            </div>

            <Question currentQuiz={currentQuiz} />

            <AnswerList
              answers={answers}
              choice={choice}
              onSelectAnswer={handleSelectAnswer}
            />

            <Button onClickButton={handleClickNext}>
              Next
              <RiArrowRightLine />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
