import React, { useState, useEffect } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import Button from "../components/for_assessment/Button";
import AnswerList from "../components/for_assessment/AnswerList";
import Question from "../components/for_assessment/Question";
import ResultPage from "../components/for_assessment/ResultPage";
import Loader from "../components/for_assessment/Loader";
import axios from "axios";
import { updateDiagnosis } from "../api";
import { useNavigate } from "react-router-dom";

const exampleData = [
  {
    category: "Demographic",
    choices: ["Male", "Female"],
    question: "What is your gender?",
    name: "gender",
  },
  {
    category: "Demographic",
    choices: ["13-19", "20-26", "27-33", "34-44", "45 or more"],
    question: "Which age group do you belong too?",
    name: "age",
  },
  {
    category: "Demographic",
    choices: ["University", "College", "Professional", "School", "Unemployed"],
    question: "What is your level of education?",
    name: "education",
  },
  {
    category: "Demographic",
    choices: ["single", "married", "divorced"],
    question: "What is your marital status?",
    name: "marital",
  },
  {
    category: "Demographic",
    choices: ["<10", "<20", "<30", "30+", "50+"],
    question: "What is your approximate monthly income? (in term of thousands)",
    name: "income",
  },
  {
    category: "Loan",
    choices: ["yes", "no"],
    question: "Do you have any outstanding loans?",
    name: "loan",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["none", "1", "2", "3", "3+"],
    question: "How many close friends do you have?",
    name: "friend_no",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["yes", "no", "maybe"],
    question: "Does your friends help you when you need help?",
    name: "friend_help",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["0", "1", "2", "3", "3+"],
    question: "How many times a week do you interact with your friends?",
    name: "friend_interact",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["yes", "no", "maybe", "idk"],
    question: "Do you feel comfortable sharing your feelings with others?",
    name: "share_feel",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["yes", "no", "maybe"],
    question: "Do you have someone to talk to when you need support?",
    name: "have_someone",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["never", "maybe", "no", "sometimes", "yes"],
    question: "Do you often feel lonely?",
    name: "lonely",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["yes", "no"],
    question: "Have you ever been bullied?",
    name: "bullied",
  },
  {
    category: "Social and Emotional Well-being",
    choices: ["yes", "no", "maybe"],
    question: "Do you feel supported by your family?",
    name: "family_support",
  },
  {
    category: "Behavioral Patterns",
    choices: ["yes", "no"],
    question: "Do you compare your life to others?",
    name: "compare_life",
  },
  {
    category: "Behavioral Patterns",
    choices: ["<1 hour", "<2 hours", "<3 hours", "3+ hours"],
    question: "How much time do you spend on social media daily?",
    name: "social_media",
  },
  {
    category: "Sleep and Lifestyle",
    choices: ["none", "1", "2", "3", "3+"],
    question: "How many times a week do you hang out with friends?",
    name: "hangout",
  },
  {
    category: "Sleep and Lifestyle",
    choices: ["<10", "<15", "<20", "<24", "24"],
    question: "How many hours a day do you stay at home?",
    name: "home_time",
  },
  {
    category: "Sleep and Lifestyle",
    choices: ["yes", "no"],
    question: "Do you consider yourself religious/spiritual?",
    name: "religious",
  },
  {
    category: "Goals and Outlook",
    choices: ["yes", "no", "maybe"],
    question: "Do you have specific goals for yourself?",
    name: "goal",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no"],
    question: "Have you ever feel suicidal ?",
    name: "suicidal",
  },
  {
    category: "Sleep and Lifestyle",
    choices: ["yes", "no"],
    question: "Do you have a sleeping disorder?",
    name: "sleep_disorder",
  },

  {
    category: "Emotional Well-being",
    choices: ["yes", "no", "maybe"],
    question: "Are you currently in love with someone?",
    name: "love_someone",
  },
  {
    category: "Emotional Well-being",
    choices: ["yes", "no", "maybe"],
    question: "Have you recently lost someone close to you?",
    name: "die_someone",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no", "maybe"],
    question: "Do you have thoughts that tell you to do things?",
    name: "thoughts_command",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no", "maybe"],
    question: "Have you ever engaged in self-harm?",
    name: "self_harm",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no"],
    question: "Have you acted on your thoughts recently?",
    name: "thoughts_acted",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no"],
    question:
      "Have you ever acted on your thoughts of harming yourself or others?",
    name: "thoughts_acted2",
  },
  {
    category: "Mental Health History",
    choices: ["morning", "afternoon", "evening", "night"],
    question:
      "During which time of the day do you experience intrusive thoughts?",
    name: "thoughts_time",
  },
  {
    category: "",
    choices: ["yes", "no"],
    question: "Do you hear voices that others cannot?",
    name: "voices",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no"],
    question: "Have you ever intentionally harmed others?",
    name: "harming_others",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no"],
    question: "Do you have tried to commit suicide?",
    name: "suicide",
  },
  {
    category: "Mental Health History",
    choices: ["yes", "no"],
    question: "Do you often have suicidal thoughts?",
    name: "suicidal_thoughts",
  },
  {
    category: "Treatment",
    choices: ["yes", "no"],
    question: "Have you ever sought therapy or counseling?",
    name: "therapy",
  },
];

