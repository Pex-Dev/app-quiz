import { useQuizPlay } from "@/context/QuizPlayContext";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { alertWithCallback } from "@/utilities/SweetAlert";

export default function ButtonDeleteQuiz() {
    const { quiz } = useQuizPlay();

    const deleteQuizz = (...args: any[]): any => {
        router.post(route("quiz.destroy", quiz.id));
    };

    return (
        <Link
            onClick={() =>
                alertWithCallback(
                    "Eliminar",
                    deleteQuizz,
                    `¿Quieres eliminar el quiz: ${quiz.name}?`,
                    "warning",
                    true,
                )
            }
            aria-label="Eliminar este quiz"
            title="Eliminar este quiz"
            className=" bg-red-500 text-white p-1 rounded-full border-b-2 border-b-red-700 shadow-transparent shadow-xl transition-colors top-2 hover:cursor-pointer z-1 hover:shadow-red-500/30"
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
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
        </Link>
    );
}
