import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizCreator from "../QuizCreator";
import ButtonShareQuiz from "./ButtonShareQuiz";
import { useEffect, useRef } from "react";
import { router, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import ButtonLikeQuizz from "../ButtonLikeQuizz";
import axios from "axios";

export default function QuizResults() {
    const { quiz, score, reset } = useQuizPlay();
    const { auth } = usePage().props;

    const quizResultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //Si el usuario esta autenticado marcar quiz como completado
        if (auth && auth.user) {
            router.post(
                route("quiz.completed", quiz.id),
                {},
                {
                    showProgress: false,
                }
            );
        }

        if (quizResultsRef.current) {
            quizResultsRef.current.classList.remove("opacity-0");
            quizResultsRef.current.classList.add("opacity-100");
        }
    }, [quizResultsRef]);

    const setLike = async (like: boolean) => {
        //Si el usuario esta autenticado marcar quiz como completado
        if (auth && auth.user) {
            const request = await axios.post(route("quiz.like", quiz.id), {
                like,
            });
            console.log(request.data);
        }
    };

    const scoreResult = () => {
        if (!quiz.questions) return;
        const percentage = (score / quiz.questions?.length) * 100;

        let scoreClassName = "";
        let resultText = "";
        let resultClassName = "";

        if (percentage === 0) {
            resultText = "Horrible";
        }

        if (percentage < 30) {
            scoreClassName =
                "from-red-600 from-30% via-red-500 via-50% to-white to-90%";
            if (percentage > 0) {
                resultText = "mal";
            }
            resultClassName = "text-red-500";
        }
        if (percentage >= 30 && percentage < 50) {
            scoreClassName =
                "from-amber-600 from-30% via-yellow-500 via-50% to-white to-90%";
            resultText = "Intentado";
            resultClassName = "text-orange-600";
        }
        if (percentage >= 50 && percentage < 100) {
            scoreClassName =
                "from-yellow-600 from-30% via-green-500 via-50% to-white to-90%";
            resultText = "Bien";
            resultClassName = "text-amber-500";
        }
        if (percentage >= 100) {
            scoreClassName =
                "from-green-600 from-30% via-green-500 via-50% to-white to-90%";
            resultText = "perfecto";
            resultClassName = "text-green-500";
        }
        return (
            <>
                <div
                    className={`bg-linear-to-b ${scoreClassName} rounded-full w-40 h-40 flex justify-center items-center mx-auto mt-5 md:mt-15`}
                >
                    <span className="font-roboto uppercase font-black text-white text-shadow-lg text-3xl mb-3">
                        {score} / {quiz.questions?.length}
                    </span>
                </div>
                <p
                    className={`text-2xl font-roboto uppercase font-black mt-4 text-center text-shadow-x ${resultClassName}`}
                >
                    {resultText}
                </p>
            </>
        );
    };

    return (
        <div
            ref={quizResultsRef}
            className="mb-3 md:mb-6 transition-opacity duration-500 opacity-0"
        >
            <QuizCreator quiz={quiz} />
            <h2 className="text-white font-roboto text-shadow-lg uppercase font-semibold text-shadow-green-900 text-2xl md:text-4xl text-center mt-5">
                ¡Quiz completado!
            </h2>
            <h3 className="text-center text-lg font-roboto uppercase mt-3 mx-3 md:mx-4">
                {quiz.name}
            </h3>

            {scoreResult()}

            {/* Buttons Like and Dislike */}
            <h4 className="text-neutral-500 text-center mt-9 font-semibold">
                ¿Te gusto este quiz?
            </h4>
            <div className="grid grid-cols-2 gap-5 mx-auto mt-2 w-fit">
                <ButtonLikeQuizz icon="like" like={true} onClick={setLike} />
                <ButtonLikeQuizz icon="dislike" like={null} onClick={setLike} />
            </div>

            <div className="bg-pink-200 p-1 w-fit rounded-full grid grid-cols-2 gap-1 mx-auto mt-8">
                <button
                    onClick={() => reset()}
                    className="mx-auto justify-between w-full bg-cyan-500 rounded-r-md rounded-l-full py-2 px-5 flex gap-2 items-center font-semibold
                         border-b-4 md:border-b-5 border-b-cyan-700 text-white transition-colors hover:bg-cyan-400 hover:border-b-cyan-600 hover:cursor-pointer"
                >
                    <span>Reiniciar</span>
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
                <ButtonShareQuiz />
            </div>
        </div>
    );
}
