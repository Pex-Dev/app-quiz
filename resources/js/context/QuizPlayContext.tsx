import { Answer, Quiz } from "@/types/quiz";
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

    const nextQuestion = () => {
        if (!quiz.questions) return;

        setCurrentQuestionNumber((prev) => prev + 1);
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

    const updateQuizValoration = (valoration: boolean | null) => {
        const updatedQuiz: Quiz = { ...quiz, like: valoration };
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
