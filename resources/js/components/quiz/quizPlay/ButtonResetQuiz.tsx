import { useQuizPlay } from "@/context/QuizPlayContext";

export default function ButtonResetQuiz() {
    const { reset } = useQuizPlay();
    return (
        <button
            onClick={() => reset()}
            title="Reiniciar quiz"
            aria-label="Reiniciar quiz"
            className="bg-cyan-500 rounded-full py-0.5 md:py-1 px-1 md:px-1.5
                         border-b-4 md:border-b-5 border-b-cyan-700 text-white transition-colors hover:bg-cyan-400 hover:border-b-cyan-600 hover:cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
            </svg>
        </button>
    );
}
