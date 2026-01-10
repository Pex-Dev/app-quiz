import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizCreator from "../QuizCreator";
import { useEffect, useRef, useState } from "react";
import ButtonLikeQuizz from "../ButtonLikeQuizz";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { route } from "ziggy-js";
import { valorationsCount } from "@/utilities/ValorationCount";

export default function QuizIdle() {
    const [sendingRequest, setSendingRequest] = useState(false);
    const { quiz, setQuizState, updateQuizValoration } = useQuizPlay();
    const quizIdleRef = useRef<HTMLDivElement>(null);
    const { auth } = usePage().props;

    const currentValoration =
        quiz.user_valoration !== undefined ? quiz.user_valoration : null;

    //Forma cutre de animar el inicio
    useEffect(() => {
        if (quizIdleRef.current) {
            quizIdleRef.current.classList.remove("opacity-0");
            quizIdleRef.current.classList.add("opacity-100");
        }
    }, [quizIdleRef]);

    //Forma mas cutre de animar la salida
    const exitAnimation = () => {
        if (!quizIdleRef.current) return;
        quizIdleRef.current.classList.remove("opacity-100");
        quizIdleRef.current.classList.add("opacity-0");
        setTimeout(() => {
            setQuizState("playing");
        }, 500);
    };

    const setLike = async (like: boolean) => {
        //Si el usuario esta autenticado marcar quiz como completado
        if (auth && auth.user) {
            try {
                if (sendingRequest) return;
                setSendingRequest(true);

                //Actualizar la valoración de una para que no se sienta lento para el usuario
                updateQuizValoration(
                    currentValoration == null
                        ? like
                        : currentValoration === like
                        ? null
                        : like
                );

                const response = await axios.post(route("quiz.like", quiz.id), {
                    like,
                });

                const result = response.data.success;
                if (result) {
                    updateQuizValoration(response.data.result);
                }
                setSendingRequest(false);
            } catch (error) {
                setSendingRequest(false);
                console.error(error);
            }
        }
    };

    return (
        <div
            ref={quizIdleRef}
            className="transition-opacity duration-500 opacity-0"
        >
            <div className="flex flex-wrap md:flex-row justify-between items-center mr-3 md:mr-0">
                <QuizCreator quiz={quiz} />
                {/* Botones de valoración */}
                <div className="grid grid-cols-2 gap-2 w-fit md:mr-4">
                    <div className="flex items-center">
                        <ButtonLikeQuizz
                            icon="like"
                            disabled={!auth || !auth.user}
                            like={currentValoration == true ? true : null}
                            onClick={setLike}
                        />
                        {/* Conteo de likes */}
                        <span className="text-neutral-600">
                            {quiz.likes_count}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <ButtonLikeQuizz
                            icon="dislike"
                            disabled={!auth || !auth.user}
                            like={currentValoration == false ? false : null}
                            onClick={setLike}
                        />
                        {/* Conteo de dislikes */}
                        <span className="text-neutral-600">
                            {quiz.dislikes_count}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-10 md:mt-0">
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
            {/* Botón comenzar */}
            <div className="p-3 md:p-4 mt-10 md:mt-0">
                <button
                    onClick={() => exitAnimation()}
                    className="bg-blue-600 border-b-4 border-b-blue-800 text-white px-4 py-3 w-full rounded-full transition-colors hover:cursor-pointer hover:bg-blue-500 focus:border-0 focus:bg-blue-800 focus:text-white/30"
                >
                    Comenzar
                </button>
            </div>
        </div>
    );
}
