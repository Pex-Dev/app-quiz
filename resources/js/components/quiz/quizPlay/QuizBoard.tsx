import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizQuestions from "./QuizQuestions";
import QuizResults from "./QuizResults";
import QuizCreator from "../QuizCreator";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import QuizIdle from "./QuizIdle";
import ButtonEditQuiz from "./ButtonEditQuiz";

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
                {auth?.user && quiz.user_id === auth.user.id && (
                    <ButtonEditQuiz />
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
