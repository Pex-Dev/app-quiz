import { Answer, Like, Quiz } from "@/types/quiz";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { alertWithCallback } from "@/utilities/SweetAlert";

interface QuizPlayContextInterface {
    quiz: Quiz;
    quizState: "idle" | "playing" | "results";
    currentQuestionNumber: number;
    setQuizState: Dispatch<SetStateAction<"idle" | "playing" | "results">>;
    selectedAnswer: Answer | null;
    setSelectedAnswer: Dispatch<SetStateAction<Answer | null>>;
    nextQuestion: () => void;
    playSound: (sound: "correct" | "incorrect") => void;
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    reset: (withAlert?: boolean) => void;
    updateQuizValoration: (valoration: boolean | null) => void;
}

const QuizPlayContext = createContext<QuizPlayContextInterface | null>(null);

const QuizPlayProvider = ({
    children,
    quizProp,
}: {
    children: React.ReactNode;
    quizProp: Quiz;
}) => {
    const [quiz, setQuiz] = useState<Quiz>(quizProp);
    const [quizState, setQuizState] = useState<"idle" | "playing" | "results">(
        "idle"
    );
    const [currentQuestionNumber, setCurrentQuestionNumber] =
        useState<number>(1);
    const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
    const [score, setScore] = useState<number>(0);

    //Sonidos
    const soundCorrect = new Audio("/sounds/correct_answer.mp3");
    const soundIncorrect = new Audio("/sounds/incorrect_answer.mp3");
    const soundComplete = new Audio("/sounds/quiz_completed.mp3");

    //Cambiar a la siguiente pregunta del quiz
    const nextQuestion = () => {
        if (!quiz.questions) return;

        setCurrentQuestionNumber((prev) => prev + 1);

        //Si se completaron todas las preguntas pasar a las respuestas
        if (currentQuestionNumber >= quiz.questions.length) {
            setTimeout(() => {
                setQuizState("results");
                soundComplete.play();
            }, 1000);
            return;
        }
    };

    const playSound = (sound: "correct" | "incorrect") => {
        if (sound === "correct") soundCorrect.play();
        if (sound === "incorrect") soundIncorrect.play();
    };

    const reset = (withAlert: boolean = true) => {
        if (withAlert) {
            alertWithCallback(
                "¿Reiniciar quiz?",
                () => {
                    setQuizState("idle");
                    setCurrentQuestionNumber(1);
                    setSelectedAnswer(null);
                    setScore(0);
                },
                undefined,
                "question",
                true
            );
        } else {
            setQuizState("idle");
            setCurrentQuestionNumber(1);
            setSelectedAnswer(null);
            setScore(0);
        }
    };

    //Probablemente esta función se puede hacer mucho mejor, pero a mi me funciona :P

    const updateQuizValoration = (valoration: boolean | null) => {
        let updatedLikeCount = quiz.likes_count;
        let updatedDislikeCount = quiz.dislikes_count;

        //Si el usuario ya valoro el quiz
        if (
            quiz.user_valoration !== null &&
            quiz.user_valoration !== undefined
        ) {
            //Si el usuario cambio su valoración
            if (valoration !== null) {
                //Valoración positiva
                if (valoration) {
                    updatedLikeCount = quiz.likes_count + 1;
                    updatedDislikeCount =
                        quiz.dislikes_count > 0 ? quiz.dislikes_count - 1 : 0;
                }
                //Valoración negativa
                if (!valoration) {
                    updatedLikeCount =
                        quiz.likes_count > 0 ? quiz.likes_count - 1 : 0;
                    updatedDislikeCount = quiz.dislikes_count + 1;
                }

                //Si el usuario quito su valoración
            } else {
                //Quitar valoración positiva
                if (quiz.user_valoration) {
                    updatedLikeCount =
                        quiz.likes_count > 0 ? quiz.likes_count - 1 : 0;
                    //Quiar valoración negativa
                } else {
                    updatedDislikeCount =
                        quiz.dislikes_count > 0 ? quiz.dislikes_count - 1 : 0;
                }
            }
        } else {
            //Si el usuario no ha valorado el quiz
            if (valoration !== null) {
                //Valoración positiva
                if (valoration) {
                    updatedLikeCount++;
                }
                //Valoración negativa
                if (!valoration) {
                    updatedDislikeCount++;
                }
            }
        }

        //Crear quiz actualizado
        const updatedQuiz: Quiz = {
            ...quiz,
            user_valoration: valoration,
            dislikes_count: updatedDislikeCount,
            likes_count: updatedLikeCount,
        };

        //Acualizar el estado con el quiz actualizado
        setQuiz(updatedQuiz);
    };

    return (
        <QuizPlayContext.Provider
            value={{
                quiz,
                quizState,
                setQuizState,
                currentQuestionNumber,
                selectedAnswer,
                setSelectedAnswer,
                nextQuestion,
                playSound,
                score,
                setScore,
                reset,
                updateQuizValoration,
            }}
        >
            {children}
        </QuizPlayContext.Provider>
    );
};

export function useQuizPlay() {
    const context = useContext(QuizPlayContext);
    if (!context) {
        throw new Error("useQuizPlay debe usarse dentro de QuizPlayProvider");
    }

    return context;
}

export default QuizPlayProvider;
