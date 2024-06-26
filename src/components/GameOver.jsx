import Image from "next/image";
import Latex from "react-latex";
import Button from "./Button";

export default function GameOver({ hearts, exercises, restart }) {
  function handleRestart() {
    restart();
  }

  const score = exercises.filter(
    (exercise) =>
      exercise.selectedAnswer ===
      exercise.answerOptions.find((option) => option.correct === true).text
  ).length;

  const answeredExercises = exercises.filter(
    (exercise) => exercise.selectedAnswer
  );

  return (
    <div className="absolute top-0 left-0 z-10 bg-black  w-screen h-screen">
      <div className="bg-[#586FB5] flex flex-col gap-4 items-center w-4/5 mx-auto p-8">
        <Image
          src="https://d1mgntrf3vaj6d.cloudfront.net/kollin_logo_white.svg"
          alt="Kollin Logo"
          width="100"
          height="100"
        />
        <h1
          className={`${
            hearts === 0 ? "text-red-400" : "text-orange-300"
          } text-5xl`}
        >
          {hearts === 0 ? "Game Over!" : "Finish!"}
        </h1>
        {hearts === 0 && (
          <p className=" text-red-400 text-xl">You lost all your hearts!</p>
        )}

        <Button
          additionalClasses={"w-1/5 p-2 text-white bg-orange-300  rounded-lg"}
          onClick={handleRestart}
        >
          Restart
        </Button>

        <p className="text-white text-xl">
          Your score: {score}/{exercises.length}
        </p>

        <div>
          {answeredExercises.map((exercise, index) => (
            <div
              className={`m-4 p-4 rounded-lg flex flex-col gap-2 ${
                exercise.answerOptions.find((option) => option.correct === true)
                  .text === exercise.selectedAnswer
                  ? "bg-green-200"
                  : "bg-red-200"
              }`}
              key={index}
            >
              <h2 className=" underline">Question {index + 1}</h2>
              <h2>
                <Latex>{exercise.questionText}</Latex>
              </h2>
              <p>Difficulty: {exercise.difficultyScore}</p>
              <p>
                Correct answer:{" "}
                <Latex>
                  {
                    exercise.answerOptions.find(
                      (option) => option.correct === true
                    ).text
                  }
                </Latex>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
