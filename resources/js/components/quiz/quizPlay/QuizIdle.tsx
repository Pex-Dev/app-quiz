import { useQuizPlay } from "@/context/QuizPlayContext";
import QuizCreator from "../QuizCreator";

export default function QuizIdle() {
    const { quiz, setQuizState } = useQuizPlay();

    return (
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
    );
}
