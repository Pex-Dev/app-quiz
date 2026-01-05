import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizQuestions from "./QuizQuestions";
import QuizResults from "./QuizResults";
import backgroundsImages from "@/utilities/BackgroundCategories";
import { usePage } from "@inertiajs/react";
import QuizIdle from "./QuizIdle";
import ButtonEditQuiz from "./ButtonEditQuiz";
import { useLayoutEffect, useRef, useState } from "react";

export default function QuizBoard() {
    const [height, setHeight] = useState(0);
    const { quiz, quizState } = useQuizPlay();
    const { auth } = usePage().props;

    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [quizState]);

    return (
        <div
            className={`min-w-56 w-full md:max-w-2xl flex flex-col flex-1 md:flex-initial bg-white md:border-b-5 md:border-b-neutral-500 md:rounded-3xl shadow-lg overflow-hidden transition-all duration-500`}
            style={{
                height,
            }}
        >
            <div ref={contentRef}>
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
                                : backgroundsImages[
                                      Number(quiz.category_id) - 1
                                  ]
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
        </div>
    );
}
