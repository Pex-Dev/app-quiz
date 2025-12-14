import { useId, useRef } from "react";
import { useQuizForm } from "@/context/QuizFormContext";
import { Question } from "@/types/quiz";
import ButtonDeleteQuestion from "./ButtonDeleteQuestion";
import TextArea from "../../ui/TextArea";
import AnswersListContainer from "./AnswersListContainer";
import AnswerInput from "./AnswerInput";
import ButtonAddAnswer from "./ButtonAddAnswer";

export default function QuestionInput({ question }: { question: Question }) {
    const {
        form,
        updateQuestion,
        moveQuestionUp,
        moveQuestionDown,
        questions,
    } = useQuizForm();
    const { errors, processing } = form;

    const inputAddAnswerId = useId();

    const refInputAnswer = useRef<HTMLInputElement>(null);

    const errorTexts = (error: string) => {
        const errorsList = error.split("|");
        return (
            <ul className="border bg-red-600 border-white pl-7 py-1 text-white rounded-sm flex flex-col gap-2 mt-2">
                {errorsList.map((e, index) =>
                    e.includes(String(question.id)) ? (
                        <li key={index} className="list-disc">
                            {e.replace(String(question.id), "")}
                        </li>
                    ) : (
                        ""
                    )
                )}
            </ul>
        );
    };

    return (
        <li
            className={`relative p-2 md:p-3 lg:p-5 flex flex-col md:flex-row gap-2 bg-cyan-700 text-white py-3 rounded md:rounded-md justify-between ${
                errors.questions?.includes(String(question.id))
                    ? "border-2 border-red-700"
                    : "border-b-5 border-b-cyan-950"
            }`}
        >
            <div className="flex flex-col w-full">
                <div className="w-full">
                    {/* Botón eliminar pregunta */}
                    <ButtonDeleteQuestion
                        question={question}
                        processing={processing}
                    />
                    <header className="w-full">
                        {/* Input pregunta */}
                        <label
                            className="text-white"
                            htmlFor={String(question.id)}
                        >
                            Texto de la pregunta
                        </label>
                        <TextArea
                            type="text"
                            value={question.question_text}
                            name="question"
                            id={String(question.id)}
                            onChange={(e) =>
                                updateQuestion({
                                    id: question.id,
                                    question_text: e.target.value,
                                    answers: question.answers,
                                    order: question.order,
                                })
                            }
                            disabled={processing}
                            required={true}
                            maxLength={150}
                            className="min-h-auto mt-2"
                        />
                    </header>
                    {/* Respuestas */}
                    {question.answers.length > 0 && (
                        <AnswersListContainer>
                            <ul className="flex flex-col gap-2">
                                {question.answers.map((a, index) => (
                                    <AnswerInput
                                        key={index}
                                        question={question}
                                        answer={a}
                                    />
                                ))}
                            </ul>
                        </AnswersListContainer>
                    )}
                    {/* Botón añadir respuesta */}
                    <label
                        className="text-white mt-3"
                        htmlFor={inputAddAnswerId}
                    >
                        Añadir respuesta
                    </label>
                    <ButtonAddAnswer
                        question={question}
                        id={inputAddAnswerId}
                        refInputAnswer={refInputAnswer}
                        disabled={question.answers.length === 5}
                    />
                </div>

                {errors.questions?.includes(String(question.id)) &&
                    errorTexts(errors.questions)}
            </div>
            <div className="w-full md:w-fit flex flex-col min-h-full justify-center items-center">
                <button
                    disabled={question.order <= 0}
                    onClick={() => moveQuestionUp(question)}
                    type="button"
                    className={`block w-fit ${
                        question.order <= 1
                            ? "text-white/10"
                            : "text-white hover:cursor-pointer"
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
                        <path d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                    </svg>
                </button>
                <span className="text-white uppercase font-semibold text-center text-2xl">
                    {question.order}
                </span>
                <button
                    disabled={
                        question.order >= questions[questions.length - 1].order
                    }
                    onClick={() => moveQuestionDown(question)}
                    type="button"
                    className={`block w-fit ${
                        question.order >= questions[questions.length - 1].order
                            ? "text-white/10"
                            : "text-white"
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
                        <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" />
                    </svg>
                </button>
            </div>
        </li>
    );
}
