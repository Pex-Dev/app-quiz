import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizQuestions from "./QuizQuestions";
import QuizResults from "./QuizResults";
import QuizCreator from "../QuizCreator";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import QuizIdle from "./QuizIdle";

export default function QuizBoard() {
    const { quiz, quizState, setQuizState } = useQuizPlay();
    const { auth } = usePage().props;
    return (
        <div className="min-w-56 w-full md:max-w-[600px] flex flex-col flex-1 md:flex-initial md:h-fit bg-white md:border-b-5 md:border-b-neutral-500 md:rounded-3xl shadow-lg overflow-hidden transition-all">
            <header
                className={`relative min-h-40 w-full  ${
                    quiz.image
                        ? "bg-no-repeat bg-size-[100%] bg-top"
                        : "bg-repeat bg-size-[80%] md:bg-size-[100%] bg-center"
                }`}
                style={{
                    backgroundImage: `url(${
                        quiz.image
                            ? `/uploads/${quiz.image}`
                            : backgroundsImages[Number(quiz.category_id) - 1]
                    })`,
                }}
            >
                {auth && auth.user && (
                    <>
                        {quiz.user_id === auth.user.id && (
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
                        )}
                    </>
                )}
                <div
                    className={`absolute w-full h-full bg-linear-to-t from-white px-3 pt-3 flex flex-col justify-end mb-3 ${
                        quiz.image ? "to-white/10" : "to-white/60"
                    }`}
                ></div>
            </header>
            {quizState === "idle" && <QuizIdle />}
            {quizState === "playing" && <QuizQuestions />}
            {quizState === "results" && <QuizResults />}
        </div>
    );
}
