import { Like, Quiz } from "@/types/quiz";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { valorationsCount } from "@/utilities/ValorationCount";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
    const likes = valorationsCount(quiz.likes, "like");
    const dislikes = valorationsCount(quiz.likes, "dislike");

    const iconLike = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
        </svg>
    );

    const iconDislike = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
        </svg>
    );
    const checkIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12l5 5l10 -10" />
        </svg>
    );

    const arrowIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12l14 0" />
            <path d="M15 16l4 -4" />
            <path d="M15 8l4 4" />
        </svg>
    );

    return (
        <div className="min-w-56 bg-white border-b-5 border-b-neutral-500 rounded-3xl shadow-lg overflow-hidden">
            <header
                className={`relative min-h-32 w-full  ${
                    quiz.image
                        ? "bg-no-repeat bg-size-[100%] bg-center"
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
                <div
                    className={`absolute w-full h-full bg-linear-to-t from-10% to-90% from-white px-3 pt-3 flex flex-col justify-end mb-3 ${
                        quiz.image ? "to-white/10" : "to-white/60"
                    }`}
                >
                    <h2 className="text-black uppercase font-semibold font-roboto">
                        {quiz.name}
                    </h2>
                </div>
            </header>
            <div className="p-3 flex justify-between items-end">
                <Link
                    href={route("quiz", {
                        quiz: quiz.id,
                        slug: quiz.slug,
                    })}
                    className={`w-fit flex items-center gap-3  border-b-4 text-white rounded-full py-1 px-3 transition-colors hover:cursor-pointer ${
                        quiz.completed
                            ? "bg-green-600 border-b-green-800 hover:bg-green-500"
                            : "bg-blue-600 border-b-blue-800 hover:bg-blue-500"
                    }`}
                >
                    <span>{quiz.completed ? "Completado" : "comenzar"}</span>
                    {quiz.completed ? checkIcon : arrowIcon}
                </Link>
                <div className="flex flex-col gap-2">
                    <div
                        title={`Este quiz tiene ${quiz.questions_count} preguntas`}
                        className="flex items-center justify-end gap-1 mb-2"
                    >
                        <div className="bg-green-500 text-white w-fit h-fit rounded-full cursor-default">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2 "
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                                <path d="M12 19l0 .01" />
                            </svg>
                        </div>
                        {/* Número de preguntas */}
                        <span className="text-sm cursor-default">
                            {" "}
                            {quiz.questions_count}{" "}
                        </span>
                    </div>
                    <div
                        className={`flex items-center gap-2 bg-neutral-100 rounded-full px-1 border-t border-t-neutral-200 ${
                            likes === 0 && dislikes === 0
                                ? "text-neutral-400"
                                : "text-neutral-700"
                        }`}
                    >
                        <div
                            className="flex items-center"
                            title="Número de likes de este quiz"
                        >
                            {iconLike}
                            <span className="text-sm cursor-default">
                                {likes}
                            </span>
                        </div>
                        <div
                            className="flex items-center"
                            title="Número de dislikes de este quiz"
                        >
                            {iconDislike}
                            <span className="text-sm cursor-default">
                                {dislikes}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
