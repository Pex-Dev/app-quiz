import { useQuizForm } from "@/context/QuizFormContext";
import { useEffect, useId, useRef, useState } from "react";
import QuestionInput from "./QuestionInput";
import ErrorText from "@/components/common/TextError";
import ButtonAddQuestion from "./ButtonAddQuestion";

export default function QuestionListContainer() {
    const { questions, maxQuestionNumber, form } = useQuizForm();
    const { errors } = form;

    const inputAddQuestionId = useId();

    const refInputQuestion = useRef<HTMLInputElement>(null);

    const [showList, setShowList] = useState<boolean>(true);

    const arrowDown = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9l6 6l6 -6" />
        </svg>
    );

    const arrowUp = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 15l6 -6l6 6" />
        </svg>
    );

    const errorNoQuestions = (error: string) => {
        const errorsList = error.split("|");
        return (
            <>
                {errorsList.map((e) =>
                    e.includes("no_questions") ? (
                        <ErrorText> {e.replace("no_questions", "")} </ErrorText>
                    ) : (
                        ""
                    )
                )}
            </>
        );
    };

    return (
        <div>
            <div className="flex items-center gap-2 mt-7">
                <h2 className="text-white uppercase">Preguntas</h2>
                <span className="block h-0.5 border w-full text-neutral-500"></span>
                <span
                    className={
                        questions.length === maxQuestionNumber
                            ? "text-red-600"
                            : "text-white"
                    }
                >
                    {`${questions.length}/${maxQuestionNumber}`}
                </span>
                {questions.length > 0 && (
                    <button
                        type="button"
                        title={
                            showList
                                ? "Ocultar lista de respuestas"
                                : "Mostrar lista de respuestas"
                        }
                        aria-label={
                            showList
                                ? "Ocultar lista de respuestas"
                                : "Mostrar lista de respuestas"
                        }
                        className="p-0.5 text-white"
                        onClick={() => setShowList((p) => !p)}
                    >
                        {!showList ? arrowDown : arrowUp}
                    </button>
                )}
            </div>
            <ul
                className={`mt-2 flex flex-col gap-3 mb-5 md:gap-5 ${
                    showList ? "max-h-auto" : "max-h-0 overflow-hidden "
                }`}
            >
                {/*--------------------------------------------- PREGUNTAS --------------------------------------------------*/}
                {questions.map((q, index) => (
                    <QuestionInput key={index} question={q} />
                ))}
            </ul>
            {errors.questions?.includes("no_questions") &&
                errorNoQuestions(errors.questions)}
            {/*--------------------------------------------- BOTÓN AÑADIR PREGUNTAS --------------------------------------------------*/}
            <div className="mt-4">
                <label className="text-white" htmlFor={inputAddQuestionId}>
                    Añadir pregunta
                </label>
                <ButtonAddQuestion
                    refInputQuestion={refInputQuestion}
                    id={inputAddQuestionId}
                    disabled={questions.length >= maxQuestionNumber}
                />
            </div>
        </div>
    );
}
