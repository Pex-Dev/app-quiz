import React, { SetStateAction, useRef } from "react";
import { useQuizPlay } from "@/context/QuizPlayContext";

export default function ButtonContinueQuiz({
    setShowCorrectAnswer,
}: {
    setShowCorrectAnswer: (value: SetStateAction<boolean>) => void;
}) {
    const { nextQuestion, setSelectedAnswer } = useQuizPlay();

    return (
        <button
            onClick={() => {
                nextQuestion();
                setShowCorrectAnswer(false);
                setSelectedAnswer(null);
            }}
            className="block w-full md:w-fit py-2.5 px-4 md:px-20 md:mx-auto hover:cursor-pointer transition-colors border-b-5  font-semibold font-roboto rounded-full bg-yellow-500 hover:bg-yellow-400 hover:border-b-yellow-500 border-b-yellow-600 text-white"
        >
            Continuar
        </button>
    );
}
