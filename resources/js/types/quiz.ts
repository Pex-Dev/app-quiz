export type Answer = {
    id: string | number;
    quiz_question_id?: string | number;
    answer_text: string;
    is_correct: boolean;
};

export type Question = {
    id: string | number;
    quiz_id?: string | number;
    question_text: string;
    order: number;
    answers: Answer[];
};
export type Quiz = {
    id: string | number;
    user_id: string | number;
    name: string;
    description: string;
    isPublic: boolean;
    category_id: string | number;
    questions?: Question[];
    created_at?: string;
    user?: User;
    image?: string;
    questions_count?: number | null;
};

export type User = {
    id: string | number;
    name: string;
    image: string | null;
    email?: string;
    created_at?: string;
};
