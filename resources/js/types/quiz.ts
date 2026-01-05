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
    completed?: number;
    like?: boolean | null;
};

export type User = {
    id: string | number;
    name: string;
    image: string | null;
    email?: string;
    created_at?: string;
};

export interface Link {
    url: null | string;
    label: string;
    page: number | null;
    active: boolean;
}

export interface Results {
    current_page: number;
    data: Quiz[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}
