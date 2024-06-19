import React from "react";
import Button from "./Button";

const ResultPage = ({ prediction, score, onClickTry }) => {
  let message = "";
  let scoreColor = "";

  if (prediction[0] === "None") {
    message = "You most likely don't have anything.";
  } else {
    message = `There is a `;
  }

  if (score < 40) {
    scoreColor = "text-green-500";
  } else if (score >= 40 && score <= 70) {
    scoreColor = "text-yellow-500";
  } else {
    scoreColor = "text-red-500";
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-3 pb-8">
      <img src="/yayy.gif" className=" w-48  mt-auto md:mt-0 ms-11 " alt="" />

      <span className=" text-4xl font-bold">Results</span>

      <h2 className="text-3xl text-center">
        {message}
        {prediction[0] !== "None" && <span className={scoreColor}>{score}%</span>}
    
        {prediction[0] !== "None" && ` chance of you having ${prediction}`}
      </h2>

      <Button
        customStyle=" w-full md:w-fit bg-accent text-white dark:bg-primary px-8 py-2 rounded-full mt-auto md:mt-14 "
        onClickButton={onClickTry}
      >
        Finish
      </Button>
    </div>
  );
};

export default ResultPage;
