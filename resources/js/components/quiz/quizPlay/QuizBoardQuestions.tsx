import { useQuizPlay } from "@/context/QuizPlayContext";
import ProgressBar from "./QuizProgress";
import AnswerOption from "./AnswerOption";
import { useRef, useState } from "react";
import ButtonContinueQuiz from "./ButtonContinueQuiz";
import { Question } from "@/types/quiz";
import ButtonResetQuiz from "./ButtonResetQuiz";

export default function QuizBoardQuestions() {
    const [showCorrectAnswer, setShowCorrectAnswer] = useState<boolean>(false);
    const buttonCheckRef = useRef<HTMLButtonElement>(null);

    const { quiz, currentQuestionNumber, selectedAnswer, playSound, setScore } =
        useQuizPlay();

    const orderedQuestions = (): Question[] => {
        if (!quiz.questions) return [];
        return quiz.questions.sort((a, b) => a.order - b.order);
    };

    if (!quiz.questions) return null;

    return (
        <>
            <header className="px-3 md:px-4 w-full">
                <div className="flex w-full gap-3 items-center">
                    <ProgressBar
                        current={currentQuestionNumber - 1}
                        total={quiz.questions ? quiz.questions.length : 5}
                    />
                    <ButtonResetQuiz />
                </div>

                <h3 className="font-roboto uppercase font-semibold text-neutral-800 text-lg text-center mt-3 md:mt-5">
                    {currentQuestionNumber > quiz.questions.length
                        ? quiz.questions[4].question_text
                        : quiz.questions[currentQuestionNumber - 1]
                              .question_text}
                </h3>
            </header>
            <div className="rounded-3xl flex flex-col justify-between h-fit md:h-auto min-h-[300px] px-3 pb-3 md:px-4 mt-6 p-3 md:p-4 bg-neutral-100 border-t-5 border-t-neutral-200 m-3 md:m-4">
                {/* Lista de respuestas */}
                <ul className="flex flex-col gap-3 font-nunito">
                    {orderedQuestions()[
                        currentQuestionNumber > quiz.questions.length
                            ? 4
                            : currentQuestionNumber - 1
                    ].answers.map((a, index) => (
                        <li key={index} className="w-full">
                            <AnswerOption
                                answer={a}
                                index={index}
                                showResult={showCorrectAnswer}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="px-3 md:px-4 w-full mb-3 md:mb-4 md:min-h-[49px]">
                {showCorrectAnswer ? (
                    <ButtonContinueQuiz
                        setShowCorrectAnswer={setShowCorrectAnswer}
                    />
                ) : (
                    <button
                        disabled={selectedAnswer === null}
                        onClick={() => {
                            if (!selectedAnswer) return;
                            buttonCheckRef.current?.classList.add("hidden");
                            setTimeout(() => {
                                setShowCorrectAnswer(true);
                                if (selectedAnswer.is_correct) {
                                    playSound("correct");
                                    setScore((prev) => prev + 1);
                                } else {
                                    playSound("incorrect");
                                }
                            }, 400);
                        }}
                        aria-label={
                            selectedAnswer ? "Comprobar respuesta" : undefined
                        }
                        title={
                            selectedAnswer ? "Comprobar respuesta" : undefined
                        }
                        ref={buttonCheckRef}
                        className={`block w-full md:w-fit py-2.5 px-4 md:px-20 md:mx-auto transition-colors border-b-5 font-semibold font-roboto rounded-full
                        ${
                            selectedAnswer
                                ? "bg-yellow-500 hover:bg-yellow-400 hover:border-b-yellow-500 border-b-yellow-600 text-white hover:cursor-pointer "
                                : "bg-orange-700/10 text-neutral-200/20 hover:cursor-default"
                        }    
                    `}
                    >
                        Comprobar
                    </button>
                )}
            </div>
        </>
    );
}
