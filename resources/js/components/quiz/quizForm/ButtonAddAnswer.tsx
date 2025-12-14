import { Question } from "@/types/quiz";
import { useQuizForm } from "@/context/QuizFormContext";
import React from "react";

interface ButtonAddQuestionProps {
    question: Question;
    refInputAnswer: React.RefObject<HTMLInputElement | null>;
    id: string;
    disabled: boolean;
}
export default function ButtonAddAnswer({
    question,
    refInputAnswer,
    id,
    disabled,
}: ButtonAddQuestionProps) {
    const { addAnswer, form } = useQuizForm();
    const { processing } = form;

    return (
        <div
            className={`w-full flex rounded md:rounded-md overflow-hidden border mt-1 ${
                processing || disabled
                    ? " border-cyan-500/20"
                    : "border-cyan-500"
            }`}
        >
            <input
                type="text"
                placeholder="Añadir una respuesta"
                ref={refInputAnswer}
                id={id}
                disabled={processing || disabled}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (!refInputAnswer.current) return;
                        if (!refInputAnswer.current.value) return;
                        addAnswer(question.id, refInputAnswer.current.value);
                        refInputAnswer.current.value = "";
                    }
                }}
                className={` w-full outline-0 p-2 ${
                    processing || disabled
                        ? "bg-white/10 text-black/40"
                        : "bg-white text-black "
                }`}
            />
            <button
                type="button"
                disabled={processing || disabled}
                onClick={() => {
                    if (!refInputAnswer.current) return;
                    if (!refInputAnswer.current.value) return;
                    addAnswer(question.id, refInputAnswer.current.value);
                    refInputAnswer.current.value = "";
                }}
                className={`border-l text-white px-1 transition-colors ${
                    processing || disabled
                        ? "bg-green-700/30 border-l-cyan-100/10"
                        : "bg-green-700 border-l-cyan-100 hover:bg-green-600 hover:cursor-pointer "
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                </svg>
            </button>
        </div>
    );
}
