import { useState, useEffect } from "react";
import Latex from "react-latex";
import Button from "./Button";

export default function CurrentExercise({
  currentExercise,
  handleSetAnswer,
  handleSetHearts,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (currentExercise.selectedAnswer) {
      setSelectedOption(currentExercise.selectedAnswer);
    } else {
      setSelectedOption(null);
    }
  }, [currentExercise.selectedAnswer, currentExercise]);

  const correctAnswer = currentExercise.answerOptions.find(
    (option) => option.correct === true
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCheck = () => {
    handleSetAnswer(selectedOption);

    if (selectedOption !== correctAnswer.text) {
      handleSetHearts();
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <Latex className="text-black font-crimson">
        {currentExercise.questionText}
      </Latex>

      <fieldset className="flex flex-col items-center justify-end gap-2 font-crimson">
        {currentExercise.answerOptions.map((option) => (
          <div
            className={`
            border-2  rounded-lg p-4 w-full flex justify-center gap-2
            ${
              !currentExercise.selectedAnswer && option.text === selectedOption
                ? "bg-LIGHT_BLUE  border-BLUE"
                : ""
            }
            ${
              currentExercise.selectedAnswer &&
              option.text === correctAnswer.text &&
              selectedOption
                ? "bg-GREEN border-GREEN"
                : ""
            } ${
              currentExercise.selectedAnswer &&
              option.text === selectedOption &&
              option.text !== correctAnswer.text
                ? "bg-ORANGE border-ORANGE"
                : ""
            }
            `}
            key={option.text}
          >
            <input
              type="radio"
              id={option.text}
              name="options"
              value={option.text}
              checked={
                currentExercise.selectedAnswer
                  ? currentExercise.selectedAnswer === option.text
                  : selectedOption === option.text
              }
              onChange={handleOptionChange}
              disabled={currentExercise.selectedAnswer}
            />
            <label htmlFor={option.text}>
              <Latex>{option.text}</Latex>
            </label>
          </div>
        ))}
      </fieldset>

      <Button
        onClick={handleCheck}
        disabled={currentExercise.selectedAnswer || !selectedOption}
        additionalClasses={"bg-DARK_BLUE"}
      >
        Check
      </Button>
    </section>
  );
}
