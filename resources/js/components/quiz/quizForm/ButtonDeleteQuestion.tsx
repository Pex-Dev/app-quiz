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
            className={`absolute -top-2 -right-2 rounded-full shadow-xl shadow-black/30 transition-colors  ${
                processing
                    ? "bg-amber-900 border border-x-red-900/20 border-t-red-900/20 border-b-3 border-b-red-950/20 text-white/20"
                    : "bg-amber-800 border border-x-red-900 border-t-red-900 border-b-3 border-b-red-950 hover:bg-amber-700 hover:cursor-pointer"
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
