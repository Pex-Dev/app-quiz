import { Answer } from "@/types/quiz";
import { useQuizPlay } from "@/context/QuizPlayContext";

export default function AnswerOption({
    index,
    answer,
    showResult,
}: {
    index: number;
    answer: Answer;
    showResult: boolean;
}) {
    const { selectedAnswer, setSelectedAnswer } = useQuizPlay();
    const letters = ["A", "B", "C", "D", "E", "F", "G"];

    const colorButton = () => {
        if (showResult && answer.is_correct)
            return "bg-green-500 border-b-green-700 text-white";

        return selectedAnswer === answer
            ? showResult
                ? "bg-red-500 border-b-red-700 text-white"
                : "bg-yellow-500 border-b-yellow-600 text-white"
            : "bg-white border-b-neutral-200";
    };

    const colorSpan = () => {
        if (showResult && answer.is_correct) return "bg-white text-neutral-600";

        return selectedAnswer === answer
            ? "bg-white text-neutral-600"
            : "bg-orange-400/90 group-hover:bg-orange-300 text-white";
    };

    return (
        <button
            disabled={showResult}
            title={
                !showResult
                    ? selectedAnswer === answer
                        ? `Deseleccionar la respuesta: ${answer.answer_text}`
                        : `Seleccionar la respuesta: ${answer.answer_text}`
                    : undefined
            }
            aria-label={
                !showResult
                    ? selectedAnswer === answer
                        ? `Deseleccionar la respuesta: ${answer.answer_text}`
                        : `Seleccionar la respuesta: ${answer.answer_text}`
                    : undefined
            }
            onClick={() => {
                if (showResult) return;
                setSelectedAnswer(selectedAnswer === answer ? null : answer);
            }}
            className={`flex justify-between items-center px-2 md:px-3 py-1.5 md:py-2  group hover:cursor-pointer rounded-full w-full border-b-5 shadow-lg transition-colors ${colorButton()}`}
        >
            <span
                className={`rounded-full w-9 h-9 min-h-9 min-w-9 md:h-10 md:w-10 md:min-w-10 md:min-h-10 flex justify-center items-center transition-colors ${colorSpan()}`}
            >
                {letters[index]}
            </span>
            <p className="w-full">{answer.answer_text}</p>
        </button>
    );
}
