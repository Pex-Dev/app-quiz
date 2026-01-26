import React from "react";
import { useQuizForm } from "@/context/QuizFormContext";

interface ButtonAddQuestionProps {
    refInputQuestion: React.RefObject<HTMLInputElement | null>;
    disabled: boolean;
    id: string;
}

export default function ButtonAddQuestion({
    refInputQuestion,
    disabled,
    id,
}: ButtonAddQuestionProps) {
    const { addQuestion, form } = useQuizForm();
    const { processing } = form;

    return (
        <div
            className={`w-full flex rounded md:rounded-md overflow-hidden border border-neutral-300`}
        >
            <input
                type="text"
                placeholder="Añadir una pregunta"
                ref={refInputQuestion}
                id={id}
                disabled={processing || disabled}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        if (!refInputQuestion.current) return;
                        if (!refInputQuestion.current.value) return;
                        addQuestion(refInputQuestion.current.value);
                        refInputQuestion.current.value = "";
                    }
                }}
                className={`w-full outline-0 p-2 ${
                    processing || disabled
                        ? "bg-white/10 text-black/20"
                        : "bg-neutral-200"
                }`}
            />
            <button
                type="button"
                disabled={processing || disabled}
                onClick={() => {
                    if (!refInputQuestion.current) return;
                    if (!refInputQuestion.current.value) return;
                    addQuestion(refInputQuestion.current.value);
                    refInputQuestion.current.value = "";
                }}
                className={`border-l text-white px-1 transition-colors ${
                    processing || disabled
                        ? "bg-amber-500/30 border-l-neutral-400/20"
                        : "bg-amber-500 hover:bg-amber-300 hover:cursor-pointer border-l-neutral-400"
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
