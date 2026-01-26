import { Question } from "@/types/quiz";
import { useQuizForm } from "@/context/QuizFormContext";

export default function ButtonDeleteQuestion({
    question,
    processing,
}: {
    question: Question;
    processing: boolean;
}) {
    const { deleteQuestion } = useQuizForm();
    return (
        <button
            type="button"
            aria-label={`Borrar pregunta ${question.question_text}`}
            title={`Borrar pregunta ${question.question_text}`}
            disabled={processing}
            className={`absolute -top-2 -right-2 rounded-full shadow-md shadow-black/40 transition-colors hover:cursor-pointer ${
                processing ? "bg-amber-900 text-white/20" : "bg-red-500 "
            }`}
            onClick={() => deleteQuestion(question.id)}
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
    );
}