const Assessment = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizNo, setQuizNo] = useState(0);
  const [choice, setChoice] = useState("");
  const [score, setScore] = useState(0);
  const [isloading, setIsloading] = useState(true);
  const [resultData, setResultData] = useState({});
  const [error, setError] = useState(""); // New state for error handling

  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    education: "",
    marital: "",
    income: "",
    loan: "",
    friend_no: "",
    friend_help: "",
    friend_interact: "",
    share_feel: "",
    have_someone: "",
    lonely: "",
    bullied: "",
    family_support: "",
    compare_life: "",
    social_media: "",
    hangout: "",
    home_time: "",
    religious: "",
    goal: "",
    suicidal: "",
    sleep_disorder: "",
    love_someone: "",
    die_someone: "",
    thoughts_command: "",
    self_harm: "",
    thoughts_acted: "",
    thoughts_acted2: "",
    thoughts_time: "",
    voices: "",
    harming_others: "",
    suicide: "",
    suicidal_thoughts: "",
    therapy: "",
  });

  const fetchData = async () => {
    try {
      const data = await exampleData;
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const fetchAssessmentResult = async () => {
    try {
      const response = await axios.post("/predict", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Assessment result:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching assessment result:", error.message);
      setError("Failed to fetch assessment result. Please try again.");
      return null;
    }
  };

  const handleSelectAnswer = (answer) => setChoice(answer);

  const handleClickNext = () => {
    const currentQuiz = quizzes[quizNo];
    const name = currentQuiz.name;

    const selectedChoice = choice !== "" ? choice : "No answer";

    setFormData({
      ...formData,
      [name]: selectedChoice,
    });

    setChoice("");
    setQuizNo(quizNo + 1);

    if (quizNo === quizzes.length - 1) {
      const lastQuizName = currentQuiz.name;
      const lastQuizAnswer = selectedChoice;
      console.log("Last quiz reached:", {
        ...formData,
        [lastQuizName]: lastQuizAnswer,
      });
      setIsloading(true);
      fetchAssessmentResult().then((data) => {
        if (data) {
          setResultData(data);
          setIsloading(false);
        } else {
          setIsloading(false);
        }
      });
    }
  };
  const token = localStorage.getItem("fittrack-app-token");

  const navigate = useNavigate();
  const handleClickTry = () => {
    console.log(resultData.prediction[0]);
    try {
      const response = updateDiagnosis(token, {
        diagnosis: resultData.prediction[0],
      });
      console.log("Diagnosis updated successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating diagnosis:", error);
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setQuizzes(data);
      setIsloading(false);
    });
  }, []);

  const currentQuiz = quizzes.length > 0 && quizzes[quizNo];

  const choices = currentQuiz?.choices;
  const answers = choices;

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
            prediction={resultData.prediction}
            score={resultData.score}
            onClickTry={handleClickTry}
          />
        ) : (
          <div>
            <div className="flex justify-between mb-3">
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

            {error && <div className="mt-4 text-red-600">{error}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assessment;
