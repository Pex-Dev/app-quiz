import InputText from "@/components/ui/InputText";
import { useQuizForm } from "@/context/QuizFormContext";
import { Question, Answer } from "@/types/quiz";

export default function AnswerInput({
    question,
    answer,
}: {
    question: Question;
    answer: Answer;
}) {
    const { updateAnswer, deleteAnswer, form } = useQuizForm();
    const { processing } = form;

    return (
        <li
            className={`${
                answer.is_correct
                    ? "bg-green-400 border-green-600"
                    : "bg-white border-neutral-400"
            } rounded-md flex justify-between overflow-hidden md:gap-2 border`}
        >
            <div className="w-full flex flex-col md:flex-row justify-between gap-2">
                <div className="w-full">
                    {/* Input respuesta */}
                    <InputText
                        onChange={(e) => {
                            updateAnswer(question.id, {
                                id: answer.id,
                                answer_text: e.target.value,
                                is_correct: answer.is_correct,
                            });
                        }}
                        disabled={processing}
                        required={true}
                        className="bg-transparent text-black focus:bg-white/10 w-full"
                        id={String(answer.id)}
                        value={answer.answer_text}
                    />
                </div>
                <button
                    type="button"
                    title={
                        answer.is_correct
                            ? "Marcar respuesta como incorrecta"
                            : "Marcar respuesta como correcta"
                    }
                    aria-label={
                        answer.is_correct
                            ? "Marcar respuesta como incorrecta"
                            : "Marcar respuesta como correcta"
                    }
                    onClick={() => {
                        updateAnswer(question.id, {
                            id: answer.id,
                            answer_text: answer.answer_text,
                            is_correct: true,
                        });
                    }}
                    className="flex gap-1 items-center px-2 md:px-0 pb-2 md:pb-0 text-black"
                >
                    <span>{answer.is_correct ? "Correcta" : "Incorrecta"}</span>
                    {answer.is_correct ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                    ) : (
                        ""
                    )}
                </button>
            </div>
            {/* Botón borrar respuesta */}
            <button
                type="button"
                aria-label={`Borrar respuesta ${answer.answer_text}`}
                title={`Borrar respuesta ${answer.answer_text}`}
                disabled={processing}
                onClick={() => deleteAnswer(question.id, answer.id)}
                className={` transition-colors px-1 ${
                    processing
                        ? "bg-amber-800/20 text-white/20"
                        : "bg-red-500 text-white hover:bg-amber-700"
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
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </button>
        </li>
    );
}
