import { Answer, Question, Quiz } from "@/types/quiz";
import { useForm } from "@inertiajs/react";
import { createContext, useContext, useState } from "react";
import { InertiaFormProps } from "@inertiajs/react";
import { route } from "ziggy-js";

interface FormData {
    id: string | number;
    name: string;
    description: string;
    category: string | number;
    public: boolean;
    questions: Question[];
    image: string | null;
}

interface QuizFormContextInterface {
    questions: Question[];
    maxQuestionNumber: number;
    form: InertiaFormProps<FormData>;
    addQuestion: (text: string) => void;
    updateQuestion: (newQuestion: Question) => void;
    deleteQuestion: (questionId: string | number) => void;
    addAnswer: (questionId: string | number, text: string) => void;
    updateAnswer: (questionId: string | number, newAnswer: Answer) => void;
    deleteAnswer: (
        questionId: string | number,
        answerId: string | number
    ) => void;
    submitForm: () => void;
    moveQuestionUp: (question: Question) => void;
    moveQuestionDown: (question: Question) => void;
}

//Crear context
const QuizFormContext = createContext<QuizFormContextInterface | null>(null);

const QuizProvider = ({
    children,
    quiz,
}: {
    children: React.ReactNode;
    quiz?: Quiz;
}) => {
    const [questions, setQuestions] = useState<Question[]>(
        quiz?.questions ? quiz.questions : []
    );
    const maxQuestionNumber = 50;

    const form = useForm<FormData>({
        id: quiz ? quiz.id : "",
        name: quiz ? quiz.name : "",
        description: quiz ? quiz.description : "",
        category: quiz ? quiz.category_id : "1",
        public: quiz ? quiz.isPublic : true,
        questions: quiz ? (quiz.questions ? quiz.questions : []) : [],
        image: quiz ? (quiz.image ? quiz.image : null) : null,
    });

    const {} = form;

    const submitForm = () => {
        const { post } = form;

        post(quiz ? route("quiz.update", quiz.id) : route("quiz.store"));
    };

    const addQuestion = (text: string) => {
        //Verificar que no supere el número máximo de preguntas (No se si 100 es mucho)
        if (questions.length === maxQuestionNumber) return;

        const orderedQuestions = orderQuestions(questions);
        const updatedQuestions = [
            ...orderedQuestions,
            {
                id: crypto.randomUUID(),
                question_text: text,
                order:
                    orderedQuestions.length > 0
                        ? orderedQuestions[orderedQuestions.length - 1].order +
                          1
                        : 1,
                answers: [],
            },
        ];

        const { setData } = form;

        setQuestions(updatedQuestions);
        setData("questions", updatedQuestions);
    };

    const orderQuestions = (questions: Question[]): Question[] => {
        let order = 0;
        const orderedQuestions: Question[] = questions.map((q) => {
            order++;
            return {
                id: q.id,
                question_text: q.question_text,
                order: order,
                answers: q.answers,
            };
        });
        return orderedQuestions;
    };

    const moveQuestionUp = (questionToMove: Question) => {
        // Verificar que la pregunta no sea la primera
        if (questionToMove.order < 2) return;

        // Crear una copia del array
        const updatedQuestions = [...questions];

        // Encontrar las dos preguntas
        const currentIndex = updatedQuestions.findIndex(
            (q) => q.id === questionToMove.id
        );
        const previousIndex = updatedQuestions.findIndex(
            (q) => q.order === questionToMove.order - 1
        );

        if (currentIndex === -1 || previousIndex === -1) return;

        // Intercambiar
        const newCurrent = {
            ...updatedQuestions[currentIndex],
            order: questionToMove.order - 1,
        };
        const newPrevious = {
            ...updatedQuestions[previousIndex],
            order: questionToMove.order,
        };

        //Reemplazar preguntas
        updatedQuestions[currentIndex] = newPrevious;
        updatedQuestions[previousIndex] = newCurrent;

        const orderedQuestions = orderQuestions(updatedQuestions);

        const { setData } = form;
        setData("questions", orderedQuestions);
        setQuestions(orderedQuestions);
    };
    const moveQuestionDown = (questionToMove: Question) => {
        // Verificar que la pregunta no sea la ultima
        if (questionToMove.order >= questions[questions.length - 1].order)
            return;

        // Crear una copia del array
        const updatedQuestions = [...questions];

        // Encontrar las dos preguntas
        const currentIndex = updatedQuestions.findIndex(
            (q) => q.id === questionToMove.id
        );
        const nextIndex = updatedQuestions.findIndex(
            (q) => q.order === questionToMove.order + 1
        );

        if (currentIndex === -1 || nextIndex === -1) return;

        // Intercambiar
        const newCurrent = {
            ...updatedQuestions[currentIndex],
            order: questionToMove.order + 1,
        };
        const newNext = {
            ...updatedQuestions[nextIndex],
            order: questionToMove.order,
        };

        //Reemplazar preguntas
        updatedQuestions[currentIndex] = newNext;
        updatedQuestions[nextIndex] = newCurrent;

        const orderedQuestions = orderQuestions(updatedQuestions);
        const { setData } = form;
        setData("questions", orderedQuestions);
        setQuestions(orderedQuestions);
    };

    const updateQuestion = (newQuestion: Question) => {
        const updatedQuestions: Question[] = questions.map((q) => {
            if (q.id === newQuestion.id) {
                return newQuestion;
            }
            return q;
        });

        const { setData } = form;

        setQuestions(updatedQuestions);
        setData("questions", updatedQuestions);
    };

    const deleteQuestion = (questionId: string | number) => {
        const updatedQuestions = questions.filter((q) => q.id !== questionId);

        const { setData } = form;

        const orderedQuestions = orderQuestions(updatedQuestions);

        setQuestions(orderedQuestions);
        setData("questions", orderedQuestions);
    };

    const addAnswer = (questionId: string | number, text: string) => {
        const questionToUpdate = questions.find((q) => q.id === questionId);

        if (!questionToUpdate) return;

        //Verificar que no supere el número máximo de respuestas
        if (questionToUpdate.answers.length === 5) return;

        const updatedQuestion: Question = {
            id: questionToUpdate.id,
            question_text: questionToUpdate.question_text,
            order: questionToUpdate.order,
            answers: [
                ...questionToUpdate.answers,
                {
                    id: crypto.randomUUID(),
                    answer_text: text,
                    is_correct: false,
                },
            ],
        };

        const updatedQuestions = questions.map((q) => {
            if (q.id === updatedQuestion.id) {
                return updatedQuestion;
            }
            return q;
        });

        const { setData } = form;

        setQuestions(updatedQuestions);
        setData("questions", updatedQuestions);
    };

    const updateAnswer = (questionId: string | number, newAnswer: Answer) => {
        const questionToUpdate = questions.find((q) => q.id === questionId);

        if (!questionToUpdate) return;

        const updatedQuestion: Question = {
            id: questionToUpdate.id,
            question_text: questionToUpdate.question_text,
            order: questionToUpdate.order,
            answers: questionToUpdate.answers.map((a) => {
                if (a.id === newAnswer.id) {
                    return {
                        id: newAnswer.id,
                        answer_text: newAnswer.answer_text,
                        is_correct: newAnswer.is_correct,
                    };
                }
                return {
                    id: a.id,
                    answer_text: a.answer_text,
                    is_correct: newAnswer.is_correct ? false : a.is_correct,
                };
            }),
        };

        const updatedQuestions = questions.map((q) => {
            if (q.id === updatedQuestion.id) {
                return updatedQuestion;
            }
            return q;
        });

        const { setData } = form;

        setQuestions(updatedQuestions);
        setData("questions", updatedQuestions);
    };

    const deleteAnswer = (
        questionId: string | number,
        answerId: string | number
    ) => {
        const question = questions.find((q) => q.id === questionId);

        if (!question) return;

        const updatedAnswers = question.answers.filter(
            (a) => a.id !== answerId
        );

        const updatedQuestions = questions.map((q) => {
            if (q.id === questionId) {
                return {
                    id: q.id,
                    question_text: q.question_text,
                    order: q.order,
                    answers: updatedAnswers,
                };
            }
            return q;
        });

        const { setData } = form;

        setQuestions(updatedQuestions);
        setData("questions", updatedQuestions);
    };

    return (
        <QuizFormContext.Provider
            value={{
                questions,
                maxQuestionNumber,
                form,
                addQuestion,
                updateQuestion,
                deleteQuestion,
                addAnswer,
                updateAnswer,
                deleteAnswer,
                submitForm,
                moveQuestionUp,
                moveQuestionDown,
            }}
        >
            {children}
        </QuizFormContext.Provider>
    );
};

export function useQuizForm() {
    const context = useContext(QuizFormContext);

    if (!context) {
        throw new Error("useContext debe usarse dentro de QuizFormContext");
    }
    return context;
}

export default QuizProvider;
