import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizBoardQuestions from "./QuizBoardQuestions";
import QuizResults from "./QuizResults";
import QuizCreator from "../QuizCreator";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

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
            {quizState === "idle" && (
                <>
                    <QuizCreator quiz={quiz} />
                    <div className="mt-10 md:mt-0">
                        <h2 className="text-black uppercase font-semibold text-lg md:text-xl lg:text-2xl font-roboto text-center">
                            {quiz.name}
                        </h2>
                        <p className="text-center">
                            <span className="font-black text-green-600 ">
                                {quiz.questions?.length}
                            </span>{" "}
                            preguntas
                        </p>
                    </div>
                    {quiz.description && (
                        <p className="px-3 pb-3 md:px-4 mt-6 p-3 md:p-4 bg-neutral-100 border-t-5 border-t-neutral-200 m-3 md:m-4 rounded-xl text-neutral-700">
                            {quiz.description}
                        </p>
                    )}

                    <div className="p-3 md:p-4 mt-10 md:mt-0">
                        <button
                            onClick={() => setQuizState("playing")}
                            className="bg-blue-600 border-b-4 border-b-blue-800 text-white px-4 py-3 w-full rounded-full transition-colors hover:cursor-pointer hover:bg-blue-500 focus:border-0 focus:bg-blue-800 focus:text-white/30"
                        >
                            Comenzar
                        </button>
                    </div>
                </>
            )}
            {quizState === "playing" && <QuizBoardQuestions />}
            {quizState === "results" && <QuizResults />}
        </div>
    );
}
