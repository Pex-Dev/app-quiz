import { useQuizPlay } from "@/context/QuizPlayContext";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ButtonEditQuiz() {
    const { quiz } = useQuizPlay();
    return (
        <Link
            href={route("quiz.edit", quiz.id)}
            aria-label="Editar este quiz"
            title="Editar este quiz"
            className="absolute right-2 bg-white p-1 rounded-full border-b-2 border-b-neutral-300 top-2 hover:cursor-pointer z-1"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1d0b0b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
            </svg>
        </Link>
    );
}
