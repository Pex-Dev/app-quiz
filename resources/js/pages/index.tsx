import React from "react";
import Layout from "../components/Layout.js";
import { Quiz } from "@/types/quiz.js";
import QuizCard from "@/components/quiz/QuizCard.js";

const Index = (props: { quizzes: Quiz[] }) => {
    const { quizzes } = props;
    return (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 w-full max-w-[1440px] px-2 md:px-4 lg:px-5">
            {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </ul>
    );
};

export default Index;

Index.layout = (page: React.ReactElement) => <Layout>{page}</Layout>;
